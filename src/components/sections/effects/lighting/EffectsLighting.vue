<template>
  <div class="effects-lighting">
    <section class="sect">
      <div class="sect-head">
        <h3>{{ $t('message.effects.lighting.presetButton', { name: presetName }) }}</h3>
        <AppButton variant="link" @click="$refs.preset.applyToAll()">{{ $t('message.effects.lighting.applyPresets') }}</AppButton>
      </div>
      <PresetLightingRows ref="preset" :preset="preset"/>
    </section>

    <section class="sect">
      <div class="sect-head">
        <h3>{{ $t('message.effects.lighting.encoders') }}</h3>
        <AppButton variant="link" @click="$refs.encoder.applyToAll()">{{ $t('message.effects.lighting.applyEncoders') }}</AppButton>
      </div>
      <EncoderLightingRows ref="encoder" :initial="initialEncoder"/>
    </section>

    <section class="sect">
      <div class="sect-head">
        <h3>{{ $t('message.effects.lighting.buttons') }}</h3>
        <AppButton variant="link" @click="$refs.button.applyToAll()">{{ $t('message.effects.lighting.applyButtons') }}</AppButton>
      </div>
      <EffectButtonLightingRows ref="button" :initial="initialButton"/>
    </section>
  </div>
</template>

<script>
import AppButton from "@/components/design/AppButton.vue";
import PresetLightingRows from "@/components/sections/effects/lighting/PresetLightingRows.vue";
import EncoderLightingRows from "@/components/sections/effects/lighting/EncoderLightingRows.vue";
import EffectButtonLightingRows from "@/components/sections/effects/lighting/EffectButtonLightingRows.vue";

// The effects' lighting, opened from the Effects section: the active preset's button, the
// encoders and the effect buttons. The encoder or button selected on the page comes first.
const ENCODERS = {reverb: "Reverb", echo: "Echo", pitch: "Pitch", gender: "Gender"};
const BUTTONS = {megaphone: "EffectMegaphone", robot: "EffectRobot", hard_tune: "EffectHardTune"};

export default {
  name: "EffectsLighting",
  components: {AppButton, PresetLightingRows, EncoderLightingRows, EffectButtonLightingRows},

  props: {
    preset: {type: String, required: true},
    presetName: {type: String, required: true},
    selectedEffect: {type: String, required: false, default: "reverb"},
  },

  computed: {
    initialEncoder() {
      return ENCODERS[this.selectedEffect];
    },
    initialButton() {
      return BUTTONS[this.selectedEffect];
    },
  },
}
</script>

<style scoped>
.effects-lighting {
  color: var(--c-text);
}

.sect {
  display: grid;
  gap: 10px;
  padding: 14px 18px;
  border-bottom: 1px solid var(--c-line);
}

.sect:last-child {
  border-bottom: 0;
}

.sect-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.sect-head h3 {
  margin: 0;
  font-family: var(--f-mono);
  font-size: 12px;
  font-weight: 500;
  letter-spacing: .08em;
  text-transform: uppercase;
  color: var(--c-muted);
}




:deep(.rows) {
  display: grid;
  gap: 10px;
}

:deep(.row) {
  display: grid;
  grid-template-columns: 130px 1fr;
  align-items: center;
  gap: 12px;
  min-height: 32px;
}

:deep(.row-label) {
  color: var(--c-muted);
  font-size: 12px;
}

:deep(select) {
  justify-self: start;
  min-width: 200px;
  padding: 6px 8px;
  border: 1px solid var(--c-line);
  border-radius: 6px;
  background-color: var(--c-raised);
  color: var(--c-text);
  font-size: 12px;
}
</style>
