<template>
  <div class="face">
    <!-- Selecting a knob or button shows its settings: plain buttons with aria-pressed, the power
         switches sit next to them -->
    <div class="knobs" role="group" :aria-label="$t('message.effects.face.label')">
      <button v-for="knob in getKnobs()" :key="knob.id" type="button" class="knob"
              :class="{ selected: selected === knob.id }" :aria-pressed="selected === knob.id"
              @click="$emit('select', knob.id)">
        <svg viewBox="0 0 70 70" aria-hidden="true">
          <path :d="arc(START, END)" class="track"/>
          <path v-if="knob.from !== knob.to" :d="arc(knob.from, knob.to)" class="value"/>
          <circle cx="35" cy="35" r="17" class="cap"/>
          <circle :cx="point(knob.to)[0]" :cy="point(knob.to)[1]" r="3" class="dot"/>
        </svg>
        <span class="knob-name">{{ knob.name }}</span>
        <span class="knob-detail">{{ knob.detail }}</span>
      </button>

      <span class="grow"></span>

      <div v-for="button in getButtons()" :key="button.id" class="fx-button"
           :class="{ on: button.enabled, selected: selected === button.id }">
        <button type="button" class="fx-name" :aria-pressed="selected === button.id"
                @click="$emit('select', button.id)">{{ button.name }}</button>
        <button type="button" role="switch" class="fx-power" :aria-checked="button.enabled"
                :aria-label="$t('message.effects.face.power', { effect: button.name })"
                @click="setEnabled(button.id, !button.enabled)">
          <span class="led" aria-hidden="true"></span>
          {{ button.enabled ? $t('message.effects.face.on') : $t('message.effects.face.off') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import {store} from "@/store";
import {websocket} from "@/util/sockets";
import PitchEffect from "@/components/sections/effects/PitchEffect.vue";
import GenderEffect from "@/components/sections/effects/GenderEffect.vue";

const START = -225;
const END = 45;
const ENABLE_COMMANDS = {megaphone: "SetMegaphoneEnabled", robot: "SetRobotEnabled", hard_tune: "SetHardTuneEnabled"};

// The effects area of the GoXLR: four encoders whose arc shows their amount, and the three effect
// buttons. Clicking one selects it (its settings show below); a button's LED strip switches it.
export default {
  name: "EffectsFace",
  emits: ["select"],

  props: {
    selected: {type: String, required: true},
  },

  data() {
    return {START, END};
  },

  methods: {
    // Pitch and gender ranges follow their style (and Hardtune), as in their own sections.
    ...Object.fromEntries(["getValueMap", "getAmountValue"].map(name => [name, PitchEffect.methods[name]])),
    getSliderValue: GenderEffect.methods.getSliderValue,

    effects() {
      return store.getActiveDevice().effects.current;
    },

    styleLabel(effect, style) {
      const key = String(style).charAt(0).toLowerCase() + String(style).slice(1);
      return this.$t(`message.effects.${effect}.styles.${key}`);
    },

    angle(fraction) {
      return START + (END - START) * Math.max(0, Math.min(1, fraction));
    },

    point(angle) {
      const radians = angle * Math.PI / 180;
      return [35 + 26 * Math.cos(radians), 35 + 26 * Math.sin(radians)];
    },

    arc(from, to) {
      const [a, b] = from <= to ? [from, to] : [to, from];
      const [x0, y0] = this.point(a);
      const [x1, y1] = this.point(b);
      return `M ${x0} ${y0} A 26 26 0 ${b - a > 180 ? 1 : 0} 1 ${x1} ${y1}`;
    },

    // An arc from the start (amounts) or from the middle (values around zero)
    unipolar(fraction) {
      return {from: START, to: this.angle(fraction)};
    },

    bipolar(fraction) {
      return {from: this.angle(0.5), to: this.angle(fraction)};
    },

    signed(value) {
      return (value > 0 ? "+" : "") + value;
    },

    getKnobs() {
      const fx = this.effects();
      const pitchMap = this.getValueMap();
      const pitchIndex = Math.round(this.getAmountValue());
      const pitch = pitchMap[pitchIndex] !== undefined ? pitchMap[pitchIndex] : 0;
      const genderMax = this.getSliderValue(false);

      return [
        {id: "reverb", name: this.$t('message.effects.reverb.title'), ...this.unipolar(fx.reverb.amount / 100),
          detail: `${this.styleLabel("reverb", fx.reverb.style)} · ${fx.reverb.amount} %`},
        {id: "echo", name: this.$t('message.effects.echo.title'), ...this.unipolar(fx.echo.amount / 100),
          detail: `${this.styleLabel("echo", fx.echo.style)} · ${fx.echo.amount} %`},
        {id: "pitch", name: this.$t('message.effects.pitch.title'), ...this.bipolar(pitchIndex / (pitchMap.length - 1)),
          detail: `${this.styleLabel("pitch", fx.pitch.style)} · ${this.signed(pitch)}`},
        {id: "gender", name: this.$t('message.effects.gender.title'), ...this.bipolar((fx.gender.amount + genderMax) / (genderMax * 2)),
          detail: `${this.styleLabel("gender", fx.gender.style)} · ${this.signed(fx.gender.amount)}`},
      ];
    },

    getButtons() {
      const fx = this.effects();
      return [
        {id: "megaphone", name: this.$t('message.effects.megaphone.title'), enabled: fx.megaphone.is_enabled},
        {id: "robot", name: this.$t('message.effects.robot.title'), enabled: fx.robot.is_enabled},
        {id: "hard_tune", name: this.$t('message.effects.hardTune.title'), enabled: fx.hard_tune.is_enabled},
      ];
    },

    setEnabled(id, enabled) {
      websocket.send_command(store.getActiveSerial(), {[ENABLE_COMMANDS[id]]: enabled});
    },
  }
}
</script>

<style scoped>
.face {
  padding: 14px 18px;
  background-color: var(--c-panel);
  border: 1px solid var(--c-line);
  border-radius: 8px;
}

.knobs {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 18px;
}

.grow {
  flex: 1;
}

.knob {
  display: grid;
  justify-items: center;
  gap: 3px;
  min-width: 96px;
  padding: 6px 4px;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: var(--c-text);
  cursor: pointer;
}

.knob:hover {
  background-color: var(--c-raised);
}

.knob svg {
  width: 70px;
  height: 70px;
}

.track, .value {
  fill: none;
  stroke-width: 5;
  stroke-linecap: round;
}

.track {
  stroke: var(--c-line);
}

.value {
  stroke: var(--c-accent);
}

.cap {
  fill: var(--c-raised);
  stroke: var(--c-line);
  stroke-width: 2;
}

.dot {
  fill: var(--c-text);
}

.knob.selected .cap {
  stroke: var(--c-accent);
}

.knob.selected .knob-name {
  color: var(--c-accent);
}

.knob-name {
  font-weight: 600;
  font-size: 12px;
}

.knob-detail {
  font-size: 11px;
  color: var(--c-muted);
}

.fx-button {
  display: grid;
  width: 112px;
  border: 2px solid var(--c-line);
  border-radius: 8px;
  overflow: hidden;
}

.fx-button.on {
  border-color: var(--c-ok);
  box-shadow: 0 0 10px color-mix(in srgb, var(--c-ok) 40%, transparent);
}

.fx-button.selected {
  outline: 2px solid var(--c-accent);
  outline-offset: 3px;
}

.fx-name, .fx-power {
  border: none;
  background: transparent;
  color: var(--c-text);
  cursor: pointer;
}

.fx-name {
  padding: 14px 6px 12px;
  font-weight: 600;
  font-size: 12px;
}

.fx-name:hover {
  background-color: var(--c-raised);
}

.fx-power {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 6px;
  border-top: 1px solid var(--c-line);
  background-color: var(--c-raised);
  color: var(--c-muted);
  font-size: 11px;
}

.fx-power:hover {
  background-color: var(--c-hover);
}

.fx-button.on .fx-power {
  color: var(--c-ok);
}

.led {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--c-line-strong);
}

.fx-button.on .led {
  background-color: var(--c-ok);
  box-shadow: 0 0 6px var(--c-ok);
}

.knob:focus-visible, .fx-name:focus-visible, .fx-power:focus-visible {
  outline: 2px solid var(--c-accent);
  outline-offset: -2px;
}
</style>
