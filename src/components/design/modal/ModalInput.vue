<template>
  <input ref="inputBox" class="text" :value="modelValue" type="text"
         @input="$emit('update:modelValue', $event.target.value)"
         v-on:keyup.enter="$emit('on-enter')"
         :placeholder="placeholder" />
</template>

<script>
export default {
  name: "ModalInput",

  props: {
    modelValue: String,
    placeholder: String,
  },

  methods: {
    focus() {
      this.$refs.inputBox.focus();
    },
  }
}
</script>

<style scoped>
input[type=text] {
  width: calc(100% - 10px);
  background-color: var(--c-disabled);
  border: 1px solid var(--c-field-border);
  padding: 5px;
  color: var(--c-text);
}
</style>
