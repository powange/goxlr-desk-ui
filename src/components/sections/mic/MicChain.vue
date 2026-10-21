<template>
  <div class="chain" role="group" :aria-label="$t('message.microphone.chain.title')">
    <div class="node">
      <span class="node-key">{{ $t('message.microphone.chain.input') }}</span>
      <span class="node-value">{{ getGain() }} {{ $t('message.suffixes.decibels') }}</span>
      <span class="node-detail">{{ getMicType() }}</span>
    </div>
    <span class="arrow" aria-hidden="true">→</span>
    <div class="node" :class="{ on: isGateOn() }">
      <span class="node-key">
        {{ $t('message.microphone.chain.gate') }}
        <Toggle :model-value="isGateOn()" @update:model-value="setGate" :label="$t('message.microphone.chain.gateToggle')"/>
      </span>
      <span class="node-value">{{ getGateThreshold() }} {{ $t('message.suffixes.decibels') }}</span>
      <span class="node-detail">{{ $t('message.microphone.chain.threshold') }}</span>
    </div>
    <span class="arrow" aria-hidden="true">→</span>
    <div class="node on">
      <span class="node-key">{{ $t('message.microphone.chain.equaliser') }}</span>
      <span class="node-value">{{ $t('message.microphone.chain.bands', {count: getBandCount()}) }}</span>
      <span class="node-detail">{{ getEqSummary() }}</span>
    </div>
    <span class="arrow" aria-hidden="true">→</span>
    <div class="node on">
      <span class="node-key">{{ $t('message.microphone.chain.compressor') }}</span>
      <span class="node-value">{{ getRatio() }}</span>
      <span class="node-detail">{{ $t('message.microphone.chain.compressorDetail', {threshold: getCompressorThreshold()}) }}</span>
    </div>
  </div>
</template>

<script>
import {store} from "@/store";
import {websocket} from "@/util/sockets";
import {formatFrequency, isDeviceMini} from "@/util/util";
import Toggle from "@/components/design/Toggle.vue";

// CompressorRatio is sent as its index
const RATIOS = ["1:1", "1.1:1", "1.2:1", "1.4:1", "1.6:1", "1.8:1", "2:1", "2.5:1", "3.2:1", "4:1", "5.6:1", "8:1", "16:1", "32:1", "64:1"];

// The microphone's processing chain at a glance: each stage with its key value.
export default {
  name: "MicChain",
  components: {Toggle},

  methods: {
    mic() {
      return store.getActiveDevice().mic_status;
    },

    // The same names as Mic Setup, with the Mini's 24V phantom power
    getMicType() {
      switch (this.mic().mic_type) {
        case "Condenser": return this.$t('message.microphone.setup.phantom', {voltage: isDeviceMini() ? "24" : "48"});
        case "Jack": return this.$t('message.microphone.setup.jack');
        default: return this.$t('message.microphone.setup.xlr');
      }
    },

    getGain() {
      return this.mic().mic_gains[this.mic().mic_type];
    },

    isGateOn() {
      return this.mic().noise_gate.enabled;
    },

    setGate(enabled) {
      websocket.send_command(store.getActiveSerial(), {SetGateActive: enabled});
    },

    getGateThreshold() {
      return this.mic().noise_gate.threshold;
    },

    equaliser() {
      return isDeviceMini() ? this.mic().equaliser_mini : this.mic().equaliser;
    },

    getBandCount() {
      return Object.keys(this.equaliser().gain).length;
    },

    // The strongest boost or cut, for example "+3 dB at 4 kHz"
    getEqSummary() {
      let best = undefined;
      for (const [band, gain] of Object.entries(this.equaliser().gain)) {
        if (best === undefined || Math.abs(gain) > Math.abs(best.gain)) best = {band, gain};
      }
      if (best === undefined || best.gain === 0) return this.$t('message.microphone.chain.flat');
      const hz = this.equaliser().frequency[best.band];
      const freq = formatFrequency(this.$t, this.$i18n.locale, hz);
      const gain = (best.gain > 0 ? "+" : "") + best.gain;
      return this.$t('message.microphone.chain.eqPeak', {gain, freq});
    },

    getRatio() {
      const ratio = this.mic().compressor.ratio;
      return typeof ratio === "number" ? RATIOS[ratio] : String(ratio);
    },

    getCompressorThreshold() {
      return this.mic().compressor.threshold;
    },
  }
}
</script>

<style scoped>
.chain {
  display: grid;
  grid-template-columns: 1fr auto 1fr auto 1fr auto 1fr;
  align-items: stretch;
  gap: 8px;
}

.arrow {
  align-self: center;
  color: var(--c-muted);
}

.node {
  display: grid;
  gap: 4px;
  align-content: start;
  padding: 12px 14px;
  background-color: var(--c-panel);
  border: 1px solid var(--c-line);
  border-radius: 8px;
}

.node.on {
  border-color: color-mix(in srgb, var(--c-accent) 60%, var(--c-line));
}

.node-key {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  font-family: var(--f-mono);
  font-size: 10px;
  letter-spacing: .08em;
  text-transform: uppercase;
  color: var(--c-muted);
}

.node-value {
  font-family: var(--f-mono);
  font-size: 20px;
  font-weight: 500;
  color: var(--c-text);
}

.node-detail {
  font-size: 12px;
  color: var(--c-muted);
}
</style>
