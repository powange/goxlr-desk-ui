<template>
  <button ref="button" class="modal-button" :class="{ enabled: enabled }" :disabled="!enabled"><slot /></button>
</template>

<script>
export default {
  name: "ModalButton",

  props: {
    enabled: { type: Boolean, default: true }
  },

  methods: {
    focus() {
      this.$refs.button.focus();
    }
  }
}
</script>

<style scoped>
.modal-button {
  background-color: var(--c-raised);
  color: var(--c-text);
  padding: 8px 30px;
  border: none;
  margin: 8px;
  /* At least 120px, wider for longer labels rather than wrapping them */
  min-width: 120px;
  white-space: nowrap;
}

.modal-button:disabled {
  background-color: var(--c-disabled);
}

.modal-button:not(:disabled):hover, .modal-button:not(:disabled):focus {
  background-color: var(--c-hover-strong);
}
</style>
