// Shared logic (data, methods) of the former LightingSampler page, used by the components
// that replaced it. It has no template of its own.
import {store} from "@/store";
import {websocket} from "@/util/sockets";
import {getLightingInactiveOptions, LightingInactiveOptions} from "@/util/mixerMapping";

export default {

  data() {
    return {
      selectedButtonOption: 'SamplerSelectA',
    }
  },

  methods: {
    getLightingInactiveOptions,
    getButtonOptions() {
      return [
        {
          id: 'SamplerSelectA',
          label: this.$t('message.lighting.sampler.buttons.a')
        },
        {
          id: 'SamplerSelectB',
          label: this.$t('message.lighting.sampler.buttons.b')
        },
        {
          id: 'SamplerSelectC',
          label: this.$t('message.lighting.sampler.buttons.c')
        }
      ];
    },

    getNodes() {
      return [this.selectedButtonOption];
    },

    activeColor() {
      return "#" + store.getActiveDevice().lighting.sampler[this.selectedButtonOption].colours["colour_one"];
    },

    inactiveColor() {
      return "#" + store.getActiveDevice().lighting.sampler[this.selectedButtonOption].colours["colour_two"];
    },

    emptyColor() {
      return "#" + store.getActiveDevice().lighting.sampler[this.selectedButtonOption].colours["colour_three"];
    },

    selectedInactiveOption() {
      return store.getActiveDevice().lighting.sampler[this.selectedButtonOption].off_style
    },

    onButtonSelectionChange(id) {
      this.selectedButtonOption = id
    },

    onInactiveSelectionChange(id) {
      websocket.send_command(store.getActiveSerial(), {"SetSampleOffStyle": [this.selectedButtonOption, id]});
    },

    onActiveColourChange(value) {
      let colour_one = value.substr(1, 6);
      let colour_two = store.getActiveDevice().lighting.sampler[this.selectedButtonOption].colours.colour_two;
      let colour_three = store.getActiveDevice().lighting.sampler[this.selectedButtonOption].colours.colour_three;

      websocket.send_command(store.getActiveSerial(), {"SetSampleColour": [this.selectedButtonOption, colour_one, colour_two, colour_three]})
    },

    onEmptyColourChange(value) {
      let colour_one = store.getActiveDevice().lighting.sampler[this.selectedButtonOption].colours.colour_one;
      let colour_two = store.getActiveDevice().lighting.sampler[this.selectedButtonOption].colours.colour_two;
      let colour_three = value.substr(1, 6);

      websocket.send_command(store.getActiveSerial(), {"SetSampleColour": [this.selectedButtonOption, colour_one, colour_two, colour_three]})
    },

    onInactiveColourChange(value) {
      let colour_one = store.getActiveDevice().lighting.sampler[this.selectedButtonOption].colours.colour_one;
      let colour_two = value.substr(1, 6);
      let colour_three = store.getActiveDevice().lighting.sampler[this.selectedButtonOption].colours.colour_three;

      websocket.send_command(store.getActiveSerial(), {"SetSampleColour": [this.selectedButtonOption, colour_one, colour_two, colour_three]})
    },

    applyToAll() {
      const bank = store.getActiveDevice().lighting.sampler[this.selectedButtonOption].colours;
      const activeColour = bank.colour_one;
      const inactiveColour = bank.colour_two;
      const emptyColour = bank.colour_three;

      const off_style = this.selectedInactiveOption();
      const buttonOptions = this.getButtonOptions();

      for (let option in buttonOptions) {
        let id = buttonOptions[option].id;
        websocket.send_command(store.getActiveSerial(), {"SetSampleColour": [id, activeColour, inactiveColour, emptyColour]});
        websocket.send_command(store.getActiveSerial(), {"SetSampleOffStyle": [id, off_style]});
      }
    }
  }
}
