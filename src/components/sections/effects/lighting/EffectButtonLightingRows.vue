<template>
  <div class="rows">
    <label class="row">
      <span class="row-label">{{ $t('message.lighting.effects.buttons.title') }}</span>
      <select :value="selectedEffect" @change="selectedEffect = $event.target.value">
        <option v-for="option in getEffectOptions()" :key="option.id" :value="option.id">{{ option.label }}</option>
      </select>
    </label>
    <ButtonLighting flat :active-colour="activeColor()" :inactive-colour="inactiveColor()" :off-style="selectedInactiveOption()"
                    @active-changed="onActiveColourChange" @inactive-changed="onInactiveColourChange"
                    @off-style-changed="onInactiveSelectionChange"/>
  </div>
</template>

<script>
import LightingEffectsEffects from "@/components/sections/lighting/subTabs/effects/LightingEffectsEffects.vue";
import ButtonLighting from "@/components/sections/lighting/elements/ButtonLighting.vue";

// The lighting of one effect button (Megaphone, Robot, Hardtune, FX), starting on `initial`.
export default {
  name: "EffectButtonLightingRows",
  extends: LightingEffectsEffects,
  components: {ButtonLighting},

  props: {
    initial: {type: String, required: false, default: undefined},   // EffectMegaphone, ...
  },

  created() {
    if (this.initial) this.selectedEffect = this.initial;
  },
}
</script>
