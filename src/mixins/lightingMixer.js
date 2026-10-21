// Shared logic (data, methods) of the former LightingMixer page, used by the components
// that replaced it. It has no template of its own.
import {store} from "@/store";
import {websocket} from "@/util/sockets";
import {
  getLightingInactiveOptions,
  MuteButtonNamesForFader,
  ScribbleNames
} from "@/util/mixerMapping";
import {isDeviceMini} from "@/util/util";

export default {

  props: {
    // Shows one fader's lighting only, without the fader choice
    fixedChannel: {type: String, required: false, default: undefined},
  },

  data() {
    return {
      activeChannel: this.fixedChannel || "A",
      textValue: null,
    }
  },

  methods: {
    getLightingInactiveOptions,
    isDeviceMini,

    getButtonOptions() {
      return [
        {id: "A", label: this.$t('message.faders.A')},
        {id: "B", label: this.$t('message.faders.B')},
        {id: "C", label: this.$t('message.faders.C')},
        {id: "D", label: this.$t('message.faders.D')}
      ];
    },

    getNodes: function () {
      return [this.activeChannel];
    },

    /* Channel Selection */
    selectedChannel: function () {
      return this.activeChannel;
    },

    onChannelSelectionChange: function (id) {
      this.activeChannel = id;

      if (!isDeviceMini()) {
        this.textValue = this.getBottomText();
      }

    },

    /***************************/

    /* Fader Colour Common */
    onFaderColourChange(top, bottom) {
      websocket.send_command(store.getActiveSerial(), {"SetFaderColours": [this.activeChannel, top, bottom]});
    },

    /* Fader Top Colour */
    getFaderTopColour() {
      return "#" + store.getActiveDevice().lighting.faders[this.activeChannel].colours.colour_one;
    },

    onFaderTopColourChange(value) {
      let top = value.substr(1, 6);
      let bottom = store.getActiveDevice().lighting.faders[this.activeChannel].colours.colour_two;

      this.onFaderColourChange(top, bottom);
    },

    /* Fader Bottom Colour */
    getFaderBottomColour() {
      return "#" + store.getActiveDevice().lighting.faders[this.activeChannel].colours.colour_two;
    },

    onFaderBottomColourChange(value) {
      let top = store.getActiveDevice().lighting.faders[this.activeChannel].colours.colour_one;
      let bottom = value.substr(1, 6);

      this.onFaderColourChange(top, bottom);
    },

    // Style..
    styleContains(match) {
      return store.getActiveDevice().lighting.faders[this.activeChannel].style.includes(match);
    },

    getStyleOptions() {
      return [
        {
          id: 'StyleGradient',
          label: this.$t('message.lighting.mixer.fader.styles.gradient'),
          selected: this.styleContains('Gradient')
        },
        {
          id: 'StyleMeter',
          label: this.$t('message.lighting.mixer.fader.styles.meter'),
          selected: this.styleContains('Meter')
        },
      ];
    },

    onStyleSelectionChanged(id, value) {
      let gradient = this.styleContains('Gradient');
      let meter = this.styleContains('Meter');

      if (id === 'StyleGradient') {
        gradient = value;
      }

      if (id === 'StyleMeter') {
        meter = value;
      }

      this.setStyle(gradient, meter);
    },

    setStyle(gradient, meter) {
      let type = this.getDisplayStyle(gradient, meter);
      websocket.send_command(store.getActiveSerial(), {"SetFaderDisplayStyle": [this.activeChannel, type]});
    },

    getDisplayStyle(gradient, meter) {
      let type = "TwoColour";
      // Go through the possible options..
      if (gradient && meter) {
        type = "GradientMeter";
      } else if (gradient && !meter) {
        type = "Gradient"
      } else if (!gradient && meter) {
        type = "Meter"
      }
      return type;
    },

    applyFaderToAll() {
      // Pull the settings, and apply to all..
      // SetAllFaderDisplayStyle(FaderDisplayStyle)
      // SetAllFaderColours(String, String),
      let gradient = this.styleContains('Gradient');
      let meter = this.styleContains('Meter');
      let type = this.getDisplayStyle(gradient, meter);
      websocket.send_command(store.getActiveSerial(), {"SetAllFaderDisplayStyle": type});

      let colour_one = store.getActiveDevice().lighting.faders[this.activeChannel].colours.colour_one;
      let colour_two = store.getActiveDevice().lighting.faders[this.activeChannel].colours.colour_two;
      websocket.send_command(store.getActiveSerial(), {"SetAllFaderColours": [colour_one, colour_two]});
    },

    /***************************/

    /* Screen Colour */
    getScreenColour() {
      return "#" + store.getActiveDevice().lighting.simple[ScribbleNames[this.activeChannel]].colour_one;
    },

    onScreenColourChange(value) {
      value = value.substr(1, 6);
      websocket.send_command(store.getActiveSerial(), {"SetSimpleColour": [ScribbleNames[this.activeChannel], value]});
    },

    /* Icons */
    openIcons() {
      websocket.open_path("Icons");
    },

    getIconOptions() {
      let options = [
        {
          id: null,
          label: this.$t('message.lighting.mixer.screen.iconNone')
        }
      ];

      store.getIconFiles().sort(Intl.Collator().compare).forEach(item => {
        options.push({
          id: item,
          label: item
        });
      });

      return options;
    },

    getSelectedIcon() {
      return store.getActiveDevice().fader_status[this.activeChannel].scribble.file_name;
    },

    onIconSelectionChange(value) {
      websocket.send_command(store.getActiveSerial(), {"SetScribbleIcon": [this.activeChannel, value]})
    },

    /* Display Options */
    getDisplayOptions() {
      return [
        {
          id: 'lighting-mixer-screen-show-number',
          label: this.$t('message.lighting.mixer.screen.options.showNumber'),
          selected: this.isScreenNumberShow()
        },
        {
          id: 'lighting-mixer-screen-invert-display',
          label: this.$t('message.lighting.mixer.screen.options.invertDisplay'),
          selected: this.isScreenInverted()
        },
      ];
    },

    onDisplayOptionsChanged(id, value) {
      if (id === 'lighting-mixer-screen-show-number') {
        this.setScreenNumberShow(value);
      } else if (id === 'lighting-mixer-screen-invert-display') {
        this.setScreenInverted(value);
      }
    },

    isScreenInverted() {
      return store.getActiveDevice().fader_status[this.activeChannel].scribble.inverted;
    },

    isScreenNumberShow() {
      return store.getActiveDevice().fader_status[this.activeChannel].scribble.left_text !== null;
    },

    setScreenInverted(inverted) {
      websocket.send_command(store.getActiveSerial(), {"SetScribbleInvert": [this.activeChannel, inverted]});
    },

    setScreenNumberShow(show) {
      let channel = Object.keys(store.getActiveDevice().fader_status).indexOf(this.activeChannel) + 1;
      let value = show ? channel.toString() : "";
      websocket.send_command(store.getActiveSerial(), {"SetScribbleNumber": [this.activeChannel, value]})
    },

    /* Text Field */
    getBottomText() {
      let text = store.getActiveDevice().fader_status[this.activeChannel].scribble.bottom_text;
      return (text == null) ? "" : text;
    },

    updateText(event) {
      store.getActiveDevice().fader_status[this.activeChannel].scribble.bottom_text = event.target.value;
    },

    applyUpdate(event) {
      let value = event.target.value;
      websocket.send_command(store.getActiveSerial(), {"SetScribbleText": [this.activeChannel, value]})
    },


    /***************************/
    getMuteActiveColour() {
      return "#" + store.getActiveDevice().lighting.buttons[MuteButtonNamesForFader[this.activeChannel]].colours.colour_one;
    },

    getMuteInactiveColour() {
      return "#" + store.getActiveDevice().lighting.buttons[MuteButtonNamesForFader[this.activeChannel]].colours.colour_two;
    },

    onMuteActiveColourChanged(value) {
      let active = value.substr(1, 6);
      let inactive = store.getActiveDevice().lighting.buttons[MuteButtonNamesForFader[this.activeChannel]].colours.colour_two;

      this.setMuteColourValues(active, inactive);
    },

    onMuteInactiveColourChanged(value) {
      let active = store.getActiveDevice().lighting.buttons[MuteButtonNamesForFader[this.activeChannel]].colours.colour_one;
      let inactive = value.substr(1, 6);

      this.setMuteColourValues(active, inactive);
    },

    setMuteColourValues(active, inactive) {
      websocket.send_command(store.getActiveSerial(), {"SetButtonColours": [MuteButtonNamesForFader[this.activeChannel], active, inactive]});
    },

    selectedMuteInactiveOption() {
      return store.getActiveDevice().lighting.buttons[MuteButtonNamesForFader[this.activeChannel]].off_style;
    },

    onMuteInactiveSelectionChange(id) {
      websocket.send_command(store.getActiveSerial(), {"SetButtonOffStyle": [MuteButtonNamesForFader[this.activeChannel], id]});
    },

    applyMuteToAll() {
      let colour_one = store.getActiveDevice().lighting.buttons[MuteButtonNamesForFader[this.activeChannel]].colours.colour_one;
      let colour_two = store.getActiveDevice().lighting.buttons[MuteButtonNamesForFader[this.activeChannel]].colours.colour_two;
      websocket.send_command(store.getActiveSerial(), {"SetButtonGroupColours": ["FaderMute", colour_one, colour_two]});

      let off_style = store.getActiveDevice().lighting.buttons[MuteButtonNamesForFader[this.activeChannel]].off_style;
      websocket.send_command(store.getActiveSerial(), {"SetButtonGroupOffStyle": ["FaderMute", off_style]});
    },

    getSelectedChannelName() {
      //get the current selected channel name to be used in aria-labels
      return this.getButtonOptions().find(option => option.id === this.activeChannel).label;
    },
  },

  mounted() {
    if (!this.isDeviceMini()) {
      this.textValue = this.getBottomText();
    }
  }
}
