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
          <button @click="trimSilence" :disabled="!ready">
            <font-awesome-icon icon="fa-solid fa-wand-magic-sparkles"/> {{ $t('message.sampleManager.trimSilence') }}
          </button>
          <button @click="undo" :disabled="history.length === 0">
            <font-awesome-icon icon="fa-solid fa-rotate-left"/> {{ $t('message.sampleManager.undo') }}
          </button>
        </div>
        <label class="option">
          <input type="checkbox" v-model="normalize"/>
          {{ $t('message.sampleManager.normalize') }}
        </label>

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
          <button class="primary" @click="save" :disabled="(removed.length === 0 && !normalize) || saving">
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
import {themeColour} from "@/util/util";

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

      normalize: false,
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
      this.normalize = false;
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
        waveColor: themeColour("text-soft"),
        progressColor: themeColour("accent-light"),
        cursorColor: themeColour("text"),
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

    // Removes the near silent parts at the start and the end (below -45dB, keeping 50ms).
    trimSilence() {
      let buffer = this.wavesurfer.backend.buffer;
      if (buffer === undefined || buffer === null) {
        return;
      }
      let threshold = Math.pow(10, -45 / 20);
      let channels = [];
      for (let channel = 0; channel < buffer.numberOfChannels; channel++) {
        channels.push(buffer.getChannelData(channel));
      }
      let loud = (index) => channels.some((data) => Math.abs(data[index]) > threshold);

      let first = 0;
      while (first < buffer.length && !loud(first)) {
        first++;
      }
      let last = buffer.length - 1;
      while (last > first && !loud(last)) {
        last--;
      }
      if (first >= buffer.length) {
        this.saveError = this.$t('message.sampleManager.onlySilence');
        return;
      }

      let margin = 0.05;
      let start = Math.max(0, first / buffer.sampleRate - margin);
      let end = Math.min(this.duration, (last + 1) / buffer.sampleRate + margin);
      let ranges = [...this.removed];
      if (start > 0.01) {
        ranges.push([0, start]);
      }
      if (this.duration - end > 0.01) {
        ranges.push([end, this.duration]);
      }
      if (ranges.length === this.removed.length) {
        this.saveError = this.$t('message.sampleManager.noSilence');
        return;
      }
      this.applyRemoved(ranges);
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
      let edit = {remove: this.removed, normalize: this.normalize};
      websocket.send_daemon_command({EditSampleFile: [this.path, edit, saveAs]}).then(() => {
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
  color: var(--c-text);
  width: 720px;
}

.waveform {
  background-color: var(--c-disabled);
  border: 1px solid var(--c-line);
  min-height: 128px;
}

.durations {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  font-size: 0.9em;
  color: var(--c-text-soft);
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
  font-family: var(--f-body);
  background-color: var(--c-raised-2);
  color: var(--c-text);
  border: 1px solid var(--c-line);
  padding: 6px 10px;
  cursor: pointer;
}

button:hover:not(:disabled), button:focus {
  background-color: var(--c-hover);
}

button:disabled {
  color: var(--c-faint);
  cursor: default;
}

button.primary {
  background-color: var(--c-accent);
  border-color: var(--c-accent);
  color: var(--c-on-accent);
}

.option {
  display: flex;
  align-items: center;
  gap: 6px;
}

.save {
  border: 1px solid var(--c-line);
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.save input[type=text] {
  background-color: var(--c-disabled);
  border: 1px solid var(--c-line);
  padding: 5px;
  color: var(--c-text);
}

.hint {
  margin: 0;
  font-size: 0.85em;
  color: var(--c-muted);
}

.error {
  margin: 0;
  color: var(--c-danger);
}
</style>
