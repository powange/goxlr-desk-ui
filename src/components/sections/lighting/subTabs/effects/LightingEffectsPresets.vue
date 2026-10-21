<script>
import GroupContainer from "@/components/containers/GroupContainer.vue";
import RadioSelection from "@/components/lists/RadioSelection.vue";
import ColourPicker from "@/components/sections/lighting/elements/ColourPicker.vue";
import ButtonLighting from "@/components/sections/lighting/elements/ButtonLighting.vue";

import {
  EffectLightingPresets,
  EffectPresets, getLightingInactiveOptions,
  LightingInactiveOptions
} from "@/util/mixerMapping";

import {store} from "@/store";
import {websocket} from "@/util/sockets";

export default {
  emits: ["nav-updated"],

  name: "LightingEffectsPresets",
  components: {
    ButtonLighting,
    GroupContainer,
    RadioSelection,
    ColourPicker
  },

  data() {
    return {
      effectPresets: EffectLightingPresets,
      activePreset: "EffectSelect1",
    }
  },

  methods: {
    getLightingInactiveOptions,
    presetLabels() {
      let presetLabels = []

      for (const preset of EffectPresets) {
        const label = store.getActiveDevice().effects.preset_names[preset];
        presetLabels.push({id: preset, label: label})
      }

      return presetLabels
    },

    getActivePreset() {
      // This needs to be mapped from the EffectPresets to the EffectLightingPresets..
      return EffectPresets[EffectLightingPresets.indexOf(this.activePreset)];
    },

    activeColor() {
      return "#" + store.getActiveDevice().lighting.buttons[this.activePreset].colours["colour_one"];
    },

    inactiveColor() {
      return "#" + store.getActiveDevice().lighting.buttons[this.activePreset].colours["colour_two"];
    },

    selectedInactiveOption() {
      return store.getActiveDevice().lighting.buttons[this.activePreset].off_style
    },

    onButtonSelectionChange(id) {
      this.activePreset = EffectLightingPresets[EffectPresets.indexOf(id)];
      this.$emit("nav-updated");
    },

    onInactiveSelectionChange(id) {
      websocket.send_command(store.getActiveSerial(), {"SetButtonOffStyle": [this.activePreset, id]});
    },

    onActiveColourChange(value) {
      const active = value.substr(1, 6);
      const inactive = store.getActiveDevice().lighting.buttons[this.activePreset].colours.colour_two;

      websocket.send_command(store.getActiveSerial(), {"SetButtonColours": [this.activePreset, active, inactive]});
    },

    onInactiveColourChange(value) {
      const active = store.getActiveDevice().lighting.buttons[this.activePreset].colours.colour_one;
      const inactive = value.substr(1, 6);

      websocket.send_command(store.getActiveSerial(), {"SetButtonColours": [this.activePreset, active, inactive]});
    },

    applyToAll() {
      let colour_one = store.getActiveDevice().lighting.buttons[this.activePreset].colours.colour_one;
      let colour_two = store.getActiveDevice().lighting.buttons[this.activePreset].colours.colour_two;
      websocket.send_command(store.getActiveSerial(), {"SetButtonGroupColours": ["EffectSelector", colour_one, colour_two]});

      let off_style = store.getActiveDevice().lighting.buttons[this.activePreset].off_style;
      websocket.send_command(store.getActiveSerial(), {"SetButtonGroupOffStyle": ["EffectSelector", off_style]});
    }
  }
}
</script>

<template>
  <GroupContainer :title="$t('message.lighting.effects.preset.title')">
    <template #right>
      <button class="applyToAll" @click="applyToAll()">{{ $t('message.lighting.common.applyToAll') }}</button>
    </template>
    <RadioSelection
        :title="$t('message.lighting.effects.preset.presetTitle')"
        max-width="200px"
        group="lighting_effects_presets"
        :options="presetLabels()"
        :selected="getActivePreset()"
        @selection-changed="onButtonSelectionChange"
    />
    <ButtonLighting :active-colour="activeColor()" :inactive-colour="inactiveColor()" :off-style="selectedInactiveOption()"
                    @active-changed="onActiveColourChange" @inactive-changed="onInactiveColourChange"
                    @off-style-changed="onInactiveSelectionChange"/>
  </GroupContainer>
</template>

<style scoped>
button {
  border: 0;
  margin: 0;
  padding: 5px 24px;
  color: var(--c-text);
  font-family: var(--f-body);
  font-size: 12px;
  background-color: var(--c-raised-2);
}

button:hover {
  background-color: var(--c-hover-strong);
}
</style>