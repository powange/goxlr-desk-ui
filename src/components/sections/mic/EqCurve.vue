<template>
  <div class="eq-curve">
    <svg ref="svg" :viewBox="`0 0 ${width} ${height}`" class="curve"
         @pointermove="onPointerMove" @pointerup="onPointerUp" @pointercancel="onPointerUp">
      <line v-for="gain in [-6, 0, 6]" :key="'g' + gain" x1="0" :x2="width" :y1="gainToY(gain)" :y2="gainToY(gain)"
            :class="gain === 0 ? 'axis' : 'grid'"/>
      <line v-for="tick in ticks" :key="'t' + tick" :x1="freqToX(tick)" :x2="freqToX(tick)" y1="0" :y2="height" class="grid"/>
      <text v-for="gain in [6, 0, -6]" :key="'l' + gain" x="4" :y="gainToY(gain) - 4" class="gain-label">{{ gain > 0 ? '+' + gain : gain }} dB</text>
      <path :d="areaPath()" class="area"/>
      <path :d="linePath()" class="line"/>
      <g v-for="(band, index) in bands()" :key="band">
        <circle :cx="bandX(index)" :cy="gainToY(gainOf(band))" r="7"
                class="point" :class="{ active: activeIndex === index, wide: fineTune }" tabindex="0" role="slider"
                :aria-label="$t('message.microphone.chain.bandLabel', {freq: freqLabel(freqOf(band))})"
                aria-valuemin="-9" aria-valuemax="9" :aria-valuenow="gainOf(band)"
                :aria-valuetext="`${gainOf(band)} dB, ${freqLabel(freqOf(band))}`"
                @pointerdown="onPointerDown($event, index)" @keydown="onKeydown($event, index)"
                @pointerenter="hoverIndex = index" @pointerleave="hoverIndex = undefined"
                @focus="hoverIndex = index" @blur="hoverIndex = undefined"/>
        <text v-if="activeIndex === index" :x="bandX(index)" :y="gainToY(gainOf(band)) - 14" class="value-label">
          {{ gainText(gainOf(band)) }} · {{ freqLabel(freqOf(band)) }}
        </text>
      </g>
    </svg>
    <div class="ticks">
      <span v-for="tick in ticks" :key="tick" :style="{ left: freqToX(tick) / width * 100 + '%' }">{{ freqLabel(tick) }}</span>
    </div>
  </div>
</template>

<script>
import {store} from "@/store";
import {websocket} from "@/util/sockets";
import {isDeviceMini, roundToStep} from "@/util/util";
import {EqFreqs, EqMiniFreqs} from "@/util/mixerMapping";
import Equalizer from "@/components/sections/mic/Equalizer.vue";

// The frequency ranges, steps, reset and fine tune setting are the equaliser's own (1-based band
// index), so the curve follows the same rules as the official sliders did.
const shared = ["getMinEqValue", "getMaxEqValue", "getStep", "fineTuneEnabled", "resetEqValues", "sendFreqCommand"];

const MIN_FREQ = 20;
// While dragging, at most one command per band setting is sent in this time.
const SEND_INTERVAL = 50;
const MAX_FREQ = 20000;

// The equaliser as a curve on a frequency axis: each band is a point dragged up and down for its
// gain (-9 to +9 dB), and sideways for its frequency when fine tuning is on. Arrow keys do the same.
export default {
  name: "EqCurve",

  data() {
    return {
      width: 800,
      height: 170,
      dragIndex: undefined,
      hoverIndex: undefined,
      ticks: [50, 100, 200, 500, 1000, 2000, 5000, 10000],
    }
  },

  computed: {
    fineTune() {
      return this.fineTuneEnabled();
    },
    activeIndex() {
      return this.dragIndex !== undefined ? this.dragIndex : this.hoverIndex;
    },
  },

  // The drawing follows the element's width, so the points stay round.
  mounted() {
    this.observer = new ResizeObserver(() => {
      this.width = Math.max(200, this.$refs.svg.clientWidth);
    });
    this.observer.observe(this.$refs.svg);
  },

  created() {
    this.pending = {};
    this.sendTimer = undefined;
  },

  unmounted() {
    this.observer.disconnect();
    this.endDrag();
  },

  methods: {
    ...Object.fromEntries(shared.map(name => [name, Equalizer.methods[name]])),

    // Called by the panel's Reset button
    reset() {
      this.resetEqValues();
    },

    bands() {
      return isDeviceMini() ? EqMiniFreqs : EqFreqs;
    },

    equaliser() {
      const mic = store.getActiveDevice().mic_status;
      return isDeviceMini() ? mic.equaliser_mini : mic.equaliser;
    },

    gainOf(band) {
      return this.equaliser().gain[band];
    },

    freqOf(band) {
      return parseFloat(this.equaliser().frequency[band]);
    },

    gainText(gain) {
      return (gain > 0 ? "+" : "") + gain + " dB";
    },

    freqLabel(hz) {
      return hz >= 1000 ? `${Math.round(hz / 100) / 10} kHz` : `${Math.round(hz)} Hz`;
    },

    freqToX(hz) {
      const pad = 10;
      const ratio = (Math.log10(hz) - Math.log10(MIN_FREQ)) / (Math.log10(MAX_FREQ) - Math.log10(MIN_FREQ));
      return pad + ratio * (this.width - pad * 2);
    },

    xToFreq(x) {
      const pad = 10;
      const ratio = (x - pad) / (this.width - pad * 2);
      return Math.pow(10, Math.log10(MIN_FREQ) + ratio * (Math.log10(MAX_FREQ) - Math.log10(MIN_FREQ)));
    },

    bandX(index) {
      return this.freqToX(this.freqOf(this.bands()[index]));
    },

    gainToY(gain) {
      const pad = 22;
      return pad + (9 - gain) / 18 * (this.height - pad * 2);
    },

    yToGain(y) {
      const pad = 22;
      const gain = 9 - (y - pad) / (this.height - pad * 2) * 18;
      return Math.max(-9, Math.min(9, Math.round(gain)));
    },

    points() {
      return this.bands().map((band, index) => [this.bandX(index), this.gainToY(this.gainOf(band))]);
    },

    // A smooth line through the points (Catmull-Rom as cubic Béziers), flat to both edges.
    linePath() {
      const p = this.points();
      const all = [[0, p[0][1]], ...p, [this.width, p[p.length - 1][1]]];
      let d = `M ${all[0][0]} ${all[0][1]}`;
      for (let i = 0; i < all.length - 1; i++) {
        const p0 = all[Math.max(0, i - 1)], p1 = all[i], p2 = all[i + 1], p3 = all[Math.min(all.length - 1, i + 2)];
        const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
        const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
        d += ` C ${c1[0]} ${c1[1]}, ${c2[0]} ${c2[1]}, ${p2[0]} ${p2[1]}`;
      }
      return d;
    },

    areaPath() {
      return `${this.linePath()} L ${this.width} ${this.height} L 0 ${this.height} Z`;
    },

    setGain(index, gain) {
      const band = this.bands()[index];
      if (this.gainOf(band) === gain) return;

      // Update locally straight away, the daemon's patch confirms it.
      this.equaliser().gain[band] = gain;
      this.queue(isDeviceMini() ? "SetEqMiniGain" : "SetEqGain", band, gain);
    },

    // Sends now, or, while dragging, keeps only the latest value for the next send.
    queue(commandName, band, value) {
      this.pending[`${commandName}:${band}`] = [commandName, band, value];
      if (this.dragIndex === undefined) {
        this.flush();
      } else if (this.sendTimer === undefined) {
        this.flush();
        this.sendTimer = setTimeout(() => {
          this.sendTimer = undefined;
          this.flush();
        }, SEND_INTERVAL);
      }
    },

    flush() {
      const serial = store.getActiveSerial();
      for (const [commandName, band, value] of Object.values(this.pending)) {
        if (commandName.endsWith("Freq")) {
          this.sendFreqCommand(commandName, band, value);
        } else {
          websocket.send_command(serial, {[commandName]: [band, value]});
        }
      }
      this.pending = {};
    },

    // The band's gain and frequency paths, whose patches are ignored while it's dragged so
    // replies to earlier commands don't pull the point back.
    patchPaths(index) {
      const base = `/mixers/${store.getActiveSerial()}/mic_status/${isDeviceMini() ? "equaliser_mini" : "equaliser"}`;
      const band = this.bands()[index];
      return `${base}/gain/${band};${base}/frequency/${band}`;
    },

    endDrag() {
      if (this.dragIndex === undefined) return;
      clearTimeout(this.sendTimer);
      this.sendTimer = undefined;
      store.resumePatchPath(this.patchPaths(this.dragIndex));
      this.dragIndex = undefined;
      this.flush();
    },

    // Keeps the frequency inside the band's range (which depends on its neighbours) and on its step.
    setFreq(index, hz) {
      const band = this.bands()[index];
      const min = this.getMinEqValue(index + 1);
      const max = this.getMaxEqValue(index + 1);
      const value = roundToStep(Math.max(min, Math.min(max, hz)), this.getStep(index + 1));
      if (value === this.freqOf(band)) return;
      if (this.dragIndex !== undefined) this.equaliser().frequency[band] = value;
      this.queue(isDeviceMini() ? "SetEqMiniFreq" : "SetEqFreq", band, value);
    },

    onPointerDown(event, index) {
      this.endDrag();
      this.dragIndex = index;
      store.pausePatchPath(this.patchPaths(index));
      this.$refs.svg.setPointerCapture(event.pointerId);
      event.preventDefault();
    },

    onPointerMove(event) {
      if (this.dragIndex === undefined) return;
      const rect = this.$refs.svg.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width * this.width;
      const y = (event.clientY - rect.top) / rect.height * this.height;
      this.setGain(this.dragIndex, this.yToGain(y));
      if (this.fineTune) this.setFreq(this.dragIndex, this.xToFreq(x));
    },

    onPointerUp() {
      this.endDrag();
    },

    onKeydown(event, index) {
      const band = this.bands()[index];
      const gainStep = {ArrowUp: 1, ArrowDown: -1}[event.key];
      if (gainStep !== undefined) {
        event.preventDefault();
        this.setGain(index, Math.max(-9, Math.min(9, this.gainOf(band) + gainStep)));
        return;
      }
      const freqStep = {ArrowRight: 1.02, ArrowLeft: 1 / 1.02}[event.key];
      if (freqStep !== undefined && this.fineTune) {
        event.preventDefault();
        const hz = this.freqOf(band);
        const next = hz * freqStep;
        // Always move by at least one step, so small bands still move
        const step = this.getStep(index + 1);
        this.setFreq(index, Math.abs(next - hz) < step ? hz + Math.sign(next - hz) * step : next);
      }
    },
  }
}
</script>

<style scoped>
.eq-curve {
  display: grid;
  gap: 4px;
}

.curve {
  width: 100%;
  height: 170px;
  display: block;
  touch-action: none;
  overflow: visible;
}

.grid {
  stroke: var(--c-line);
  stroke-width: 1;
  stroke-dasharray: 3 5;
}

.axis {
  stroke: var(--c-line-strong);
  stroke-width: 1;
}

.gain-label {
  font-family: var(--f-mono);
  font-size: 10px;
  fill: var(--c-faint);
}

.area {
  fill: var(--c-accent);
  fill-opacity: .12;
  stroke: none;
}

.line {
  fill: none;
  stroke: var(--c-accent);
  stroke-width: 2.5;
}

.point {
  fill: var(--c-panel);
  stroke: var(--c-accent);
  stroke-width: 2;
  cursor: ns-resize;
}

.point.wide {
  cursor: move;
}

.point.active, .point:focus-visible {
  fill: var(--c-accent);
  outline: none;
}

.value-label {
  font-family: var(--f-mono);
  font-size: 11px;
  fill: var(--c-text);
  text-anchor: middle;
  pointer-events: none;
}

.ticks {
  position: relative;
  height: 14px;
  font-family: var(--f-mono);
  font-size: 10px;
  color: var(--c-muted);
}

.ticks span {
  position: absolute;
  transform: translateX(-50%);
  white-space: nowrap;
}
</style>
