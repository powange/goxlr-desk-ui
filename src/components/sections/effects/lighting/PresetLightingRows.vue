<template>
  <ButtonLighting flat :active-colour="activeColor()" :inactive-colour="inactiveColor()" :off-style="selectedInactiveOption()"
                  @active-changed="onActiveColourChange" @inactive-changed="onInactiveColourChange"
                  @off-style-changed="onInactiveSelectionChange"/>
</template>

<script>
import lightingEffectsPresets from "@/mixins/lightingEffectsPresets";
import ButtonLighting from "@/components/sections/lighting/elements/ButtonLighting.vue";
import {EffectLightingPresets, EffectPresets} from "@/util/mixerMapping";

// The lighting of one effect preset button, from the Lighting section's preset settings.
export default {
  name: "PresetLightingRows",
  extends: lightingEffectsPresets,
  components: {ButtonLighting},

  props: {
    preset: {type: String, required: true},   // Preset1..Preset6
  },

  watch: {
    preset: {
      immediate: true,
      handler(preset) {
        this.activePreset = EffectLightingPresets[EffectPresets.indexOf(preset)];
      },
    },
  },
}
</script>
