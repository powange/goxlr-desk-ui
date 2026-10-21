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
    onChange(e) {
      let value = parseInt(e.target.value);
      if (isNaN(value)) {
        return;
      }
      if (value === this.value) {
        return;
      }

      if (value < this.min) {
        value = this.min;
      }
      if (value > this.max) {
        value = this.max;
      }

      this.$emit('change', value);
    },

    validate(e) {
      let allowedKeys = [
          "ArrowRight",
          "ArrowLeft",
          "Enter",
          "Backspace",
          "Delete",
          "Tab"
      ];

      // Check whether the Key is a Number..
      if ((isNaN(e.key) || e.key === null) && !allowedKeys.includes(e.key)) {
          e.preventDefault();
          return false;
      }

      return true;
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
