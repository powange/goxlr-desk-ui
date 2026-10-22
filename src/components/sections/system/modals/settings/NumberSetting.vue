<script>
import SettingRow from "@/components/sections/system/settings/SettingRow.vue";

export default {
  components: {SettingRow},
  emits: ['change'],

  name: "NumberSetting",
  props: {
    label: {type: String, required: true},
    description: {type: String, required: true},
    value: {type: Number, required: true},

    suffix: {type: String, required: false, default: ""},
    help: {type: String, default: ""},

    min: {type: Number, required: true},
    max: {type: Number, required: true}
  },

  methods: {
    // Committed on Enter and when leaving the field. The value is shown as it's kept: back
    // within min..max, or the current one when what was typed isn't a number.
    onChange(e) {
      let value = parseInt(e.target.value);
      if (isNaN(value)) {
        e.target.value = this.value;
        return;
      }
      value = Math.min(this.max, Math.max(this.min, value));
      e.target.value = value;
      if (value !== this.value) {
        this.$emit('change', value);
      }
    },

    // Only digits are typed in (and a minus sign when the minimum is below zero); the editing
    // and moving keys, and the shortcuts (Ctrl+A, C, V, Z..), still work.
    validate(e) {
      if (e.key === "Enter") {
        this.onChange(e);
        return true;
      }
      if (e.ctrlKey || e.metaKey || e.altKey || e.key.length !== 1) {
        return true;
      }
      if (/[0-9]/.test(e.key) || (e.key === "-" && this.min < 0)) {
        return true;
      }
      e.preventDefault();
      return false;
    },

    getElementId() {
      return this.label.toLocaleLowerCase()
          .replaceAll(" ", "_")
          .replaceAll("(", "_")
          .replaceAll(")", "_");
    }
  }
}
</script>

<template>
  <SettingRow :label="label" :help="help" :for-id="getElementId()">
    <input :id="getElementId()" class="setting-field" type="number" :value="value" :min="min" :max="max"
           :aria-description="description" @blur="onChange" @keydown="validate"/>
    <span class="unit">{{ suffix }}</span>
  </SettingRow>
</template>

<style scoped>
.setting-field {
  width: 90px;
  padding: 7px 10px;
  border: 1px solid var(--c-field-border);
  border-radius: 6px;
  background-color: var(--c-bg);
  color: var(--c-text);
  font-family: var(--f-body);
  font-size: 13px;
  text-align: right;
}

.unit {
  min-width: 24px;
  color: var(--c-muted);
  font-size: 12.5px;
}
</style>
