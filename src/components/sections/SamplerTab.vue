<template>
  <GroupContainer :title="$t('message.sampler.pads.title')">
    <div class="pad-panel">
      <div class="pad-row">
        <span class="field-label">{{ $t('message.sampler.banks.bankTitle') }}</span>
        <SegmentedControl :options="getBankOptions()" :selected="activeBank" @selection-changed="setActiveBank"
                          :label="$t('message.sampler.banks.bankTitle')"/>
      </div>

      <div class="pads" role="radiogroup" :aria-label="$t('message.sampler.banks.buttonLabel', {activeBank: activeBank})">
        <button v-for="option in getButtonOptions()" :key="option.id" type="button" role="radio" class="pad"
                :aria-checked="option.id === activeButton"
                :class="{ selected: option.id === activeButton, filled: getPadSamples(option.id).length > 0, drop: dropButton === option.id }"
                @click="setActiveButton(option.id)"
                @dragover="onPadDragOver($event, option.id)" @dragleave="onPadDragLeave(option.id)"
                @drop="onPadDrop($event, option.id)">
          <span class="pad-key">{{ option.label }}</span>
          <span class="pad-name">{{ getPadSamples(option.id).length > 0 ? getPadSamples(option.id)[0].name : $t('message.sampler.pads.empty') }}</span>
          <span class="pad-meta" v-if="getPadSamples(option.id).length > 0">
            {{ $t('message.sampler.pads.count', {count: getPadSamples(option.id).length}) }} · {{ getFunctionLabel(option.id) }}
          </span>
          <span class="pad-tip" v-if="dropButton === option.id">{{ $t('message.sampler.pads.dropHere') }}</span>
        </button>
      </div>

      <label class="pad-row">
        <span class="field-label">{{ $t('message.sampler.banks.functionTitle') }}</span>
        <select class="pad-select" :value="getActiveFunction()" @change="setActiveFunction($event.target.value)"
                :aria-label="$t('message.sampler.banks.functionLabel', {activeButton: activeButton, activeBank: activeBank})">
          <option v-for="option in getFunctionOptions()" :key="option.id" :value="option.id">{{ option.label }}</option>
        </select>
      </label>

      <div class="pad-row">
        <span class="field-label">{{ $t('message.sampler.banks.playOrderTitle') }}</span>
        <SegmentedControl :options="getOrderOptions()" :selected="getActiveOrder()" @selection-changed="setActiveOrder"
                          :label="$t('message.sampler.banks.playOrderLabel', {activeButton: activeButton, activeBank: activeBank})"/>
      </div>

      <div class="pad-row">
        <span class="field-label">{{ $t('message.sampler.lighting.label') }}</span>
        <button ref="lightingButton" type="button" class="lighting-button" @click="openLighting">
          <font-awesome-icon icon="fa-solid fa-lightbulb"/>
          <span>{{ $t('message.sampler.lighting.customise') }}</span>
        </button>
      </div>
    </div>
  </GroupContainer>
  <GroupContainer class="button-samples" :title="$t('message.sampler.samplesTitle')">
    <RadioSelection
        :title="$t('message.sampler.samples.samplesTitle')"
        group="sampler_samples"
        max-width="200px"
        :options="getSampleOptions()"
        :selected="activeSample"
        @selection-changed="setActiveSample"
        :label="$t('message.sampler.samples.samplesLabel', { activeButton: activeButton, activeBank: activeBank })"
    >
      <ButtonItem
          id="add_sample"
          ref="add_sample_button"
          :label="$t('message.sampler.samples.addSampleLabel')"
          :text="$t('message.sampler.samples.addSample')"
          :centered="true"
          @click="this.$refs.add_sample_modal.openModal($refs.sample_selector, $refs.add_sample_button);"
      >+
      </ButtonItem>
    </RadioSelection>
    <Slider :title="$t('message.sampler.samples.gain')" :id=0 :slider-min-value=0 :slider-max-value=200
            :text-suffix="$t('message.suffixes.percentage')" :slider-value=getSampleVolume() @value-changed="setVolume"
            :store-path="getStorePath()" :disabled="isVolumeDisabled()" @blur="commitValue"
    />


    <AudioVisualiser
        :active-bank="activeBank"
        :active-button="activeButton"
        :active-sample="parseInt(activeSample)"
        @deselect-sample="activeSample = '-1'"
        :sample-name="getActiveSampleName(activeSample)"
    />
  </GroupContainer>

  <AccessibleModal ref="lightingModal" id="samplerLighting" width="min(560px, 94vw)" body-padding="0">
    <template v-slot:title>{{ $t('message.sampler.lighting.title') }}</template>
    <SamplerLighting v-if="lightingOpen" :bank="activeBank"/>
  </AccessibleModal>

  <AccessibleModal
      ref="add_sample_modal"
      id="add_sample"
      :show_footer="true"
      @modal-close="stopAudio()"
  >
    <template v-slot:title>
      <span>{{ $t('message.sampler.samples.addSampleLabel') }}</span>
      <button
          class="openButton"
          @click="openSamples"
          :aria-label="$t('message.sampler.samples.accessibilityOpenSamplesDirectory')"
      >
        <font-awesome-icon icon="fa-solid fa-folder"/>
      </button>
    </template>

    <SampleFileSelector ref="sample_selector" max-height="300px" group="add_sample_list" prefix="add_sample_"/>

    <template v-slot:footer>
      <div style="display: flex; flex-direction: row">
        <div style="width: 50%; text-align: left; padding-left: 10px;">
          <ModalButton
              style="width: 50px; padding: 8px 2px"
              ref="err"
              class="modal-default-button"
              :enabled="hasSelectedSample()"
              @click="toggleAudio"
          >
            <font-awesome-icon :icon="getPlaybackButton()"></font-awesome-icon>
          </ModalButton>
        </div>
        <div style="text-align: right; width: 50%">
          <ModalButton
              ref="ok"
              class="modal-default-button"
              :enabled="hasSelectedSample()"
              @click="addSample"
          >{{$t('message.sampler.samples.sampleSelector.addButton')}}
          </ModalButton>
        </div>
      </div>
    </template>
  </AccessibleModal>

  <AccessibleModal
      ref="add_sample_wait"
      id="add_sample_wait"
      :show_footer="false"
      :show_close="false"
      :prevent_esc="true"
  >
    <template v-slot:title>{{$t('message.sampler.samples.addSampleWaitTitle')}}</template>
    <div tabindex="0">
      {{$t('message.sampler.samples.addSampleAnalysing')}}<br/>
      {{$t('message.sampler.samples.addSampleProgress', {progress: sampleProgress})}}
    </div>
  </AccessibleModal>

  <AccessibleModal
      ref="add_sample_error"
      id="add_sample_error"
      :show_footer="true"
      :show_close="true"
      :prevent_esc="false"
      @modal-close="clearErrors()"
  >
    <template v-slot:title>{{$t('message.sampler.samples.errorTitle')}}</template>
    <div tabindex="0">
      {{$t('message.sampler.samples.errorText')}}<br/><br/>
      {{ error }}
    </div>
  </AccessibleModal>
</template>

<script>
import {store} from "@/store";
import AudioVisualiser from "@/components/sections/sampler/AudioVisualiser.vue";
import RadioSelection from "@/components/lists/RadioSelection.vue";
import GroupContainer from "@/components/containers/GroupContainer.vue";
import ButtonItem from "@/components/lists/ButtonItem.vue";
import AccessibleModal from "@/components/design/modal/AccessibleModal.vue";
import ModalButton from "@/components/design/modal/ModalButton.vue";
import {websocket} from "@/util/sockets";
import SampleFileSelector from "@/components/sections/sampler/SampleFileSelector.vue";
import Slider from "@/components/slider/Slider.vue";
import SegmentedControl from "@/components/design/SegmentedControl.vue";
import SamplerLighting from "@/components/sections/sampler/SamplerLighting.vue";
import {getDraggedSamples, isSampleDrag} from "@/util/sampleDrag";

export default {
  emits: ["on-sample-bank-change", "sample-drop"],

  name: "SamplerTab",
  components: {
    Slider,
    SegmentedControl,
    SamplerLighting,
    SampleFileSelector,

    ModalButton,
    AccessibleModal,
    ButtonItem,
    GroupContainer,
    RadioSelection,
    AudioVisualiser,
  },

  data() {
    return {
      last_error: undefined,

      activeBank: "A",
      activeButton: "TopLeft",
      activeSample: "-1",
      // The pad samples are being dragged over
      dropButton: undefined,
      lightingOpen: false,

      showAddModal: false,
      waitModal: false,
    };
  },

  methods: {
    isActive(key) {
      return store.getActiveDevice().sampler.active_bank === key;
    },

    getBankOptions() {
      return [
        {id: "A", label: this.$t('message.sampler.banks.bank.a')},
        {id: "B", label: this.$t('message.sampler.banks.bank.b')},
        {id: "C", label: this.$t('message.sampler.banks.bank.c')},
      ];
    },

    // The bank's lighting (moved here from the Lighting section)
    openLighting() {
      this.lightingOpen = false;
      this.$nextTick(() => {
        this.lightingOpen = true;
        this.$refs.lightingModal.openModal(undefined, this.$refs.lightingButton);
      });
    },

    getPadSamples(button) {
      return store.getActiveDevice().sampler.banks[this.activeBank][button].samples;
    },

    getFunctionLabel(button) {
      const id = store.getActiveDevice().sampler.banks[this.activeBank][button].function;
      const option = this.getFunctionOptions().find(option => option.id === id);
      return option ? option.label : id;
    },

    // Samples dragged from the library onto a pad are assigned through the same dialog as the
    // visualiser's buttons.
    onPadDragOver(event, button) {
      if (!isSampleDrag(event)) return;
      event.preventDefault();
      event.dataTransfer.dropEffect = "copy";
      this.dropButton = button;
    },

    onPadDragLeave(button) {
      if (this.dropButton === button) this.dropButton = undefined;
    },

    onPadDrop(event, button) {
      if (!isSampleDrag(event)) return;
      event.preventDefault();
      this.dropButton = undefined;
      const paths = getDraggedSamples(event);
      if (paths.length > 0) {
        this.setActiveButton(button);
        this.$emit("sample-drop", {button, paths, bank: this.activeBank});
      }
    },

    getButtonOptions() {
      return [
        {id: "TopLeft", label: this.$t('message.sampler.banks.buttons.topLeft')},
        {id: "TopRight", label: this.$t('message.sampler.banks.buttons.topRight')},
        {id: "BottomLeft", label: this.$t('message.sampler.banks.buttons.bottomLeft')},
        {id: "BottomRight", label: this.$t('message.sampler.banks.buttons.bottomRight')},
      ];
    },

    getFunctionOptions() {
      return [
        {id: "PlayNext", label: this.$t('message.sampler.banks.functions.playNext')},
        {id: "PlayStop", label: this.$t('message.sampler.banks.functions.playStop')},
        {id: "PlayFade", label: this.$t('message.sampler.banks.functions.playFade')},
        {id: "StopOnRelease", label: this.$t('message.sampler.banks.functions.stopOnRelease')},
        {id: "FadeOnRelease", label: this.$t('message.sampler.banks.functions.fadeOnRelease')},
        {id: "Loop", label: this.$t('message.sampler.banks.functions.loop')},
      ];
    },

    getOrderOptions() {
      return [
        {id: "Sequential", label: this.$t('message.sampler.banks.playOrders.sequential')},
        {id: "Random", label: this.$t('message.sampler.banks.playOrders.random')},
      ];
    },

    openSamples() {
      websocket.open_path("Samples");
    },

    getSampleOptions() {
      let samples = [];
      this.getSamples().forEach((sample, index) => {
        samples.push({id: index.toString(), label: sample.name});
      });
      return samples;
    },

    setActiveBank(bank) {
      this.activeBank = bank;
      this.activeSample = "-1";
      if (!this.isActive(bank)) {
        websocket.send_command(store.getActiveSerial(), {"SetActiveSamplerBank": bank});
      }
      this.$emit("on-sample-bank-change", bank);
    },

    setActiveButton(button) {
      this.activeButton = button;
      this.activeSample = "-1";
    },

    getActiveFunction() {
      return store.getActiveDevice().sampler.banks[this.activeBank][
          this.activeButton
          ].function;
    },
    setActiveFunction(sampleFunction) {
      websocket.send_command(store.getActiveSerial(), {
        SetSamplerFunction: [
          this.activeBank,
          this.activeButton,
          sampleFunction,
        ],
      });
    },
    getActiveOrder() {
      return store.getActiveDevice().sampler.banks[this.activeBank][
          this.activeButton
          ].order;
    },
    setActiveOrder(sampleOrder) {
      websocket.send_command(store.getActiveSerial(), {
        SetSamplerOrder: [this.activeBank, this.activeButton, sampleOrder],
      });
    },

    getSamples() {
      return store.getActiveDevice().sampler.banks[this.activeBank][
          this.activeButton
          ].samples;
    },

    hasSelectedSample() {
      // This may not have been mounted when this is first called, so fail-safe.
      if (this.$refs.sample_selector === undefined) {
        return false;
      }

      return this.$refs.sample_selector.getSelectedSampleName() !== undefined;
    },

    setActiveSample(id) {
      this.activeSample = id;
    },

    addSample() {
      let name = this.$refs.sample_selector.getSelectedSampleName();

      // If we're adding a sample, we need to drop the return focus...
      this.$refs.add_sample_modal.returnFocus = undefined;
      this.$refs.add_sample_modal.closeModal();

      websocket.send_command(store.getActiveSerial(), {
        AddSample: [this.activeBank, this.activeButton, name],
      }).catch(error => {
        this.last_error = error.Error;
      });

    },
    getActiveSampleName: function (id) {
      if (id === "-1") {
        return "";
      }

      // If a sample button is cleared, the active sample disappears, we need to return nothing..
      if (store.getActiveDevice().sampler.banks[this.activeBank][this.activeButton].samples[id] === undefined) {
        return "";
      }

      return store.getActiveDevice().sampler.banks[this.activeBank][
          this.activeButton
          ].samples[id].name;
    },

    stopAudio() {
      this.$refs.sample_selector.stopPlayback();
    },

    toggleAudio() {
      this.$refs.sample_selector.toggleAudio();
    },

    getPlaybackButton() {
      // Again, fail safe..
      if (this.$refs.sample_selector === undefined) {
        return "play";
      }

      if (this.$refs.sample_selector.isAudioPlaying()) {
        return "stop";
      }
      return "play";
    },

    clearErrors() {
      if (this.last_error !== undefined) {
        this.last_error = undefined;
      }

      if (store.getActiveDevice().sampler.processing_state.last_error !== null) {
        websocket.send_command(store.getActiveSerial(), {
          ClearSampleProcessError: []
        });
      }
    },

    getSampleVolume() {
      if (this.activeSample !== "-1") {
        let sample_name = this.getActiveSampleName(this.activeSample);

        // eslint-disable-next-line no-unused-vars
        for (let [key, sample] of Object.entries(store.getSampleFiles())) {
          if (sample.name === sample_name) {
            return sample.gain_pct;
          }
        }
      }
      // Not found, or not selected, either way, hit the default.
      return 100;
    },

    setVolume(id, volume) {
      // Get the Selected Sample Name..
      let sample_name = this.getActiveSampleName(this.activeSample);

      websocket.send_daemon_command({
        "SetSampleGainPct": [sample_name, volume]
      })
    },
    getStorePath() {
      return "";
    },
    commitValue() {
      websocket.send_daemon_command("ApplySampleChange");
    },

    isVolumeDisabled() {
      if (this.activeSample === '-1') {
        return true;
      }

      if (store.getActiveDevice().sampler.banks[this.activeBank][
          this.activeButton
          ].is_playing) {
        return true;
      }
      return false;

    },
  },

  computed: {
    hasError() {
      if (this.last_error !== undefined) {
        return true;
      }
      return store.getActiveDevice().sampler.processing_state.last_error !== null;
    },

    error() {
      if (this.last_error !== undefined) {
        return this.last_error;
      }
      if (store.getActiveDevice().sampler.processing_state.last_error !== null) {
        return store.getActiveDevice().sampler.processing_state.last_error;
      }

      return this.$t('message.sampler.samples.genericError');
    },

    sampleProgress() {
      return store.getActiveDevice().sampler.processing_state.progress;
    }
  },

  watch: {
    sampleProgress(newValue, oldValue) {
      // If we're going from null to not null, open the dialog..
      if ((oldValue === null) && (newValue !== null)) {
        // We need to open the Progress Dialog..
        this.$refs.add_sample_wait.openModal(undefined, this.$refs.add_sample_button);
        store.setAccessibilityNotification(
            "polite",
            this.$t('message.sampler.samples.accessibilityAnalysing')
        );
      }

      if (oldValue !== null && newValue !== null && this.$refs.add_sample_wait !== undefined && !this.$refs.add_sample_wait.isOpen()) {
        // User has opened the page while something was processing? Throw open the modal.
        this.$refs.add_sample_wait.openModal(undefined, this.$refs.add_sample_button);
        store.setAccessibilityNotification(
            "polite",
            this.$t('message.sampler.samples.accessibilityAnalysing')
        );
      }

      // If we're going from a Value to null, close the dialog..
      if ((oldValue !== null && newValue == null) && this.$refs.add_sample_wait.isOpen()) {
        this.$refs.add_sample_wait.closeModal();

        store.setAccessibilityNotification(
            "polite",
            this.$t('message.sampler.accessibilityAdded', {
              name: name,
              activeButton: this.activeButton,
              activeBank: this.activeBank
            })
        );
      }
    },

    hasError: {
      handler(newValue) {
        if (this.$refs.add_sample_error === undefined && newValue === true) {
          // We've picked up a cached error of some description, clear it.
          websocket.send_command(store.getActiveSerial(), {
            ClearSampleProcessError: []
          });

          return;
        }
        if (newValue === true) {
          this.$refs.add_sample_error.openModal(undefined, this.$refs.add_sample_button);
        }
      },
      immediate: true
    }
  }
};
</script>

<style scoped>
.pad-panel {
  display: grid;
  gap: 14px;
  width: 360px;
  padding: 6px 0 4px;
}

.pad-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.field-label {
  font-family: var(--f-mono);
  font-size: 10px;
  letter-spacing: .08em;
  text-transform: uppercase;
  color: var(--c-muted);
}

.pad-panel .lighting-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin: 0;
  padding: 6px 12px;
  border: 1px solid var(--c-line);
  border-radius: 6px;
  background-color: var(--c-raised);
  color: var(--c-text);
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
}

.pad-panel .lighting-button:hover {
  border-color: var(--c-line-strong);
}

.pad-panel .lighting-button:focus-visible {
  outline: 2px solid var(--c-accent);
  outline-offset: 2px;
}

.pad-select {
  flex: 1;
  max-width: 220px;
  padding: 6px 8px;
  border: 1px solid var(--c-line);
  border-radius: 6px;
  background-color: var(--c-raised);
  color: var(--c-text);
  font-size: 12px;
}

.pads {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.pad-panel .pad {
  position: relative;
  display: grid;
  gap: 4px;
  align-content: start;
  min-height: 92px;
  margin: 0;
  padding: 10px 12px;
  border: 1px solid var(--c-line);
  border-radius: 10px;
  background-color: var(--c-raised);
  color: var(--c-text);
  text-align: left;
  cursor: pointer;
}

.pad-panel .pad.filled {
  border-color: color-mix(in srgb, var(--c-accent) 50%, var(--c-line));
}

.pad-panel .pad:hover {
  background-color: var(--c-hover);
}

.pad-panel .pad.selected {
  box-shadow: 0 0 0 2px var(--c-accent);
}

.pad-panel .pad.drop {
  border: 2px dashed var(--c-accent);
  background-color: color-mix(in srgb, var(--c-accent) 12%, var(--c-raised));
}

.pad-panel .pad:focus-visible {
  outline: 2px solid var(--c-accent);
  outline-offset: 2px;
}

.pad-key {
  font-family: var(--f-mono);
  font-size: 10px;
  letter-spacing: .08em;
  text-transform: uppercase;
  color: var(--c-muted);
}

.pad-name {
  font-weight: 600;
  font-size: 13px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.pad-meta {
  font-size: 11px;
  color: var(--c-muted);
}

.pad-tip {
  font-size: 11px;
  font-weight: 600;
  color: var(--c-accent);
}

button {
  border: 0;
  background-color: transparent;
  padding: 0;
  margin-left: 5px;
}

.openButton {
  display: inline-block;
  color: var(--c-muted);
  font-size: 14px;
}

.openButton:hover {
  color: var(--c-text);
  cursor: pointer;
}
</style>
