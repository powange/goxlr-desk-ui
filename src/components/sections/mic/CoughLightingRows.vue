<template>
  <ButtonLighting flat :active-colour="activeColor()" :inactive-colour="inactiveColor()" :off-style="selectedInactiveOption()"
                  @active-changed="onActiveColourChange" @inactive-changed="onInactiveColourChange"
                  @off-style-changed="onInactiveSelectionChange"/>
</template>

<script>
import LightingCough from "@/components/sections/lighting/subTabs/LightingCough.vue";
import ButtonLighting from "@/components/sections/lighting/elements/ButtonLighting.vue";

// The lighting of the Cough or Bleep button, from the Lighting section's cough settings.
export default {
  name: "CoughLightingRows",
  extends: LightingCough,
  components: {ButtonLighting},

  props: {
    button: {type: String, required: true},   // Cough, Bleep
  },

  created() {
    this.selectedButtonOption = this.button;
  },
}
</script>
