<template>
  <button ref="button" type="button" class="app-button" :class="variant" :disabled="disabled">
    <slot></slot>
  </button>
</template>

<script>
// The interface's button: "primary" (the main action of an area), "secondary" (the default),
// "danger" (removes or cancels something) or "link" (a text action). An icon can go before the
// text in the slot.
export default {
  name: "AppButton",

  props: {
    variant: {type: String, default: "secondary"},
    disabled: {type: Boolean, default: false},
  },

  methods: {
    focus() {
      this.$refs.button.focus();
    },
  },
}
</script>

<style scoped>
.app-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 7px 12px;
  border-radius: 6px;
  border: 1px solid var(--c-field-border);
  background-color: var(--c-raised);
  color: var(--c-text);
  font: inherit;
  font-weight: 600;
  font-size: 13px;
  white-space: nowrap;
  cursor: pointer;
}

.app-button:hover:not(:disabled) {
  background-color: var(--c-hover);
}

.app-button.primary {
  background-color: var(--c-accent);
  border-color: var(--c-accent);
  color: var(--c-on-accent);
}

.app-button.primary:hover:not(:disabled) {
  filter: brightness(1.1);
}

.app-button.danger {
  border-color: var(--c-danger);
  color: var(--c-danger);
}

.app-button.danger:hover:not(:disabled) {
  background-color: var(--c-danger);
  color: var(--c-on-danger);
}

.app-button.link {
  padding: 4px 2px;
  border-color: transparent;
  background: transparent;
  color: var(--c-accent);
}

.app-button.link:hover:not(:disabled) {
  background: transparent;
  text-decoration: underline;
}

.app-button:disabled {
  opacity: .5;
  cursor: default;
}

.app-button:focus-visible {
  outline: 2px solid var(--c-accent);
  outline-offset: 2px;
}
</style>
