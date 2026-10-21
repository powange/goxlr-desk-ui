<template>
  <!-- Build the Modal -->
  <CenteredContainer>
    <ContentContainer>
      <div class="type-column">
        <RadioSelection ref="selection" :title="$t('message.microphone.setup.type')" group="mic_type" :options="getMicrophoneOptions()" :selected="getActiveMicType()" @selection-changed="handleButtonPress" />
        <!-- Phantom power can pop loudly, and not every microphone takes it: confirm first -->
        <div v-if="confirmPhantom" class="phantom-confirm" role="alertdialog" aria-labelledby="phantomTitle" aria-describedby="phantomText">
          <strong id="phantomTitle">{{ $t('message.microphone.setup.phantomTitle', {voltage: voltage()}) }}</strong>
          <p id="phantomText">{{ $t('message.microphone.setup.phantomWarning', {voltage: voltage()}) }}</p>
          <div class="phantom-actions">
            <AppButton ref="phantomOk" variant="primary" @click="setType('Condenser')">{{ $t('message.microphone.setup.phantomEnable') }}</AppButton>
            <AppButton @click="cancelPhantom">{{ $t('message.sampleManager.cancel') }}</AppButton>
          </div>
        </div>
      </div>

      <Slider :title="$t('message.microphone.setup.gain')" :slider-min-value=0 :slider-max-value=72 :text-suffix="$t('message.suffixes.decibels')"
              :slider-value=getGainValue() :store-path="getStorePath()" @value-changed="setGain" />

      <AudioMeter :active="polling" />
    </ContentContainer>
  </CenteredContainer>
</template>

<script>
import Slider from "@/components/slider/Slider.vue";
import {store} from "@/store";
import {websocket} from "@/util/sockets";
import RadioSelection from "@/components/lists/RadioSelection.vue";
import ContentContainer from "@/components/containers/ContentContainer.vue";
import CenteredContainer from "@/components/containers/CenteredContainer.vue";
import {isDeviceMini} from "@/util/util";
import AudioMeter from "@/components/sections/mic/AudioMeter.vue";
import AppButton from "@/components/design/AppButton.vue";

export default {
  name: "SetupModel",
  components: {AppButton, AudioMeter, CenteredContainer, ContentContainer, RadioSelection, Slider},
  data: function() {
    return {
      polling: false,
      // Waiting for confirmation before switching phantom power on
      confirmPhantom: false,
      current_value: -72,
    }
  },

  methods: {
    getMicrophoneOptions() {
      let voltage = "48";
      if (isDeviceMini()) {
        voltage = "24";
      }

      return [
        {id: "Dynamic", label: this.$t('message.microphone.setup.xlr')},
        {id: "Condenser", label: this.$t('message.microphone.setup.phantom', {voltage: voltage})},
        {id: "Jack", label: this.$t('message.microphone.setup.jack')}
      ];
    },

    getActiveMicType() {
      return store.getActiveDevice().mic_status.mic_type
    },

    getGainValue() {
      return store.getActiveDevice().mic_status.mic_gains[store.getActiveDevice().mic_status.mic_type];
    },

    setGain(id, value) {
      let command = {
        "SetMicrophoneGain": [
          store.getActiveDevice().mic_status.mic_type,
          value
        ]
      };
      websocket.send_command(store.getActiveSerial(), command);
      store.getActiveDevice().mic_status.mic_gains[store.getActiveDevice().mic_status.mic_type] = value;
    },

    voltage() {
      return isDeviceMini() ? "24" : "48";
    },

    handleButtonPress(id) {
      if (id === "Condenser" && this.getActiveMicType() !== "Condenser") {
        this.confirmPhantom = true;
        this.$nextTick(() => this.$refs.phantomOk.focus());
        return;
      }
      this.setType(id);
    },

    setType(id) {
      this.confirmPhantom = false;
      websocket.send_command(store.getActiveSerial(), {"SetMicrophoneType": id});
    },

    cancelPhantom() {
      this.confirmPhantom = false;
      this.$nextTick(() => this.focus());
    },

    getStorePath() {
      return "/mixers/" + store.getActiveSerial() + "/mic_status/mic_gains/" + store.getActiveDevice().mic_status.mic_type;
    },

    focus() {
      let activeType = store.getActiveDevice().mic_status.mic_type;
      let button = this.$refs.selection.getButtonByRef(activeType);
      button.focus();
    },

    opened() {
      this.polling = true;
    },
    closed() {
      this.polling = false;
      this.confirmPhantom = false;
    }
  },
}
</script>

<style scoped>
.type-column {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 260px;
}

.phantom-confirm {
  display: grid;
  gap: 8px;
  padding: 10px 12px;
  border: 1px solid var(--c-warn);
  border-radius: 8px;
  background-color: var(--c-panel);
  color: var(--c-text);
  font-size: 13px;
}

.phantom-confirm p {
  margin: 0;
  color: var(--c-text-soft);
}

.phantom-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
</style>
