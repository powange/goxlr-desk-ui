<template>
  <div class="segmented" role="radiogroup" :aria-label="label" @keydown="onKeydown">
    <button v-for="option in options" :key="option.id" ref="buttons" type="button" role="radio"
            :aria-checked="option.id === selected" :tabindex="option.id === selected ? 0 : -1"
            :class="{ on: option.id === selected }" :disabled="disabled" @click="select(option.id)">
      {{ option.label }}
    </button>
  </div>
</template>

<script>
// A row of exclusive choices, for 2 to 5 short options. Arrow keys move the selection, like
// radio buttons.
export default {
  name: "SegmentedControl",
  emits: ["selection-changed"],
  props: {
    options: {type: Array, required: true},   // [{id, label}]
    selected: {type: String, required: false, default: undefined},
    label: {type: String, required: true},
    disabled: {type: Boolean, default: false},
  },

  methods: {
    select(id) {
      if (id !== this.selected) this.$emit("selection-changed", id);
    },

    onKeydown(event) {
      const step = {ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1}[event.key];
      if (step === undefined) return;
      event.preventDefault();
      const index = this.options.findIndex(option => option.id === this.selected);
      const next = (index + step + this.options.length) % this.options.length;
      this.select(this.options[next].id);
      this.$nextTick(() => this.$refs.buttons[next].focus());
    },
  }
}
</script>

<style scoped>
.segmented {
  display: inline-flex;
  gap: 2px;
  padding: 2px;
  border: 1px solid var(--c-line);
  border-radius: 6px;
  background-color: var(--c-raised);
}

.segmented button {
  border: none;
  border-radius: 4px;
  padding: 5px 12px;
  background: transparent;
  color: var(--c-muted);
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
  cursor: pointer;
}

.segmented button:hover:not(.on):not(:disabled) {
  color: var(--c-text);
  background-color: var(--c-hover);
}

.segmented button.on {
  background-color: var(--c-accent);
  color: var(--c-on-accent);
}

.segmented button:focus-visible {
  outline: 2px solid var(--c-accent);
  outline-offset: 1px;
}

.segmented button:disabled {
  cursor: default;
  opacity: .5;
}
</style>
