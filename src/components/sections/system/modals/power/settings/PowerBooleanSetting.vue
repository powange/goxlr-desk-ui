<script>
import Toggle from "@/components/design/Toggle.vue";

export default {
  components: {Toggle},
  emits: ['check-change'],

  name: "PowerBooleanSetting",
  props: {
    label: {type: String, required: true},
    description: {type: String, required: true},
    enabled: {type: Boolean, required: true},
  },

  data() {
    return {
      checked: false,
    }
  },

  methods: {
    onCheckChange() {
      this.checked = !this.checked;
      this.$emit('check-change', !this.enabled);
    },
  },

  mounted() {
    this.checked = this.enabled;
  },

  watch: {
    enabled(newValue) {
      this.checked = newValue;
    }
  }
}
</script>

<template>
  <div class="setting">
    <div class="input">
      <Toggle :model-value="checked" @update:model-value="onCheckChange" :label="label" :aria-description="description"/>
    </div>
    <div class="label" @click="onCheckChange">{{ label }}</div>
  </div>
</template>

<style scoped>
.setting {
  cursor: pointer;
  display: flex;
  gap: 5px;
  height: 16px;
  padding: 5px;
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
  font-size: 16px;
  margin: auto;
}
</style>