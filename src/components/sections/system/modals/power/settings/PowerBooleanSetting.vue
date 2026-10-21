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
  <div class="power-row" :class="{ off: !checked }">
    <Toggle :model-value="checked" @update:model-value="onCheckChange" :label="label" :aria-description="description"/>
    <span class="power-label" aria-hidden="true" @click="onCheckChange">{{ label }}</span>
  </div>
</template>

<style scoped>
.power-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px 14px;
  padding: 12px 20px;
}

.power-label {
  flex: 1 1 200px;
  color: var(--c-text);
  cursor: pointer;
}

.power-row.off .power-label {
  color: var(--c-muted);
}

.power-select {
  width: 220px;
  padding: 6px 10px;
  border: 1px solid var(--c-field-border);
  border-radius: 6px;
  background-color: var(--c-bg);
  color: var(--c-text);
  font-family: var(--f-body);
  font-size: 13px;
  cursor: pointer;
}

.power-select:disabled {
  opacity: .45;
  cursor: default;
}

.power-select option {
  background-color: var(--c-panel);
}
</style>
