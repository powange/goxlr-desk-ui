<template>
  <div class="mic-page">
    <MicChain/>
    <Panel :title="$t('message.microphone.equaliser.title')"
           :subtitle="isFineTune() ? $t('message.microphone.chain.curveHintFine') : $t('message.microphone.chain.curveHint')">
      <template #actions>
        <label class="fine-tune">
          <span>{{ $t('message.microphone.chain.fineTune') }}</span>
          <Toggle :model-value="isFineTune()" @update:model-value="setFineTune" :label="$t('message.microphone.chain.fineTune')"/>
        </label>
        <button type="button" class="reset" @click="$refs.curve.reset()">{{ $t('message.microphone.equaliser.reset') }}</button>
      </template>
      <EqCurve ref="curve"/>
    </Panel>
  </div>
  <div style="display: flex">
    <ContentContainer>
      <ContentBox>
        <MicSetupButton @mic-setup-open="mic_open" />
      </ContentBox>
      <Gate ref="gate" />
      <Compressor/>
      <MicExtra />
      <Cough ref="cough"/>
    </ContentContainer>
  </div>
</template>

<script>
import Gate from "./mic/Gate.vue";
import Compressor from "./mic/Compressor.vue";
import MicExtra from "./mic/MicExtra.vue";
import Cough from "@/components/sections/Cough.vue";
import MicChain from "@/components/sections/mic/MicChain.vue";
import EqCurve from "@/components/sections/mic/EqCurve.vue";
import Panel from "@/components/design/Panel.vue";
import Toggle from "@/components/design/Toggle.vue";
import {store} from "@/store";
import {websocket} from "@/util/sockets";
import MicSetupButton from "@/components/sections/system/modals/MicSetupButton.vue";
import ContentBox from "@/components/ContentBox.vue";
import ContentContainer from "@/components/containers/ContentContainer.vue";

export default {
  name: "MicSections",
  components: {
    Toggle,
    Cough,
    MicChain,
    EqCurve,
    Panel,
    ContentContainer,
    ContentBox, MicSetupButton, MicExtra, Compressor, Gate},

  methods: {
    isFineTune() {
      return store.getActiveDevice().settings.display.equaliser_fine === "Advanced";
    },

    setFineTune(enabled) {
      websocket.send_command(store.getActiveSerial(), {SetElementDisplayMode: ["EqFineTune", enabled ? "Advanced" : "Simple"]});
    },

    mic_open: function() {
      this.$refs.gate.force_stop_graph();
    }
  }
}
</script>

<style scoped>
.fine-tune {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: var(--c-muted);
}

.reset {
  padding: 5px 10px;
  border: 1px solid var(--c-line);
  border-radius: 6px;
  background-color: var(--c-raised);
  color: var(--c-text);
  font-size: 12px;
  cursor: pointer;
}

.reset:hover {
  border-color: var(--c-line-strong);
}

.mic-page {
  display: grid;
  gap: 16px;
  padding: 24px 40px 0;
}

</style>
