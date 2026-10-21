<script>
import WidgetContainer from "@/components/containers/WidgetContainer.vue";

const WHEEL = 180;

function hsvToRgb(h, s, v) {
  const f = n => {
    const k = (n + h / 60) % 6;
    return v - v * s * Math.max(0, Math.min(k, 4 - k, 1));
  };
  return [f(5), f(3), f(1)].map(c => Math.round(c * 255));
}

function rgbToHsv(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min;
  let h = 0;
  if (d !== 0) {
    if (max === r) h = 60 * (((g - b) / d) % 6);
    else if (max === g) h = 60 * ((b - r) / d + 2);
    else h = 60 * ((r - g) / d + 4);
  }
  return [(h + 360) % 360, max === 0 ? 0 : d / max, max];
}

const toHex = rgb => "#" + rgb.map(c => c.toString(16).padStart(2, "0")).join("").toUpperCase();

// A colour field: a swatch, the hex value (editable) and a clear button. The swatch opens a small
// popup with a hue / saturation wheel and a brightness slider. The colour is sent when the pointer
// is released, not on every move, so the device isn't flooded with commands.
export default {
  name: "ColourPicker",
  emits: ["colour-changed"],
  components: {
    WidgetContainer
  },

  props: {
    title: String,
    colorValue: String,
  },

  data() {
    return {
      hexString: "#000000",
      open: false,
      popupStyle: {},
      hue: 0,
      saturation: 0,
      brightness: 1,
      dragging: false,
      size: WHEEL,
    }
  },

  computed: {
    previewHex() {
      return this.open ? toHex(hsvToRgb(this.hue, this.saturation, this.brightness)) : this.hexString;
    },

    markerStyle() {
      const r = WHEEL / 2;
      const angle = this.hue * Math.PI / 180;
      return {
        left: r + Math.cos(angle) * this.saturation * r + "px",
        top: r + Math.sin(angle) * this.saturation * r + "px",
        backgroundColor: this.previewHex,
      };
    },

    brightnessTrack() {
      const full = toHex(hsvToRgb(this.hue, this.saturation, 1));
      return {background: `linear-gradient(to right, #000000, ${full})`};
    },
  },

  methods: {
    updateText(value) {
      this.hexString = value.toUpperCase();
      this.$emit('colour-changed', this.hexString);
    },

    updateColour(event) {
      const value = event.target.value.trim();
      const full = value.startsWith("#") ? value : "#" + value;
      if (/^#[0-9a-fA-F]{6}$/.test(full) && full.toUpperCase() !== this.hexString.toUpperCase()) {
        this.updateText(full);
      }
    },

    clearColour() {
      this.updateText("#000000");
    },

    togglePopup() {
      if (this.open) {
        this.closePopup();
        return;
      }
      const [r, g, b] = [1, 3, 5].map(i => parseInt(this.hexString.slice(i, i + 2), 16) || 0);
      [this.hue, this.saturation, this.brightness] = rgbToHsv(r, g, b);
      if (this.brightness === 0) this.brightness = 1;

      // Fixed position next to the swatch, flipped up when it would leave the window
      const rect = this.$refs.swatch.getBoundingClientRect();
      const height = 270, width = 230;
      const top = rect.bottom + height + 8 > window.innerHeight ? rect.top - height - 6 : rect.bottom + 6;
      const left = Math.min(rect.left, window.innerWidth - width - 8);
      this.popupStyle = {top: Math.max(8, top) + "px", left: Math.max(8, left) + "px"};
      this.open = true;
      this.$nextTick(() => {
        this.drawWheel();
        this.$refs.wheel.focus();
      });
    },

    closePopup() {
      this.open = false;
    },

    onOutside(event) {
      if (this.open && !this.$el.contains(event.target)) this.closePopup();
    },

    drawWheel() {
      const canvas = this.$refs.canvas;
      if (!canvas) return;
      const context = canvas.getContext("2d");
      const image = context.createImageData(WHEEL, WHEEL);
      const r = WHEEL / 2;
      for (let y = 0; y < WHEEL; y++) {
        for (let x = 0; x < WHEEL; x++) {
          const dx = x - r + 0.5, dy = y - r + 0.5;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const offset = (y * WHEEL + x) * 4;
          if (distance > r) continue;
          const hue = (Math.atan2(dy, dx) * 180 / Math.PI + 360) % 360;
          const [cr, cg, cb] = hsvToRgb(hue, distance / r, this.brightness);
          image.data[offset] = cr;
          image.data[offset + 1] = cg;
          image.data[offset + 2] = cb;
          image.data[offset + 3] = 255;
        }
      }
      context.putImageData(image, 0, 0);
    },

    pickAt(event) {
      const rect = this.$refs.canvas.getBoundingClientRect();
      const r = rect.width / 2;
      const dx = event.clientX - rect.left - r, dy = event.clientY - rect.top - r;
      this.hue = (Math.atan2(dy, dx) * 180 / Math.PI + 360) % 360;
      this.saturation = Math.min(1, Math.sqrt(dx * dx + dy * dy) / r);
    },

    onPointerDown(event) {
      this.dragging = true;
      this.$refs.canvas.setPointerCapture(event.pointerId);
      this.pickAt(event);
    },

    onPointerMove(event) {
      if (this.dragging) this.pickAt(event);
    },

    onPointerUp() {
      if (!this.dragging) return;
      this.dragging = false;
      this.updateText(this.previewHex);
    },

    onBrightness(event, commit) {
      this.brightness = event.target.value / 100;
      this.drawWheel();
      if (commit) this.updateText(this.previewHex);
    },

    // Arrow keys move around the wheel (hue left / right, saturation up / down)
    onWheelKey(event) {
      if (event.key === "Escape") {
        this.closePopup();
        this.$refs.swatch.focus();
        return;
      }
      const moves = {ArrowLeft: [-5, 0], ArrowRight: [5, 0], ArrowUp: [0, 0.05], ArrowDown: [0, -0.05]};
      const move = moves[event.key];
      if (!move) return;
      event.preventDefault();
      this.hue = (this.hue + move[0] + 360) % 360;
      this.saturation = Math.max(0, Math.min(1, this.saturation + move[1]));
      this.updateText(this.previewHex);
    },
  },

  mounted() {
    this.hexString = this.colorValue;
    document.addEventListener("pointerdown", this.onOutside);
  },

  unmounted() {
    document.removeEventListener("pointerdown", this.onOutside);
  },

  watch: {
    colorValue: function () {
      this.hexString = this.colorValue;
    }
  }
}
</script>

<template>
  <WidgetContainer :title="title" height="auto">
    <slot>
      <div class="controls">
        <button ref="swatch" type="button" class="swatch" :style="{ backgroundColor: previewHex }"
                :aria-label="`${title}, ${$t('message.lighting.common.pickColour')}`" :aria-expanded="open"
                @click="togglePopup"></button>
        <input type="text" :value="hexString" @keyup.enter="updateColour" @change="updateColour" :aria-label="title"
               maxlength="7" spellcheck="false"/>
        <button type="button" class="clear" @click="clearColour" :aria-label="`${$t('message.common.clear')} ${title}`">
          <font-awesome-icon :title="$t('message.common.clear')" icon="fa-solid fa-xmark"/>
        </button>
      </div>

      <div v-if="open" class="popup" :style="popupStyle" role="dialog" :aria-label="title" @keydown.esc="closePopup">
        <div class="wheel" ref="wheel" tabindex="0" role="slider" :aria-label="$t('message.lighting.common.pickColour')"
             :aria-valuetext="previewHex" @keydown="onWheelKey">
          <canvas ref="canvas" :width="size" :height="size"
                  @pointerdown="onPointerDown" @pointermove="onPointerMove" @pointerup="onPointerUp"
                  @pointercancel="onPointerUp"></canvas>
          <span class="marker" :style="markerStyle"></span>
        </div>
        <input type="range" min="0" max="100" class="brightness" :style="brightnessTrack"
               :value="Math.round(brightness * 100)" :aria-label="$t('message.lighting.common.brightness')"
               @input="onBrightness($event, false)" @change="onBrightness($event, true)"/>
        <div class="popup-foot">
          <span class="popup-swatch" :style="{ backgroundColor: previewHex }"></span>
          <span class="popup-hex">{{ previewHex }}</span>
        </div>
      </div>
    </slot>
  </WidgetContainer>
</template>

<style scoped>
.controls {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  box-sizing: border-box;
  padding: 4px 10px 12px;
}

.swatch {
  width: 30px;
  height: 30px;
  flex: none;
  border: 2px solid var(--c-line-strong);
  border-radius: 6px;
  cursor: pointer;
}

.swatch:hover, .swatch[aria-expanded="true"] {
  border-color: var(--c-accent);
}

input[type=text] {
  width: 6.5em;
  min-width: 0;
  flex: 1;
  padding: 6px 8px;
  border: 1px solid var(--c-line);
  border-radius: 6px;
  background-color: var(--c-panel);
  color: var(--c-text);
  font-family: var(--f-mono);
  font-size: 12px;
  text-transform: uppercase;
}

.clear {
  padding: 6px;
  border: none;
  background: transparent;
  color: var(--c-muted);
  cursor: pointer;
}

.clear:hover {
  color: var(--c-text);
}

.swatch:focus-visible, .clear:focus-visible, input[type=text]:focus, .wheel:focus-visible {
  outline: 2px solid var(--c-accent);
  outline-offset: 1px;
}

.popup {
  position: fixed;
  z-index: 10000;
  display: grid;
  gap: 10px;
  width: 204px;
  padding: 12px;
  background-color: var(--c-panel);
  border: 1px solid var(--c-line-strong);
  border-radius: 10px;
  box-shadow: 0 8px 24px var(--c-shadow);
}

.wheel {
  position: relative;
  width: 180px;
  height: 180px;
  margin: 0 auto;
  border-radius: 50%;
}

.wheel canvas {
  display: block;
  width: 180px;
  height: 180px;
  border-radius: 50%;
  cursor: crosshair;
  touch-action: none;
}

.marker {
  position: absolute;
  width: 14px;
  height: 14px;
  margin: -9px 0 0 -9px;
  border: 2px solid #ffffff;
  border-radius: 50%;
  box-shadow: 0 0 0 1px #000000;
  pointer-events: none;
}

.brightness {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 10px;
  border-radius: 5px;
  outline: none;
}

.brightness::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #ffffff;
  border: 2px solid var(--c-panel);
  box-shadow: 0 0 0 1px var(--c-line-strong);
}

.brightness::-moz-range-thumb {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #ffffff;
  border: 2px solid var(--c-panel);
}

.popup-foot {
  display: flex;
  align-items: center;
  gap: 8px;
}

.popup-swatch {
  width: 18px;
  height: 18px;
  border-radius: 4px;
  border: 1px solid var(--c-line-strong);
}

.popup-hex {
  font-family: var(--f-mono);
  font-size: 12px;
  color: var(--c-text);
}
</style>
