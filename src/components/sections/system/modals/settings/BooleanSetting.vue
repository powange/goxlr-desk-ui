<script>
import Toggle from "@/components/design/Toggle.vue";

export default {
  components: {Toggle},
  emits: ['change'],

  name: "BooleanSetting",
  props: {
    label: {type: String, required: true},
    description: {type: String, required: true},
    enabled: {type: Boolean, required: true},
  },

  methods: {
    onChange() {
      this.$emit('change', !this.enabled);
    },
  }
}
</script>

<template>
  <div class="setting">
    <div class="label" @click="onChange">{{ label }}</div>
    <div class="input">
      <Toggle :model-value="enabled" @update:model-value="onChange" :label="label" :aria-description="description"/>
    </div>
  </div>
</template>

<style scoped>
.setting {
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 16px;
  min-height: 20px;
  padding: 10px;
  color: var(--c-text-soft);
}

.setting:focus-within {
  color: var(--c-text);
}

.setting:hover {
  cursor: pointer;
  color: var(--c-text);
}

.label {
  margin: auto;
  width: 100%;
}

.input {
  max-width: fit-content;
  font-size: 20px;
  margin: auto;
}
</style>