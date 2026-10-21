<template>
  <div class="global-lighting">
    <section class="sect">
      <h3>{{ $t('message.lighting.global.areas.title') }}</h3>
      <div v-for="area in getAreaOptions()" :key="area.id" class="row">
        <span class="row-label">{{ area.label }}</span>
        <ColourPicker inline :title="area.label" :color-value="areaColour(area.id)"
                      @colour-changed="setAreaColour(area.id, $event)"/>
      </div>
    </section>

    <section v-if="animationSupported()" class="sect">
      <h3>{{ $t('message.lighting.global.animations.title') }}</h3>
      <div class="row">
        <span class="row-label">{{ $t('message.lighting.global.animations.mode') }}</span>
        <SelectMenu class="row-select" :options="getAnimationOptions()" :selected="animationModeSelected()"
                    @select="onAnimationModeChange" :label="$t('message.lighting.global.animations.mode')"/>
      </div>
      <label class="row" :class="{ disabled: !isMod1Enabled() }">
        <span class="row-label">{{ $t('message.lighting.global.animations.mod1') }}</span>
        <span class="range">
          <input type="range" min="0" max="100" :value="mod1Value" :disabled="!isMod1Enabled()"
                 @input="setMod1Value($event.target.value)" @change="mouseUp('mod1')"/>
          <span class="value">{{ getMod1Value() }}</span>
        </span>
      </label>
      <label class="row" :class="{ disabled: !isMod2Enabled() }">
        <span class="row-label">{{ $t('message.lighting.global.animations.mod2') }}</span>
        <span class="range">
          <input type="range" min="0" max="100" :value="mod2Value" :disabled="!isMod2Enabled()"
                 @input="setMod2Value($event.target.value)" @change="mouseUp('mod2')"/>
          <span class="value">{{ getMod2Value() }}</span>
        </span>
      </label>
      <div class="row" :class="{ disabled: !isWaterfallEnabled() }">
        <span class="row-label">{{ $t('message.lighting.global.animations.waterfall') }}</span>
        <SegmentedControl :options="getWaterfallOptions()" :selected="getWaterfall()" :disabled="!isWaterfallEnabled()"
                          @selection-changed="setWaterfall" :label="$t('message.lighting.global.animations.waterfall')"/>
      </div>
    </section>
  </div>
</template>

<script>
import lightingGlobal from "@/mixins/lightingGlobal";
import SelectMenu from "@/components/design/SelectMenu.vue";
import ColourPicker from "@/components/sections/lighting/elements/ColourPicker.vue";
import SegmentedControl from "@/components/design/SegmentedControl.vue";
import {store} from "@/store";
import {websocket} from "@/util/sockets";

// The device-wide lighting (global and accent colours, animation), opened from the top bar. The
// settings and their commands are the Lighting section's (LightingGlobal).
export default {
  name: "GlobalLighting",
  extends: lightingGlobal,
  components: {SelectMenu, ColourPicker, SegmentedControl},

  methods: {
    areaColour(area) {
      return "#" + store.getActiveDevice().lighting.simple[area].colour_one;
    },

    setAreaColour(area, value) {
      this.selected = area;
      this.onColourChange(value);
    },

    getWaterfallOptions() {
      return [
        {id: "Up", label: "↑", ariaLabel: this.$t('message.common.waterfallAnimationUp')},
        {id: "Down", label: "↓", ariaLabel: this.$t('message.common.waterfallAnimationDown')},
        {id: "Off", label: this.$t('message.lighting.global.animations.waterfallOff')},
      ];
    },

    getWaterfall() {
      return store.getActiveDevice().lighting.animation.waterfall_direction;
    },

    // Sends the final value when the slider is released
    mouseUp(id) {
      const value = id === "mod1" ? this.mod1Value : this.mod2Value;
      const command = id === "mod1" ? {"SetAnimationMod1": value} : {"SetAnimationMod2": value};
      store.getActiveDevice().lighting.animation[id] = value;
      websocket.send_command(store.getActiveSerial(), command);
    },
  }
}
</script>

<style scoped>
.global-lighting {
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

.sect h3 {
  margin: 0;
  font-family: var(--f-mono);
  font-size: 12px;
  font-weight: 500;
  letter-spacing: .08em;
  text-transform: uppercase;
  color: var(--c-muted);
}

.row {
  display: grid;
  grid-template-columns: 170px 1fr;
  align-items: center;
  gap: 12px;
  min-height: 32px;
}

.row.disabled {
  opacity: .5;
}

.row-label {
  color: var(--c-muted);
  font-size: 12px;
}

.row-select {
  justify-self: start;
  min-width: 200px;
  max-width: 260px;
}

.range {
  display: flex;
  align-items: center;
  gap: 10px;
}

.range input {
  flex: 1;
  max-width: 260px;
  accent-color: var(--c-accent);
}

.value {
  font-family: var(--f-mono);
  font-size: 12px;
  min-width: 3ch;
}

select:focus-visible, .range input:focus-visible {
  outline: 2px solid var(--c-accent);
  outline-offset: 1px;
}
</style>
