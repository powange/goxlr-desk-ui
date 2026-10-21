<template>
  <div class="channel-lighting">
    <div class="form">
      <section class="sect">
        <div class="sect-head">
          <h3>{{ $t('message.lighting.mixer.fader.title') }}</h3>
          <button type="button" class="link" @click="applyFaderToAll()">{{ $t('message.lighting.channel.applyFaders') }}</button>
        </div>
        <div class="row">
          <span class="row-label">{{ $t('message.lighting.mixer.fader.style') }}</span>
          <span class="chips">
            <button v-for="option in getStyleOptions()" :key="option.id" type="button" class="chip"
                    :class="{ on: option.selected }" :aria-pressed="option.selected"
                    @click="onStyleSelectionChanged(option.id, !option.selected)">{{ option.label }}</button>
          </span>
        </div>
        <div class="row">
          <span></span>
          <span class="hint">{{ getStyleHint() }}</span>
        </div>
        <div class="row">
          <span class="row-label">{{ $t('message.lighting.mixer.fader.bottomColour') }}</span>
          <ColourPicker inline :title="$t('message.lighting.mixer.fader.bottomColour')" :color-value="getFaderBottomColour()"
                        @colour-changed="onFaderBottomColourChange"/>
        </div>
        <div class="row">
          <span class="row-label">{{ $t('message.lighting.mixer.fader.topColour') }}</span>
          <ColourPicker inline :title="$t('message.lighting.mixer.fader.topColour')" :color-value="getFaderTopColour()"
                        @colour-changed="onFaderTopColourChange"/>
        </div>
      </section>

      <section v-if="!isDeviceMini()" class="sect">
        <div class="sect-head">
          <h3>{{ $t('message.lighting.mixer.screen.title') }}</h3>
        </div>
        <div class="row">
          <span class="row-label">{{ $t('message.lighting.mixer.screen.backgroundColour') }}</span>
          <ColourPicker inline :title="$t('message.lighting.mixer.screen.backgroundColour')" :color-value="getScreenColour()"
                        @colour-changed="onScreenColourChange"/>
        </div>
        <label class="row">
          <span class="row-label">{{ $t('message.lighting.mixer.screen.icons') }}</span>
          <span class="inline-controls">
            <select :value="getSelectedIcon() || ''" @change="onIconSelectionChange($event.target.value || null)">
              <option v-for="option in getIconOptions()" :key="option.id || 'none'" :value="option.id || ''">{{ option.label }}</option>
            </select>
            <button type="button" class="small-button" @click="openIcons" :title="$t('message.lighting.channel.openIcons')">
              <font-awesome-icon icon="fa-solid fa-folder"/>
            </button>
          </span>
        </label>
        <label class="row">
          <span class="row-label">{{ $t('message.lighting.mixer.screen.options.text') }}</span>
          <input type="text" class="text-input" v-model="textValue" @blur="applyUpdate" @keyup.enter="applyUpdate"
                 :aria-description="$t('message.lighting.mixer.screen.options.accessibilityText')"/>
        </label>
        <div class="row">
          <span class="row-label">{{ $t('message.lighting.channel.display') }}</span>
          <span class="inline-controls">
            <label class="switch">
              <Toggle :model-value="isScreenNumberShow()" @update:model-value="setScreenNumberShow"
                      :label="$t('message.lighting.mixer.screen.options.showNumber')"/>
              {{ $t('message.lighting.mixer.screen.options.showNumber') }}
            </label>
            <label class="switch">
              <Toggle :model-value="isScreenInverted()" @update:model-value="setScreenInverted"
                      :label="$t('message.lighting.mixer.screen.options.invertDisplay')"/>
              {{ $t('message.lighting.mixer.screen.options.invertDisplay') }}
            </label>
          </span>
        </div>
      </section>

      <section class="sect">
        <div class="sect-head">
          <h3>{{ $t('message.lighting.mixer.mute.title') }}</h3>
          <button type="button" class="link" @click="applyMuteToAll()">{{ $t('message.lighting.channel.applyMutes') }}</button>
        </div>
        <ButtonLighting flat :active-colour="getMuteActiveColour()" :inactive-colour="getMuteInactiveColour()"
                        :off-style="selectedMuteInactiveOption()"
                        @active-changed="onMuteActiveColourChanged" @inactive-changed="onMuteInactiveColourChanged"
                        @off-style-changed="onMuteInactiveSelectionChange"/>
      </section>
    </div>

    <aside class="preview" aria-hidden="true">
      <span class="preview-title">{{ $t('message.lighting.channel.preview') }}</span>
      <div class="preview-row">
        <div class="preview-item">
          <div class="leds">
            <i v-for="(colour, index) in getLedColours()" :key="index" :style="{ backgroundColor: colour }"></i>
          </div>
          <span>{{ styleContains('Meter') ? $t('message.lighting.channel.previewMeter') : $t('message.lighting.channel.previewFader') }}</span>
        </div>
        <div v-if="!isDeviceMini()" class="preview-item">
          <div class="screen" :style="{ backgroundColor: getScreenColour() }">
            <img :src="getScribbleUrl()" alt=""/>
          </div>
          <span>{{ $t('message.lighting.channel.previewScreen') }}</span>
        </div>
      </div>
      <div class="preview-row">
        <div class="preview-item">
          <div class="mute" :style="{ backgroundColor: getMuteActiveColour() }">MUTE</div>
          <span>{{ $t('message.lighting.channel.previewActive') }}</span>
        </div>
        <div class="preview-item">
          <div class="mute" :style="getRestStyle()">MUTE</div>
          <span>{{ $t('message.lighting.channel.previewRest') }}</span>
        </div>
      </div>
    </aside>
  </div>
</template>

<script>
import LightingMixer from "@/components/sections/lighting/subTabs/LightingMixer.vue";
import ColourPicker from "@/components/sections/lighting/elements/ColourPicker.vue";
import ButtonLighting from "@/components/sections/lighting/elements/ButtonLighting.vue";
import Toggle from "@/components/design/Toggle.vue";
import {store} from "@/store";
import {getBaseHTTPAddress} from "@/util/sockets";

// As on the device (and the visualiser): 15 LEDs, lit up to the fader position
const LED_COUNT = 15;

function mix(a, b, t) {
  const pa = [1, 3, 5].map(i => parseInt(a.slice(i, i + 2), 16));
  const pb = [1, 3, 5].map(i => parseInt(b.slice(i, i + 2), 16));
  return "#" + pa.map((c, i) => Math.round(c + (pb[i] - c) * t).toString(16).padStart(2, "0")).join("");
}

// The lighting of one fader, as rows (fader, screen, mute button) with a preview of the result.
// The settings and their commands are the Lighting section's (LightingMixer), fixed on one fader.
export default {
  name: "ChannelLighting",
  extends: LightingMixer,
  components: {ColourPicker, ButtonLighting, Toggle},

  methods: {
    // What each style does with the two colours
    getStyleHint() {
      const gradient = this.styleContains('Gradient'), meter = this.styleContains('Meter');
      if (meter) {
        return gradient ? this.$t('message.lighting.channel.hintGradientMeter') : this.$t('message.lighting.channel.hintMeter');
      }
      return gradient ? this.$t('message.lighting.channel.hintGradient') : this.$t('message.lighting.channel.hintTwoColour');
    },

    // The LEDs from top to bottom, following the fader position (as the visualiser does): below
    // it the bottom colour, or a blend towards the top colour with Gradient; above it the top
    // colour, or nothing with Gradient. With Meter the device follows the sound instead, the
    // preview then shows the same colours.
    getLedColours() {
      const bottom = this.getFaderBottomColour(), top = this.getFaderTopColour();
      const gradient = this.styleContains('Gradient');
      const channel = store.getActiveDevice().fader_status[this.activeChannel].channel;
      const volume = store.getActiveDevice().levels.volumes[channel] || 0;
      const lit = Math.ceil(LED_COUNT / 255 * volume + 0.25);
      const colours = [];
      for (let level = LED_COUNT - 1; level >= 0; level--) {
        if (level >= lit) {
          colours.push(gradient ? "transparent" : top);
        } else {
          colours.push(gradient ? mix(bottom, top, level / LED_COUNT) : bottom);
        }
      }
      return colours;
    },

    // The screen as the daemon draws it; the query changes with its settings so it reloads.
    getScribbleUrl() {
      const scribble = store.getActiveDevice().fader_status[this.activeChannel].scribble;
      const query = `?i=${scribble.file_name}&b=${scribble.bottom_text}&l=${scribble.left_text}&in=${scribble.inverted}`;
      return getBaseHTTPAddress() + "files/scribble/" + store.getActiveSerial() + "/" + this.activeChannel + ".png" + query;
    },

    getRestStyle() {
      const style = this.selectedMuteInactiveOption();
      const colour = style === "Dimmed" ? this.getMuteActiveColour() : this.getMuteInactiveColour();
      return {backgroundColor: colour, opacity: style === "Colour2" ? 1 : 0.4};
    },
  }
}
</script>

<style scoped>
.channel-lighting {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 250px;
  color: var(--c-text);
}

.sect {
  display: grid;
  gap: 10px;
  padding: 14px 18px;
  border-bottom: 1px solid var(--c-line);
}

.sect:last-child {
  border-bottom: 0;
}

.sect-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.sect-head h3 {
  margin: 0;
  font-family: var(--f-mono);
  font-size: 12px;
  font-weight: 500;
  letter-spacing: .08em;
  text-transform: uppercase;
  color: var(--c-muted);
}

.link {
  border: none;
  background: transparent;
  color: var(--c-accent);
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
}

.link:hover {
  text-decoration: underline;
}

.row {
  display: grid;
  grid-template-columns: 130px 1fr;
  align-items: center;
  gap: 12px;
  min-height: 32px;
}

.row-label {
  color: var(--c-muted);
  font-size: 12px;
}

.chips, .inline-controls {
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}

.chip {
  padding: 5px 12px;
  border: 1px solid var(--c-line);
  border-radius: 999px;
  background: transparent;
  color: var(--c-muted);
  font-size: 12px;
  cursor: pointer;
}

.chip.on {
  background-color: color-mix(in srgb, var(--c-accent) 18%, transparent);
  border-color: var(--c-accent);
  color: var(--c-text);
  font-weight: 600;
}

.chip.on::before {
  content: "✓ ";
  color: var(--c-accent);
}

select, .text-input {
  padding: 6px 8px;
  border: 1px solid var(--c-line);
  border-radius: 6px;
  background-color: var(--c-raised);
  color: var(--c-text);
  font-size: 12px;
}

select {
  min-width: 180px;
}

.text-input {
  max-width: 220px;
}

.small-button {
  padding: 6px 9px;
  border: 1px solid var(--c-line);
  border-radius: 6px;
  background-color: var(--c-raised);
  color: var(--c-text);
  cursor: pointer;
}

.switch {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-right: 12px;
  font-size: 12px;
}

.chip:focus-visible, .link:focus-visible, select:focus-visible, .text-input:focus, .small-button:focus-visible {
  outline: 2px solid var(--c-accent);
  outline-offset: 1px;
}

.preview {
  display: grid;
  gap: 16px;
  align-content: start;
  justify-items: center;
  padding: 16px;
  background-color: var(--c-raised);
  border-left: 1px solid var(--c-line);
}

.preview-title {
  justify-self: start;
  font-family: var(--f-mono);
  font-size: 10px;
  letter-spacing: .08em;
  text-transform: uppercase;
  color: var(--c-muted);
}

.preview-row {
  display: flex;
  align-items: flex-end;
  gap: 18px;
}

.preview-item {
  display: grid;
  justify-items: center;
  gap: 6px;
  font-size: 11px;
  color: var(--c-muted);
}

.leds {
  display: grid;
  gap: 3px;
  width: 24px;
}

.leds i {
  height: 6px;
  border-radius: 2px;
  box-shadow: inset 0 0 0 1px var(--c-line);
}

.hint {
  color: var(--c-muted);
  font-size: 11px;
}

.screen {
  width: 128px;
  height: 64px;
  border-radius: 4px;
  border: 1px solid var(--c-line);
  overflow: hidden;
  display: grid;
  place-items: center;
}

.screen img {
  width: 128px;
  height: 64px;
  image-rendering: pixelated;
  mix-blend-mode: multiply;
}

.mute {
  width: 66px;
  height: 30px;
  border-radius: 6px;
  display: grid;
  place-items: center;
  font-size: 10px;
  font-weight: 700;
  color: #000000;
}
</style>
