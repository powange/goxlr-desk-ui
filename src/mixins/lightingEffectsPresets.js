// Shared logic (data, methods) of the former LightingEffectsPresets page, used by the components
// that replaced it. It has no template of its own.
import {
  EffectLightingPresets,
  EffectPresets, getLightingInactiveOptions,
  LightingInactiveOptions
} from "@/util/mixerMapping";

import {store} from "@/store";
import {websocket} from "@/util/sockets";

export default {


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
