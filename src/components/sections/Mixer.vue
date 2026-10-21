<template>
  <div class="mixer-page">
    <!-- Options that apply to the whole mixer -->
    <div v-if="isSubMixSupported()" class="options">
      <label class="option">
        <Toggle :model-value="submixEnabled()" @update:model-value="setSubmixEnabled" :label="$t('message.mixer.submix')"/>
        <span>{{ $t('message.mixer.submix') }}</span>
      </label>
      <span class="option-hint">{{ $t('message.mixer.submixHint') }}</span>
    </div>

    <!-- The four physical faders -->
    <div class="strips">
      <!-- With submixes on, which mix each output gets comes first -->
      <MixAssignment v-if="submixEnabled()"/>
      <FaderStrip v-for="fader in faders" :key="fader" :fader="fader" @lighting="openLighting">
        <SubmixSlider v-if="submixEnabled() && inputMixer.includes(faderChannel(fader))" :id=channelNames.indexOf(faderChannel(fader))
                      :title="getChannelName(faderChannel(fader))" :slider-min-value=0 :slider-max-value=255
                      :text-min-value=0 :text-max-value=100 :text-suffix="$t('message.suffixes.percentage')"
                      :slider-a-value="getValue(faderChannel(fader))" :slider-b-value="getSubmixValue(faderChannel(fader))"
                      :submix-linked="isSubMixLinked(faderChannel(fader))" :dimmed="isSubmixDimmed(faderChannel(fader))"
                      :store-path="getSubmixPaths(faderChannel(fader))" @value-changed="submixValueChange"
                      @submix-linked="submixLinkChanged"
        />
        <Slider v-else :id=channelNames.indexOf(faderChannel(fader)) :title="getChannelName(faderChannel(fader))"
                :slider-min-value=0 :slider-max-value=255 :text-min-value=0 :text-max-value=100
                :text-suffix="$t('message.suffixes.percentage')" :slider-value="getValue(faderChannel(fader))"
                :store-path="getStorePath(faderChannel(fader))" @value-changed="valueChange"
        />
      </FaderStrip>
    </div>

    <CenteredContainer>

      <GroupContainer v-if="!submixEnabled()" :title="$t('message.mixer.otherInputs')">
        <Slider v-for="item in otherInputs()" :key=item :id=channelNames.indexOf(item) :title="getChannelName(item)"
                :slider-min-value=0 :slider-max-value=255 :text-min-value=0 :text-max-value=100
                :text-suffix="$t('message.suffixes.percentage')" :slider-value="getValue(item)"
                :store-path="getStorePath(item)" @value-changed="valueChange"
        />
      </GroupContainer>
      <GroupContainer v-else :title="$t('message.mixer.otherInputs')">
        <SubmixSlider v-for="item in otherInputs()" :key=item :id=channelNames.indexOf(item)
                      :title="getChannelName(item)" :slider-min-value=0 :slider-max-value=255 :text-min-value=0
                      :text-max-value=100 :text-suffix="$t('message.suffixes.percentage')"
                      :slider-a-value="getValue(item)" :slider-b-value="getSubmixValue(item)"
                      :submix-linked="isSubMixLinked(item)" :dimmed="isSubmixDimmed(item)"
                      :store-path="getSubmixPaths(item)" @value-changed="submixValueChange"
                      @submix-linked="submixLinkChanged"
        />
      </GroupContainer>

      <GroupContainer :title="$t('message.mixer.outputs')" @expando-clicked="isVisible = !isVisible"
                      :expanded="isVisible">
        <Slider v-for="item in otherOutputs()" :key=item :id=channelNames.indexOf(item)
                :title="getChannelName(item)" :slider-min-value=0 :slider-max-value=255 :text-min-value=0
                :text-max-value=100 :text-suffix="$t('message.suffixes.percentage')" :slider-value="getValue(item)"
                :store-path="getStorePath(item)" @value-changed="valueChange"
                v-show="!submixEnabled() || !submixHide.includes(item)"
        />
      </GroupContainer>
    </CenteredContainer>

    <AccessibleModal ref="lightingModal" id="faderLighting" width="min(900px, 94vw)" body-padding="0"
                     @modal-close="lightingFader = undefined">
      <template v-slot:title>{{ $t('message.mixer.strip.lightingTitle', { channel: lightingFader ? $t(`message.faders.${lightingFader}`) : '' }) }}</template>
      <ChannelLighting v-if="lightingFader" :key="lightingFader" :fixed-channel="lightingFader"/>
    </AccessibleModal>
  </div>
</template>

<script>
import Slider from "../slider/Slider.vue";
import {
  ChannelName,
  channelNameToInputDevice,
  InputMixer,
  OutputDevice,
  OutputMixer,
  OutputMixerSubmixHidden,
} from "@/util/mixerMapping";
import {store} from "@/store";
import {websocket} from "@/util/sockets";
import GroupContainer from "@/components/containers/GroupContainer.vue";
import SubmixSlider from "@/components/slider/SubmixSlider.vue";
import CenteredContainer from "@/components/containers/CenteredContainer.vue";
import MixAssignment from "@/components/sections/mixer/MixAssignment.vue";
import FaderStrip from "@/components/sections/mixer/FaderStrip.vue";
import Toggle from "@/components/design/Toggle.vue";
import AccessibleModal from "@/components/design/modal/AccessibleModal.vue";
import ChannelLighting from "@/components/sections/lighting/subTabs/ChannelLighting.vue";

export default {
  name: "MixerTop",
  components: {ChannelLighting, AccessibleModal, Toggle, FaderStrip, MixAssignment, CenteredContainer, SubmixSlider, GroupContainer, Slider},

  data() {
    return {
      inputMixer: InputMixer,
      outputMixer: OutputMixer,
      submixHide: OutputMixerSubmixHidden,
      outputDevices: OutputDevice,
      channelNames: ChannelName,

      faders: ["A", "B", "C", "D"],
      // The fader whose lighting dialog is open
      lightingFader: undefined,
      isVisible: false,
      updatesPaused: false,
      volumes: [],
    }
  },

  methods: {
    faderChannel(fader) {
      return store.getActiveDevice().fader_status[fader].channel;
    },

    // Channels on a physical fader are shown in its strip rather than in the groups below
    onFaders() {
      return this.faders.map(fader => this.faderChannel(fader));
    },

    otherInputs() {
      return this.inputMixer.filter(channel => !this.onFaders().includes(channel));
    },

    otherOutputs() {
      return this.outputMixer.filter(channel => !this.onFaders().includes(channel));
    },

    getChannelName(channel) {
      return this.$t(`message.channels.${channel}`);
    },

    valueChange(id, volume, last) {
      let str_id = this.channelNames[id];
      let command = undefined;

      command = {
        "SetVolume": [
          str_id,
          volume
        ]
      };

      if (!this.updatesPaused || last) {
        this.updatesPaused = true;
        websocket.send_command(store.getActiveSerial(), command).then(() => this.updatesPaused = false);
      }

      store.getActiveDevice().levels.volumes[str_id] = volume;
    },

    submixValueChange(id, volume, side, last) {
      let str_id = this.channelNames[id];
      let command = undefined;
      if (side === 'A') {
        command = {
          "SetVolume": [str_id, volume]
        };
        store.getActiveDevice().levels.volumes[str_id] = volume;
      } else {
        command = {
          "SetSubMixVolume": [str_id, volume]
        };
        store.getActiveDevice().levels.submix.inputs[str_id].volume = volume;
      }

      if (!this.updatesPaused || last) {
        this.updatesPaused = true;
        websocket.send_command(store.getActiveSerial(), command).then(() => this.updatesPaused = false);
      }

      if (store.getActiveDevice().levels.submix.inputs[str_id].linked) {
        if (side === 'A') {
          this.syncSubmix(str_id, volume);
        } else {
          this.syncMix(str_id, volume);
        }
      }
    },

    syncMix(name, volume) {
      let ratio = store.getActiveDevice().levels.submix.inputs[name].ratio;

      // Calculate the Main volume..
      let calculated_volume = parseInt(volume) / ratio;
      store.getActiveDevice().levels.volumes[name] = Math.min(Math.floor(calculated_volume), 255);
    },

    syncSubmix(name, volume) {
      let ratio = store.getActiveDevice().levels.submix.inputs[name].ratio;

      // Calculate the Submix Volume..
      let calculated_volume = Math.min(parseInt(volume) * ratio, 255);
      store.getActiveDevice().levels.submix.inputs[name].volume = Math.max(Math.floor(calculated_volume), 0);
    },

    getValue(id) {
      if (id === 11) {
        return store.getActiveDevice().levels.bleep;
      }
      return store.getActiveDevice().levels.volumes[id];
    },

    getSubmixValue(name) {
      return store.getActiveDevice().levels.submix.inputs[name].volume;
    },

    getStorePath(id) {
      return "/mixers/" + store.getActiveSerial() + "/levels/volumes/" + id;
    },

    getSubmixPaths(id) {
      return this.getStorePath(id) + ";/mixers/" + store.getActiveSerial() + "/levels/submix/inputs/" + id + "/volume"
    },

    isSubMixLinked(name) {
      return store.getActiveDevice().levels.submix.inputs[name].linked;
    },

    isSubmixDimmed(name) {
      // Get the Active Monitor...
      let monitor = store.getActiveDevice().levels.output_monitor;
      return !store.getActiveDevice().router[channelNameToInputDevice(name)][monitor];
    },

    submixEnabled() {
      if (!this.isSubMixSupported()) {
        return false;
      }

      return store.getActiveDevice().levels.submix !== null;
    },

    // Opens the lighting settings of one fader (its lights, screen and mute button)
    // A fresh dialog on each opening, so it reads the current settings (screen text..)
    openLighting(fader) {
      this.lightingFader = undefined;
      this.$nextTick(() => {
        this.lightingFader = fader;
        this.$refs.lightingModal.openModal();
      });
    },

    setSubmixEnabled(enabled) {
      let command = {
        "SetSubMixEnabled": enabled
      };

      websocket.send_command(store.getActiveSerial(), command);
    },

    isSubMixSupported() {
      return store.getActiveDevice().levels.submix_supported;
    },

    getOutputMix(name) {
      return store.getActiveDevice().levels.submix.outputs[name];
    },

    submixLinkChanged(id, value) {
      let str_id = this.channelNames[id];
      let command = {
        "SetSubMixLinked": [str_id, value]
      };
      websocket.send_command(store.getActiveSerial(), command);
    }
  }
}
</script>

<style scoped>
label {
  color: var(--c-text);
}

.mixer-page {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 0 auto;
}

.options {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 16px;
  padding: 10px 14px;
  background-color: var(--c-panel);
  border: 1px solid var(--c-line);
  border-radius: 8px;
}

.option {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;
  cursor: pointer;
}

.option-hint {
  color: var(--c-muted);
  font-size: 12px;
}

.strips {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 12px;
}
</style>
