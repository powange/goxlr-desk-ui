<template>
  <AccessibleModal ref="modal" id="sampleEditor" width="760px" :show_footer="false" @modal-close="onClosed">
    <template v-slot:title>{{ $t('message.sampleManager.editTitle', { name: name }) }}</template>
    <template v-slot:default>
      <div class="editor">
        <p class="hint">{{ $t('message.sampleManager.editHelp') }}</p>

        <div ref="waveform" class="waveform"></div>
        <p v-if="loadError !== ''" class="error">{{ loadError }}</p>

        <div class="durations">
          <span>{{ $t('message.sampleManager.originalLength', { length: formatTime(duration) }) }}</span>
          <span>{{ $t('message.sampleManager.resultLength', { length: formatTime(resultDuration()) }) }}</span>
          <span v-if="selection !== undefined">
            {{ $t('message.sampleManager.selectionRange', { start: formatTime(selection.start), end: formatTime(selection.end) }) }}
          </span>
        </div>

        <div class="tools">
          <button @click="playSelection" :disabled="selection === undefined">
            <font-awesome-icon icon="fa-solid fa-play"/> {{ $t('message.sampleManager.playSelection') }}
          </button>
          <button @click="playResult" :disabled="!ready">
            <font-awesome-icon icon="fa-solid fa-play"/> {{ $t('message.sampleManager.playResult') }}
          </button>
          <button @click="stop" :disabled="!ready">
            <font-awesome-icon icon="fa-solid fa-stop"/> {{ $t('message.sampleManager.stop') }}
          </button>
        </div>
        <div class="tools">
          <button @click="keepSelection" :disabled="selection === undefined">
            <font-awesome-icon icon="fa-solid fa-crop-simple"/> {{ $t('message.sampleManager.keepSelection') }}
          </button>
          <button @click="removeSelection" :disabled="selection === undefined">
            <font-awesome-icon icon="fa-solid fa-scissors"/> {{ $t('message.sampleManager.removeSelection') }}
          </button>
          <button @click="undo" :disabled="history.length === 0">
            <font-awesome-icon icon="fa-solid fa-rotate-left"/> {{ $t('message.sampleManager.undo') }}
          </button>
        </div>

        <fieldset class="save">
          <legend>{{ $t('message.sampleManager.saveAs') }}</legend>
          <label>
            <input type="radio" value="replace" v-model="saveMode"/>
            {{ $t('message.sampleManager.replaceFile') }}
          </label>
          <p v-if="saveMode === 'replace' && !isWav()" class="hint">
            {{ $t('message.sampleManager.convertedToWav', { name: wavName() }) }}
          </p>
          <label>
            <input type="radio" value="copy" v-model="saveMode"/>
            {{ $t('message.sampleManager.saveCopy') }}
          </label>
          <input v-if="saveMode === 'copy'" ref="copyName" type="text" class="text" v-model="copyName"
                 :aria-label="$t('message.sampleManager.copyName')" :placeholder="$t('message.sampleManager.copyName')"/>
          <p v-if="saveMode === 'copy'" class="hint">{{ $t('message.sampleManager.copyHint') }}</p>
        </fieldset>

        <p v-if="saveError !== ''" class="error">{{ saveError }}</p>

        <div class="footer">
          <button class="primary" @click="save" :disabled="removed.length === 0 || saving">
            {{ saving ? $t('message.sampleManager.saving') : $t('message.sampleManager.save') }}
          </button>
          <button @click="close">{{ $t('message.sampleManager.cancel') }}</button>
        </div>
      </div>
    </template>
  </AccessibleModal>
</template>

<script>
import WaveSurfer from "wavesurfer.js/dist/wavesurfer";
import RegionsPlugin from "wavesurfer.js/dist/plugin/wavesurfer.regions";
import {getBaseHTTPAddress, websocket} from "@/util/sockets";
import AccessibleModal from "@/components/design/modal/AccessibleModal.vue";

const SELECTION_COLOUR = "rgba(89, 177, 182, 0.35)";
const REMOVED_COLOUR = "rgba(210, 70, 70, 0.45)";

export default {
  name: "SampleEditor",
  components: {AccessibleModal},

  data() {
    return {
      path: '',
      name: '',

      wavesurfer: undefined,
      ready: false,
      loadError: '',
      duration: 0,

      // The current selection (a wavesurfer region), and the parts removed so far as merged
      // [start, end] pairs in seconds on the original timeline.
      selection: undefined,
      removed: [],
      history: [],

      saveMode: 'replace',
      copyName: '',
      saving: false,
      saveError: '',
    }
  },

  methods: {
    // Opens the editor for a sample, path is relative to the samples folder.
    open(path, name, returnFocus) {
      this.path = path;
      this.name = name;
      this.removed = [];
      this.history = [];
      this.selection = undefined;
      this.saveMode = 'replace';
      this.copyName = this.baseName() + " " + this.$t('message.sampleManager.copySuffix');
      this.saveError = '';
      this.loadError = '';
      this.saving = false;

      this.$refs.modal.openModal(undefined, returnFocus);
      // The waveform needs the dialog on screen to measure its width.
      this.$nextTick(() => this.createWaveform());
    },

    close() {
      this.$refs.modal.closeModal();
    },

    onClosed() {
      if (this.wavesurfer !== undefined) {
        this.wavesurfer.destroy();
        this.wavesurfer = undefined;
      }
      this.ready = false;
    },

    createWaveform() {
      if (this.wavesurfer !== undefined) {
        this.wavesurfer.destroy();
      }
      this.ready = false;

      this.wavesurfer = WaveSurfer.create({
        container: this.$refs.waveform,
        height: 128,
        waveColor: "#d7d7d7",
        progressColor: "#9fc5c7",
        cursorColor: "#ffffff",
        normalize: true,
        plugins: [RegionsPlugin.create({dragSelection: {slop: 5}})],
      });

      this.wavesurfer.on('ready', () => {
        this.ready = true;
        this.duration = this.wavesurfer.getDuration();
      });
      this.wavesurfer.on('error', (error) => {
        this.loadError = String(error);
      });
      this.wavesurfer.on('region-created', (region) => this.onRegionCreated(region));
      this.wavesurfer.on('audioprocess', (time) => this.skipRemoved(time));

      // Avoid the browser cache, the file may have just been edited.
      let url = getBaseHTTPAddress() + "files/samples/" + encodeURIComponent(this.name) + "?v=" + Date.now();
      this.wavesurfer.load(url);
    },

    onRegionCreated(region) {
      if (region.data !== undefined && region.data.removed) {
        return;
      }
      // Only one selection at a time.
      if (this.selection !== undefined && this.selection.id !== region.id) {
        this.selection.remove();
      }
      region.color = SELECTION_COLOUR;
      region.updateRender();
      this.selection = region;
      region.on('remove', () => {
        if (this.selection !== undefined && this.selection.id === region.id) {
          this.selection = undefined;
        }
      });
    },

    // Merges overlapping ranges, sorted by start.
    merge(ranges) {
      let sorted = ranges
          .map(([start, end]) => [Math.max(0, Math.min(start, end)), Math.min(this.duration, Math.max(start, end))])
          .filter(([start, end]) => end - start > 0.001)
          .sort((a, b) => a[0] - b[0]);

      let merged = [];
      for (let range of sorted) {
        let last = merged[merged.length - 1];
        if (last !== undefined && range[0] <= last[1]) {
          last[1] = Math.max(last[1], range[1]);
        } else {
          merged.push([range[0], range[1]]);
        }
      }
      return merged;
    },

    applyRemoved(ranges) {
      let merged = this.merge(ranges);
      if (this.duration - this.covered(merged) < 0.01) {
        this.saveError = this.$t('message.sampleManager.nothingLeft');
        return;
      }
      this.saveError = '';
      this.history.push(this.removed);
      this.removed = merged;
      this.renderRemoved();

      if (this.selection !== undefined) {
        this.selection.remove();
      }
    },

    renderRemoved() {
      for (let region of Object.values(this.wavesurfer.regions.list)) {
        if (region.data !== undefined && region.data.removed) {
          region.remove();
        }
      }
      for (let [start, end] of this.removed) {
        this.wavesurfer.addRegion({
          start, end, color: REMOVED_COLOUR, drag: false, resize: false, data: {removed: true},
        });
      }
    },

    keepSelection() {
      let {start, end} = this.selection;
      this.applyRemoved([...this.removed, [0, start], [end, this.duration]]);
    },

    removeSelection() {
      let {start, end} = this.selection;
      this.applyRemoved([...this.removed, [start, end]]);
    },

    undo() {
      this.removed = this.history.pop();
      this.renderRemoved();
    },

    covered(ranges) {
      return ranges.reduce((total, [start, end]) => total + (end - start), 0);
    },

    resultDuration() {
      return Math.max(0, this.duration - this.covered(this.removed));
    },

    playSelection() {
      this.wavesurfer.play(this.selection.start, this.selection.end);
    },

    playResult() {
      this.wavesurfer.play(0);
    },

    stop() {
      this.wavesurfer.stop();
    },

    // While playing, jump over the removed parts, so playback sounds like the result.
    skipRemoved(time) {
      let range = this.removed.find(([start, end]) => time >= start && time < end);
      if (range === undefined) {
        return;
      }
      if (range[1] >= this.duration - 0.01) {
        this.wavesurfer.stop();
      } else {
        this.wavesurfer.seekTo(range[1] / this.duration);
      }
    },

    baseName() {
      let dot = this.name.lastIndexOf('.');
      return dot > 0 ? this.name.substring(0, dot) : this.name;
    },

    isWav() {
      return this.name.toLowerCase().endsWith('.wav');
    },

    wavName() {
      return this.baseName() + ".wav";
    },

    save() {
      let saveAs = null;
      if (this.saveMode === 'copy') {
        saveAs = this.copyName.trim();
        if (saveAs === '' || saveAs.includes('/') || saveAs.includes('\\')) {
          this.saveError = this.$t('message.sampleManager.invalidName');
          return;
        }
      }

      this.saving = true;
      this.saveError = '';
      this.wavesurfer.stop();
      websocket.send_daemon_command({EditSampleFile: [this.path, this.removed, saveAs]}).then(() => {
        this.saving = false;
        this.close();
      }).catch((error) => {
        this.saving = false;
        this.saveError = (error !== undefined && error.Error !== undefined) ? error.Error : String(error);
      });
    },

    formatTime(seconds) {
      if (!isFinite(seconds)) {
        return "0:00.0";
      }
      let minutes = Math.floor(seconds / 60);
      let rest = (seconds - minutes * 60).toFixed(1).padStart(4, "0");
      return `${minutes}:${rest}`;
    },
  },

  beforeUnmount() {
    this.onClosed();
  },
}
</script>

<style scoped>
.editor {
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: #fff;
  width: 720px;
}

.waveform {
  background-color: #2B2F2D;
  border: 1px solid #3b413f;
  min-height: 128px;
}

.durations {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  font-size: 0.9em;
  color: #d7d7d7;
}

.tools, .footer {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.footer {
  justify-content: flex-end;
}

button {
  font-family: LeagueMonoCondensed, sans-serif;
  background-color: #3b413f;
  color: #fff;
  border: 1px solid #49514e;
  padding: 6px 10px;
  cursor: pointer;
}

button:hover:not(:disabled), button:focus {
  background-color: #49514e;
}

button:disabled {
  color: #6c706f;
  cursor: default;
}

button.primary {
  background-color: #59b1b6;
  border-color: #59b1b6;
  color: #000;
}

.save {
  border: 1px solid #3b413f;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.save input[type=text] {
  background-color: #2B2F2D;
  border: 1px solid #3b413f;
  padding: 5px;
  color: #fff;
}

.hint {
  margin: 0;
  font-size: 0.85em;
  color: #a5a7a6;
}

.error {
  margin: 0;
  color: #f07a7a;
}
</style>
