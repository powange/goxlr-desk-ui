<template>
  <button type="button" role="switch" class="toggle" :class="{ on: modelValue }" :aria-checked="modelValue"
          :aria-label="label" :disabled="disabled" @click="$emit('update:modelValue', !modelValue)">
    <span class="knob"></span>
  </button>
</template>

<script>
// An on/off switch.
export default {
  name: "Toggle",
  emits: ["update:modelValue"],
  props: {
    modelValue: {type: Boolean, default: false},
    label: {type: String, required: true},
    disabled: {type: Boolean, default: false},
  }
}
</script>

<style scoped>
.toggle {
  position: relative;
  width: 32px;
  height: 18px;
  padding: 0;
  border: none;
  border-radius: 9px;
  background-color: var(--c-field-border);
  cursor: pointer;
  flex: none;
}

.toggle .knob {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: var(--c-text);
  transition: left .15s;
}

.toggle.on {
  background-color: var(--c-accent);
}

.toggle.on .knob {
  left: 17px;
  background-color: var(--c-on-accent);
}

.toggle:focus-visible {
  outline: 2px solid var(--c-accent);
  outline-offset: 2px;
}

.toggle:disabled {
  opacity: .5;
  cursor: default;
}

@media (prefers-reduced-motion: reduce) {
  .toggle .knob {
    transition: none;
  }
}
</style>
