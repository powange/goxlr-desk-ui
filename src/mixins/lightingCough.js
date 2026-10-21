// Shared logic (data, methods) of the former LightingCough page, used by the components
// that replaced it. It has no template of its own.
import {store} from "@/store";
import {websocket} from "@/util/sockets";
import {getLightingInactiveOptions, LightingInactiveOptions} from "@/util/mixerMapping";

export default {

  data() {
    return {
      selectedButtonOption: 'Bleep',
    }
  },

  methods: {
    getLightingInactiveOptions,
    getButtonOptions() {
      return [
        {
          id: 'Bleep',
          label: this.$t('message.lighting.cough.buttons.bleep'),
        },
        {
          id: 'Cough',
          label: this.$t('message.lighting.cough.buttons.cough')
        }
      ];
    },

    getNodes() {
      return [];
    },

    activeColor() {
      return "#" + store.getActiveDevice().lighting.buttons[this.selectedButtonOption].colours["colour_one"];
    },

    inactiveColor() {
      return "#" + store.getActiveDevice().lighting.buttons[this.selectedButtonOption].colours["colour_two"];
    },

    selectedInactiveOption() {
      return store.getActiveDevice().lighting.buttons[this.selectedButtonOption].off_style
    },

    onButtonSelectionChange(id) {
      this.selectedButtonOption = id
    },

    onInactiveSelectionChange(id) {
      websocket.send_command(store.getActiveSerial(), {"SetButtonOffStyle": [this.selectedButtonOption, id]});
    },

    onActiveColourChange(value) {
      let active = value.substr(1, 6);
      let inactive = store.getActiveDevice().lighting.buttons[this.selectedButtonOption].colours.colour_two;

      websocket.send_command(store.getActiveSerial(), {"SetButtonColours": [this.selectedButtonOption, active, inactive]});
    },

    onInactiveColourChange(value) {
      let active = store.getActiveDevice().lighting.buttons[this.selectedButtonOption].colours.colour_one;
      let inactive = value.substr(1, 6);

      websocket.send_command(store.getActiveSerial(), {"SetButtonColours": [this.selectedButtonOption, active, inactive]});
    }
  }
}
