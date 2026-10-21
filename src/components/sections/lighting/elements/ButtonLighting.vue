<template>
  <div :class="flat ? 'rows' : 'card rows'">
    <div class="row">
      <span class="row-label">{{ activeLabel || $t('message.lighting.common.activeColour') }}</span>
      <ColourPicker inline :title="activeLabel || $t('message.lighting.common.activeColour')" :color-value="activeColour"
                    @colour-changed="$emit('active-changed', $event)"/>
    </div>
    <slot></slot>
    <div class="row">
      <span class="row-label">{{ $t('message.lighting.common.restLabel') }}</span>
      <SelectMenu class="row-select" :options="getLightingInactiveOptions($t)" :selected="offStyle"
                  @select="$emit('off-style-changed', $event)" :label="$t('message.lighting.common.restLabel')"/>
    </div>
    <div v-if="offStyle !== 'Dimmed'" class="row">
      <span class="row-label">{{ $t('message.lighting.common.restColour') }}</span>
      <ColourPicker inline :title="$t('message.lighting.common.restColour')" :color-value="inactiveColour"
                    @colour-changed="$emit('inactive-changed', $event)"/>
    </div>
    <div v-else class="row">
      <span></span>
      <span class="hint">{{ $t('message.lighting.common.restDimmedHint') }}</span>
    </div>
  </div>
</template>

<script>
import ColourPicker from "@/components/sections/lighting/elements/ColourPicker.vue";
import SelectMenu from "@/components/design/SelectMenu.vue";
import {getLightingInactiveOptions} from "@/util/mixerMapping";

// A button's lighting: its colour when active, and how it looks at rest (the active colour dimmed,
// or a colour of its own, dimmed or not). The rest colour is only asked for when it's used.
export default {
  name: "ButtonLighting",
  components: {SelectMenu, ColourPicker},
  emits: ["active-changed", "inactive-changed", "off-style-changed"],

  props: {
    activeColour: {type: String, required: true},
    inactiveColour: {type: String, required: true},
    offStyle: {type: String, required: true},
    activeLabel: {type: String, required: false, default: ""},
    // Rows only, without the card, inside another section
    flat: {type: Boolean, default: false},
  },

  methods: {
    getLightingInactiveOptions,
  }
}
</script>

<style scoped>
.card {
  min-width: 340px;
  padding: 14px 16px;
  background-color: var(--c-raised);
  border-radius: 6px;
  align-self: stretch;
}

.rows {
  display: grid;
  gap: 10px;
  align-content: start;
}

.row, :slotted(.row) {
  display: grid;
  grid-template-columns: 130px 1fr;
  align-items: center;
  gap: 12px;
  min-height: 32px;
}

.row-label, :slotted(.row-label) {
  color: var(--c-muted);
  font-size: 12px;
}

.row-select {
  justify-self: start;
  min-width: 200px;
  max-width: 260px;
}

select:focus-visible {
  outline: 2px solid var(--c-accent);
  outline-offset: 1px;
}

.hint {
  color: var(--c-muted);
  font-size: 11px;
}
</style>
