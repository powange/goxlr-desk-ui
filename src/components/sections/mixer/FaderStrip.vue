<template>
  <div class="strip" role="group" :aria-label="getFaderName()" :style="{ '--strip': getStripColour() }">
    <div class="strip-head">
      <span class="fader-name">{{ getFaderName() }}</span>
      <button type="button" class="lighting" @click="$emit('lighting', fader)"
              :title="$t('message.mixer.strip.lighting', { channel: getFaderName() })"
              :aria-label="$t('message.mixer.strip.lighting', { channel: getFaderName() })">
        <font-awesome-icon icon="fa-solid fa-lightbulb"/>
      </button>
    </div>

    <label class="field">
      <span class="field-label">{{ $t('message.mixer.strip.source') }}</span>
      <select :value="getActiveSource()" @change="sourceChanged($event.target.value)"
              :aria-label="$t('message.configuration.faders.sourceLabel', { channel: getFaderName() })">
        <option v-for="option in getSourceOptions()" :key="option.id" :value="option.id">{{ option.label }}</option>
      </select>
    </label>

    <div class="strip-slider">
      <slot></slot>
    </div>

    <button type="button" class="mute" :class="{ muted: isMuted() }" :aria-pressed="isMuted()" @click="toggleMute">
      <font-awesome-icon :icon="isMuted() ? 'fa-solid fa-volume-xmark' : 'fa-solid fa-volume-high'"/>
      <span>{{ isMuted() ? $t('message.mixer.strip.muted') : $t('message.mixer.strip.mute') }}</span>
    </button>

    <label class="field">
      <span class="field-label">{{ $t('message.mixer.strip.muteFunction') }}</span>
      <select :value="getActiveMuteBehaviour()" @change="muteFunctionChanged($event.target.value)"
              :aria-label="$t('message.configuration.muteBehaviourLabel', { channel: getFaderName() })">
        <option v-for="option in getMuteBehaviour()" :key="option.id" :value="option.id" :disabled="option.disabled">
          {{ option.label }}
        </option>
      </select>
    </label>
  </div>
</template>

<script>
import Faders from "@/components/sections/Faders.vue";
import {store} from "@/store";
import {websocket} from "@/util/sockets";

// One physical fader: its source, volume (slot), mute button and mute function. The source and
// mute function rules come from the Faders component, applied to this fader.
export default {
  name: "FaderStrip",
  extends: Faders,
  emits: ["lighting"],

  props: {
    fader: {type: String, required: true},
  },

  created() {
    this.activeChannel = this.fader;
  },

  methods: {
    getFaderName() {
      return this.$t(`message.faders.${this.fader}`);
    },

    // The colour of this fader's lights on the device
    getStripColour() {
      const lighting = store.getActiveDevice().lighting.faders[this.fader];
      return lighting ? "#" + lighting.colours.colour_two : "var(--c-accent)";
    },

    isMuted() {
      return store.getActiveDevice().fader_status[this.fader].mute_state !== "Unmuted";
    },

    toggleMute() {
      let state = "Unmuted";
      if (!this.isMuted()) {
        state = this.getActiveMuteBehaviour() === "All" ? "MutedToAll" : "MutedToX";
      }
      websocket.send_command(store.getActiveSerial(), {SetFaderMuteState: [this.fader, state]});
    },
  }
}
</script>

<style scoped>
.strip {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 10px;
  width: 168px;
  padding: 12px;
  box-sizing: border-box;
  background-color: var(--c-panel);
  border: 1px solid var(--c-line);
  border-top: 3px solid var(--strip);
  border-radius: 8px;
}

.strip-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.fader-name {
  font-family: var(--f-title);
  font-size: 15px;
  letter-spacing: .04em;
  text-transform: uppercase;
  color: var(--c-text);
}

.lighting {
  padding: 4px 6px;
  border: 1px solid transparent;
  border-radius: 6px;
  background: transparent;
  color: var(--c-muted);
  cursor: pointer;
}

.lighting:hover {
  border-color: var(--c-line);
  color: var(--strip);
}

.lighting:focus-visible {
  outline: 2px solid var(--c-accent);
  outline-offset: 1px;
}

.field {
  display: grid;
  gap: 4px;
}

.field-label {
  font-family: var(--f-mono);
  font-size: 10px;
  letter-spacing: .08em;
  text-transform: uppercase;
  color: var(--c-muted);
}

.field select {
  width: 100%;
  padding: 6px 8px;
  border: 1px solid var(--c-line);
  border-radius: 6px;
  background-color: var(--c-raised);
  color: var(--c-text);
  font-size: 12px;
}

.field select:focus-visible {
  outline: 2px solid var(--c-accent);
  outline-offset: 1px;
}

.strip-slider {
  display: flex;
  justify-content: center;
}

.mute {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px;
  border: 1px solid var(--c-line);
  border-radius: 6px;
  background-color: var(--c-raised);
  color: var(--c-text);
  font-weight: 600;
  font-size: 12px;
  cursor: pointer;
}

.mute:hover {
  border-color: var(--c-line-strong);
}

.mute.muted {
  background-color: var(--c-danger);
  border-color: var(--c-danger);
  color: var(--c-on-danger);
}

.mute:focus-visible {
  outline: 2px solid var(--c-accent);
  outline-offset: 2px;
}
</style>
