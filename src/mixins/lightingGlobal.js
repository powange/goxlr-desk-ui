// Shared logic (data, methods) of the former LightingGlobal page, used by the components
// that replaced it. It has no template of its own.
import {store} from "@/store";
import {websocket} from "@/util/sockets";
import {isDeviceMini} from "@/util/util";

export default {

  data() {
    return {
      selected: 'Global',
      mod1Value: 0,
      mod2Value: 0,
      lock_updates: false,
    }
  },

  methods: {
    getNodes() {
      return [];
    },

    getAreaOptions() {
      return [
        {
          id: 'Global',
          label: this.$t('message.lighting.global.areas.areas.global'),
        },
        {
          id: 'Accent',
          label: this.$t('message.lighting.global.areas.areas.accent')
        }
      ];
    },

    getAnimationOptions() {
      let animations = [
        {
          id: 'None',
          label: this.$t("message.lighting.global.animations.modes.none"),
        },
        {
          id: 'RetroRainbow',
          label: this.$t("message.lighting.global.animations.modes.rainbowRetro")
        },
        {
          id: 'RainbowBright',
          label: this.$t("message.lighting.global.animations.modes.rainbowBright")
        },
        {
          id: 'RainbowDark',
          label: this.$t("message.lighting.global.animations.modes.rainbowDark")
        },
        {
          id: 'Simple',
          label: this.$t("message.lighting.global.animations.modes.simple")
        },
      ];

      // Apparently Ripple isn't supported on the mini..
      if (!isDeviceMini()) {
        animations.push({
          id: 'Ripple',
          label: this.$t("message.lighting.global.animations.modes.ripple")
        });
      }
      return animations;
    },

    color() {
      return "#" + store.getActiveDevice().lighting.simple[this.selected].colour_one;
    },

    onSelectionChange(option) {
      this.selected = option
    },

    onColourChange(value) {
      if (this.selected === "Accent") {
        websocket.send_command(store.getActiveSerial(), {"SetSimpleColour": [this.selected, value.substr(1, 6)]});
      } else {
        websocket.send_command(store.getActiveSerial(), {"SetGlobalColour": value.substr(1, 6)});
      }
    },

    animationSupported() {
      return store.getActiveDevice().lighting.animation.supported;
    },

    animationModeSelected() {
      return store.getActiveDevice().lighting.animation.mode;
    },

    onAnimationModeChange(id) {
      websocket.send_command(store.getActiveSerial(), {"SetAnimationMode": id});
    },

    // Range Helpers
    getRangeColour(enabled) {
      if (enabled) {
        return "var(--c-accent-light)";
      }
      return "var(--c-accent-muted)";
    },

    // Mod1 Settings..
    isMod1Enabled() {
      return this.animationModeSelected() !== "None";
    },

    getMod1StorePath() {
      return "/mixers/" + store.getActiveSerial() + "/lighting/animation/mod1"
    },

    getMod1Value() {
      return store.getActiveDevice().lighting.animation.mod1;
    },

    setMod1Value(value) {
      value = parseInt(value);
      this.mod1Value = value;
      if (this.lock_updates) {
        return;
      }

      this.lock_updates = true;
      store.getActiveDevice().lighting.animation.mod1 = value;
      websocket.send_command(store.getActiveSerial(), {"SetAnimationMod1": value}).then(() => {
        this.lock_updates = false;
      });
    },

    // Mod2 Settings..
    isMod2Enabled() {
      let mode = this.animationModeSelected();
      return mode === "RainbowBright" || mode === "RainbowDark";
    },

    getMod2StorePath() {
      return "/mixers/" + store.getActiveSerial() + "/lighting/animation/mod2"
    },

    getMod2Value() {
      return store.getActiveDevice().lighting.animation.mod2;
    },

    setMod2Value(value) {
      value = parseInt(value);
      this.mod2Value = value;

      if (this.lock_updates) {
        return;
      }

      this.lock_updates = true;
      store.getActiveDevice().lighting.animation.mod2 = value;
      websocket.send_command(store.getActiveSerial(), {"SetAnimationMod2": value}).then(() => {
        this.lock_updates = false;
      });
    },

    mouseUp(id) {
      if (id === "mod1") {
        // Force an update with this value..
        store.getActiveDevice().lighting.animation.mod1 = this.mod1Value;
        websocket.send_command(store.getActiveSerial(), {"SetAnimationMod1": this.mod1Value});
        return;
      }

      store.getActiveDevice().lighting.animation.mod2 = this.mod2Value;
      websocket.send_command(store.getActiveSerial(), {"SetAnimationMod2": this.mod2Value});
    },

    // Waterfall Settings..
    isWaterfallEnabled() {
      let mode = this.animationModeSelected();
      return mode !== "None" && mode !== "RetroRainbow";
    },

    isWaterFallActive(type) {
      return store.getActiveDevice().lighting.animation.waterfall_direction === type;
    },

    setWaterfall(mode) {
      if (!this.isWaterfallEnabled()) {
        return;
      }
      websocket.send_command(store.getActiveSerial(), {"SetAnimationWaterfall": mode});
    }

  },
  mounted() {
    this.mod1Value = store.getActiveDevice().lighting.animation.mod1;
    this.mod2Value = store.getActiveDevice().lighting.animation.mod2;
  }
}
