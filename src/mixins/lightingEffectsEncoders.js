// Shared logic (data, methods) of the former LightingEffectsEncoders page, used by the components
// that replaced it. It has no template of its own.
import {store} from "@/store";
import {websocket} from "@/util/sockets";
import {LightingInactiveOptions} from "@/util/mixerMapping";

export default {

  data() {
    return {
      selectedEncoder: "Reverb",
      inactiveOptions: LightingInactiveOptions
    }
  },

  methods: {
    getEncoderOptions() {
      return [
        {
          id: 'Reverb',
          label: this.$t('message.lighting.effects.encoders.encoders.reverb')
        },
        {
          id: 'Echo',
          label: this.$t('message.lighting.effects.encoders.encoders.echo')
        },
        {
          id: 'Pitch',
          label: this.$t('message.lighting.effects.encoders.encoders.pitch')
        },
        {
          id: 'Gender',
          label: this.$t('message.lighting.effects.encoders.encoders.gender')
        },
      ];
    },

    leftColour() {
      return "#" + store.getActiveDevice().lighting.encoders[this.selectedEncoder]["colour_two"]
    },

    rightColour() {
      return "#" + store.getActiveDevice().lighting.encoders[this.selectedEncoder]["colour_one"]
    },

    knobColour() {
      return "#" + store.getActiveDevice().lighting.encoders[this.selectedEncoder]["colour_three"]
    },

    onButtonSelectionChange(id) {
      this.selectedEncoder = id
    },

    onLeftColourChange(value) {
      const encoder = store.getActiveDevice().lighting.encoders[this.selectedEncoder];

      const leftColour = value.substr(1, 6);
      const rightColour = encoder.colour_one;
      const knobColour = encoder.colour_three;

      websocket.send_command(store.getActiveSerial(), {"SetEncoderColour": [this.selectedEncoder, rightColour, leftColour, knobColour]})
    },

    onRightColourChange(value) {
      const encoder = store.getActiveDevice().lighting.encoders[this.selectedEncoder];

      const leftColour = encoder.colour_two;
      const rightColour = value.substr(1, 6);
      const knobColour = encoder.colour_three;

      websocket.send_command(store.getActiveSerial(), {"SetEncoderColour": [this.selectedEncoder, rightColour, leftColour, knobColour]})
    },

    onKnobColourChange(value) {
      const encoder = store.getActiveDevice().lighting.encoders[this.selectedEncoder];

      const leftColour = encoder.colour_two;
      const rightColour = encoder.colour_one;
      const knobColour = value.substr(1, 6);

      websocket.send_command(store.getActiveSerial(), {"SetEncoderColour": [this.selectedEncoder, rightColour, leftColour, knobColour]})
    },

    applyToAll() {
      const encoder = store.getActiveDevice().lighting.encoders[this.selectedEncoder];
      const rightColour = encoder.colour_one;
      const leftColour = encoder.colour_two;
      const knobColour = encoder.colour_three;

      for (let encoder in this.getEncoderOptions()) {
        let id = this.getEncoderOptions()[encoder].id;
        websocket.send_command(store.getActiveSerial(), {"SetEncoderColour": [id, rightColour, leftColour, knobColour]});
      }
    }
  }
}
