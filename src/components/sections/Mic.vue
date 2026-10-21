<template>
  <div class="mic-page">
    <MicChain/>
    <Panel :title="$t('message.microphone.equaliser.title')" :subtitle="$t('message.microphone.chain.curveHint')">
      <EqCurve/>
    </Panel>
  </div>
  <div style="display: flex">
    <ContentContainer>
      <ContentBox>
        <MicSetupButton @mic-setup-open="mic_open" />
      </ContentBox>
      <Gate ref="gate" />
      <Equaliser/>
      <Compressor/>
      <MicExtra />
      <Cough />
    </ContentContainer>
  </div>
</template>

<script>
import Gate from "./mic/Gate.vue";
import Equaliser from "./mic/Equalizer.vue";
import Compressor from "./mic/Compressor.vue";
import MicExtra from "./mic/MicExtra.vue";
import Cough from "@/components/sections/Cough.vue";
import MicChain from "@/components/sections/mic/MicChain.vue";
import EqCurve from "@/components/sections/mic/EqCurve.vue";
import Panel from "@/components/design/Panel.vue";
import MicSetupButton from "@/components/sections/system/modals/MicSetupButton.vue";
import ContentBox from "@/components/ContentBox.vue";
import ContentContainer from "@/components/containers/ContentContainer.vue";

export default {
  name: "MicSections",
  components: {
    Cough,
    MicChain,
    EqCurve,
    Panel,
    ContentContainer,
    ContentBox, MicSetupButton, MicExtra, Compressor, Equaliser, Gate},

  methods: {
    mic_open: function() {
      this.$refs.gate.force_stop_graph();
    }
  }
}
</script>

<style scoped>
.mic-page {
  display: grid;
  gap: 16px;
  padding: 24px 40px 0;
}

</style>
