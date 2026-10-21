<template>
  <AppButton ref="button" class="modal-button" :disabled="!enabled"><slot /></AppButton>
</template>

<script>
import AppButton from "@/components/design/AppButton.vue";

// A dialog's footer button: the interface's button with the room footers need.
export default {
  name: "ModalButton",
  components: {AppButton},

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
  margin: 8px;
  /* At least 120px, wider for longer labels rather than wrapping them */
  min-width: 120px;
}
</style>
