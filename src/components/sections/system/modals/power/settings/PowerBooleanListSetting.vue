<script>
import Toggle from "@/components/design/Toggle.vue";

export default {
  components: {Toggle},
  emits: ['check-change', 'select-change'],

  name: "PowerBooleanListSetting",
  props: {
    label: {type: String, required: true},
    description: {type: String, required: true},
    enabled: {type: Boolean, required: true},
    options: {type: Array, required: true},
    value: {required: true},
  },

  data() {
    return {
      checked: false,
      selected: undefined,
    }
  },

  computed: {
    // A saved choice no longer in the list (a profile renamed or deleted elsewhere) is shown as
    // missing, rather than the list silently showing (and saving) its first entry.
    shownOptions() {
      if (this.selected === undefined || this.options.some(option => option.key === this.selected)) {
        return this.options;
      }
      return [{key: this.selected, value: this.$t('message.system.power.missing', {name: this.selected})}, ...this.options];
    },
  },

  methods: {
    selectedValue() {
      return this.$refs.selection.value;
    },

    onCheckChange() {
      this.checked = !this.checked;
      this.$emit('check-change', !this.enabled);
    },

    onSelectChange(e) {
      this.selected = e.target.value;
      this.$emit('select-change', e.target.value);
    },
  },

  mounted() {
    this.checked = this.enabled;
    this.selected = this.value;
  },

  watch: {
    enabled(newValue) {
      this.checked = newValue;
    },

    value(newValue) {
      if (newValue !== undefined) {
        this.selected = newValue;
      }
    }
  }
}
</script>

<template>
  <div class="power-row" :class="{ off: !checked }">
    <Toggle :model-value="checked" @update:model-value="onCheckChange" :label="label" :aria-description="description"/>
    <span class="power-label" aria-hidden="true" @click="onCheckChange">{{ label }}</span>
    <select ref="selection" class="power-select" :disabled="!checked" :aria-label="label" @change="onSelectChange">
      <option v-for="option of shownOptions" :key="option.key" :value="option.key" :selected="option.key === selected">
          {{ option.value }}
        </option>
    </select>
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
