<template>
  <div class="mic-page">
    <MicChain/>
    <Panel :title="$t('message.microphone.equaliser.title')"
           :subtitle="fineTune ? $t('message.microphone.chain.curveHintFine') : $t('message.microphone.chain.curveHint')">
      <template #actions>
        <label class="fine-tune">
          <span>{{ $t('message.microphone.chain.fineTune') }}</span>
          <Toggle v-model="fineTune" :label="$t('message.microphone.chain.fineTune')"/>
        </label>
        <SegmentedControl v-if="eqState.modified" :label="$t('message.microphone.equaliser.compare')"
                          :options="[{id: 'saved', label: $t('message.microphone.equaliser.before')}, {id: 'edits', label: $t('message.microphone.equaliser.after')}]"
                          :selected="eqState.showingSaved ? 'saved' : 'edits'"
                          @selection-changed="$refs.curve.showSaved($event === 'saved')"/>
        <AppButton @click="$refs.curve.reset()">{{ $t('message.microphone.equaliser.reset') }}</AppButton>
        <AppButton variant="primary" :disabled="!eqState.modified" @click="$refs.curve.save()"
                   :title="$t('message.microphone.equaliser.saveHint', {profile: micProfile()})">
          <font-awesome-icon icon="fa-solid fa-floppy-disk"/>
          <span>{{ $t('message.microphone.equaliser.save') }}</span>
        </AppButton>
      </template>
      <EqCurve ref="curve" :fine-tune="fineTune" @compare-state="eqState = $event"/>
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
import AppButton from "@/components/design/AppButton.vue";
import Gate from "./mic/Gate.vue";
import Compressor from "./mic/Compressor.vue";
import MicExtra from "./mic/MicExtra.vue";
import Cough from "@/components/sections/Cough.vue";
import MicChain from "@/components/sections/mic/MicChain.vue";
import EqCurve from "@/components/sections/mic/EqCurve.vue";
import Panel from "@/components/design/Panel.vue";
import Toggle from "@/components/design/Toggle.vue";
import SegmentedControl from "@/components/design/SegmentedControl.vue";
import {store} from "@/store";
import MicSetupButton from "@/components/sections/system/modals/MicSetupButton.vue";
import ContentBox from "@/components/ContentBox.vue";
import ContentContainer from "@/components/containers/ContentContainer.vue";

export default {
  name: "MicSections",
  components: {AppButton, Toggle, SegmentedControl,
    Cough,
    MicChain,
    EqCurve,
    Panel,
    ContentContainer,
    ContentBox, MicSetupButton, MicExtra, Compressor, Gate},

  data() {
    return {
      // Off each time the page opens, the points then only move up and down
      fineTune: false,
      eqState: {modified: false, showingSaved: false},
    };
  },

  methods: {
    micProfile() {
      return store.getActiveDevice().mic_profile_name;
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

.mic-page {
  display: grid;
  gap: 16px;
  padding: var(--page-gutter) var(--page-gutter) 0;
}

</style>
