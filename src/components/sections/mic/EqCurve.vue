<template>
  <div class="eq-curve">
    <svg ref="svg" :viewBox="`0 0 ${width} ${height}`" class="curve"
         @pointermove="onPointerMove" @pointerup="onPointerUp" @pointercancel="onPointerUp">
      <line v-for="gain in [-6, 0, 6]" :key="'g' + gain" x1="0" :x2="width" :y1="gainToY(gain)" :y2="gainToY(gain)"
            :class="gain === 0 ? 'axis' : 'grid'"/>
      <path :d="areaPath()" class="area"/>
      <path :d="linePath()" class="line"/>
      <circle v-for="(band, index) in bands()" :key="band" :cx="bandX(index)" :cy="gainToY(gainOf(band))" r="7"
              class="point" :class="{ dragging: dragIndex === index }" tabindex="0" role="slider"
              :aria-label="bandLabel(index)" aria-valuemin="-9" aria-valuemax="9" :aria-valuenow="gainOf(band)"
              @pointerdown="onPointerDown($event, index)" @keydown="onKeydown($event, index)"/>
    </svg>
    <div class="labels">
      <span v-for="(band, index) in bands()" :key="band">{{ bandLabel(index) }}</span>
    </div>
  </div>
</template>

<script>
import {store} from "@/store";
import {websocket} from "@/util/sockets";
import {isDeviceMini} from "@/util/util";
import {EqFreqs, EqMiniFreqs} from "@/util/mixerMapping";

// The equaliser as a curve: each band is a point that can be dragged up and down (or moved with
// the arrow keys), from -9 to +9 dB, like the band sliders.
export default {
  name: "EqCurve",

  data() {
    return {
      width: 800,
      height: 150,
      dragIndex: undefined,
      sending: false,
    }
  },

  // The drawing follows the element's width, so the points stay round.
  mounted() {
    this.observer = new ResizeObserver(() => {
      this.width = Math.max(200, this.$refs.svg.clientWidth);
    });
    this.observer.observe(this.$refs.svg);
  },

  unmounted() {
    this.observer.disconnect();
  },

  methods: {
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

    bandLabel(index) {
      const hz = this.equaliser().frequency[this.bands()[index]];
      return hz >= 1000 ? `${Math.round(hz / 100) / 10} kHz` : `${Math.round(hz)} Hz`;
    },

    bandX(index) {
      const step = this.width / this.bands().length;
      return step * index + step / 2;
    },

    gainToY(gain) {
      const pad = 12;
      return pad + (9 - gain) / 18 * (this.height - pad * 2);
    },

    yToGain(y) {
      const pad = 12;
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
      const command = isDeviceMini() ? {SetEqMiniGain: [band, gain]} : {SetEqGain: [band, gain]};
      websocket.send_command(store.getActiveSerial(), command);
    },

    onPointerDown(event, index) {
      this.dragIndex = index;
      this.$refs.svg.setPointerCapture(event.pointerId);
      event.preventDefault();
    },

    onPointerMove(event) {
      if (this.dragIndex === undefined) return;
      const rect = this.$refs.svg.getBoundingClientRect();
      const y = (event.clientY - rect.top) / rect.height * this.height;
      this.setGain(this.dragIndex, this.yToGain(y));
    },

    onPointerUp() {
      this.dragIndex = undefined;
    },

    onKeydown(event, index) {
      const step = {ArrowUp: 1, ArrowRight: 1, ArrowDown: -1, ArrowLeft: -1}[event.key];
      if (step === undefined) return;
      event.preventDefault();
      const gain = this.gainOf(this.bands()[index]);
      this.setGain(index, Math.max(-9, Math.min(9, gain + step)));
    },
  }
}
</script>

<style scoped>
.eq-curve {
  display: grid;
  gap: 6px;
}

.curve {
  width: 100%;
  height: 150px;
  display: block;
  touch-action: none;
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

.point:hover, .point.dragging, .point:focus-visible {
  fill: var(--c-accent);
  outline: none;
}

.labels {
  display: flex;
  justify-content: space-around;
  font-family: var(--f-mono);
  font-size: 10px;
  color: var(--c-muted);
}

.labels span {
  flex: 1;
  text-align: center;
}
</style>
