<template>
  <div class="rows">
    <label class="row">
      <span class="row-label">{{ $t('message.lighting.effects.encoders.title') }}</span>
      <select :value="selectedEncoder" @change="selectedEncoder = $event.target.value">
        <option v-for="option in getEncoderOptions()" :key="option.id" :value="option.id">{{ option.label }}</option>
      </select>
    </label>
    <div class="row">
      <span class="row-label">{{ $t('message.lighting.effects.encoders.leftColour') }}</span>
      <ColourPicker inline :title="$t('message.lighting.effects.encoders.leftColour')" :color-value="leftColour()"
                    @colour-changed="onLeftColourChange"/>
    </div>
    <div class="row">
      <span class="row-label">{{ $t('message.lighting.effects.encoders.rightColour') }}</span>
      <ColourPicker inline :title="$t('message.lighting.effects.encoders.rightColour')" :color-value="rightColour()"
                    @colour-changed="onRightColourChange"/>
    </div>
    <div class="row">
      <span class="row-label">{{ $t('message.lighting.effects.encoders.knobColour') }}</span>
      <ColourPicker inline :title="$t('message.lighting.effects.encoders.knobColour')" :color-value="knobColour()"
                    @colour-changed="onKnobColourChange"/>
    </div>
  </div>
</template>

<script>
import LightingEffectsEncoders from "@/components/sections/lighting/subTabs/effects/LightingEffectsEncoders.vue";
import ColourPicker from "@/components/sections/lighting/elements/ColourPicker.vue";

// The colours of one encoder (left and right of its ring, and its knob), starting on `initial`.
export default {
  name: "EncoderLightingRows",
  extends: LightingEffectsEncoders,
  components: {ColourPicker},

  props: {
    initial: {type: String, required: false, default: undefined},   // Reverb, Echo, Pitch, Gender
  },

  created() {
    if (this.initial) this.selectedEncoder = this.initial;
  },
}
</script>
