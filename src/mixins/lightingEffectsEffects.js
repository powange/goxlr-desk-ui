// Shared logic (data, methods) of the former LightingEffectsEffects page, used by the components
// that replaced it. It has no template of its own.
import {store} from "@/store";
import {websocket} from "@/util/sockets";
import {getLightingInactiveOptions, LightingInactiveOptions} from "@/util/mixerMapping";

export default {

  data() {
    return {
      selectedEffect: "EffectMegaphone",
    }
  },

  methods: {
    getLightingInactiveOptions,

    getEffectOptions() {
      return [
        {
          id: 'EffectMegaphone',
          label: this.$t('message.lighting.effects.buttons.effect.megaphone')
        },
        {
          id: 'EffectRobot',
          label: this.$t('message.lighting.effects.buttons.effect.robot')
        },
        {
          id: 'EffectHardTune',
          label: this.$t('message.lighting.effects.buttons.effect.hardTune')
        },
        {
          id: 'EffectFx',
          label: this.$t('message.lighting.effects.buttons.effect.fx')
        }
      ]
    },

    activeColor() {
      return "#" + store.getActiveDevice().lighting.buttons[this.selectedEffect].colours["colour_one"];
    },

    inactiveColor() {
      return "#" + store.getActiveDevice().lighting.buttons[this.selectedEffect].colours["colour_two"];
    },

    selectedInactiveOption() {
      return store.getActiveDevice().lighting.buttons[this.selectedEffect].off_style
    },

    onButtonSelectionChange(id) {
      this.selectedEffect = id
    },

    onInactiveSelectionChange(id) {
      websocket.send_command(store.getActiveSerial(), {"SetButtonOffStyle": [this.selectedEffect, id]});
    },

    onActiveColourChange(value) {
      const active = value.substr(1, 6);
      const inactive = store.getActiveDevice().lighting.buttons[this.selectedEffect].colours.colour_two;

      websocket.send_command(store.getActiveSerial(), {"SetButtonColours": [this.selectedEffect, active, inactive]});
    },

    onInactiveColourChange(value) {
      const active = store.getActiveDevice().lighting.buttons[this.selectedEffect].colours.colour_one;
      const inactive = value.substr(1, 6);

      websocket.send_command(store.getActiveSerial(), {"SetButtonColours": [this.selectedEffect, active, inactive]});
    },

    applyToAll() {
      let colour_one = store.getActiveDevice().lighting.buttons[this.selectedEffect].colours.colour_one;
      let colour_two = store.getActiveDevice().lighting.buttons[this.selectedEffect].colours.colour_two;
      websocket.send_command(store.getActiveSerial(), {"SetButtonGroupColours": ["EffectTypes", colour_one, colour_two]});

      let off_style = store.getActiveDevice().lighting.buttons[this.selectedEffect].off_style;
      websocket.send_command(store.getActiveSerial(), {"SetButtonGroupOffStyle": ["EffectTypes", off_style]});
    }
  }
}
