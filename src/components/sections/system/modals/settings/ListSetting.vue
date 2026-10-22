<script>
import SettingRow from "@/components/sections/system/settings/SettingRow.vue";

let next = 0;

export default {
  components: {SettingRow},
  emits: ['change'],

  name: "ListSetting",
  props: {
    label: {type: String, required: true},
    description: {type: String, required: true},
    options: {type: Array, required: true},
    value: {type: String, required: true},
    help: {type: String, default: ""},
    restart: {type: Boolean, default: false},
  },

  data() {
    return {id: `list-setting-${next++}`};
  },

  methods: {
    onChange(e) {
      this.$emit('change', e.target.value);
    },
  }
}
</script>

<template>
  <SettingRow :label="label" :help="help" :restart="restart" :for-id="id">
    <select :id="id" class="setting-field" :aria-description="description" @change="onChange">
      <option v-for="option of options" :key="option.key" :value="option.key" :selected="option.key === value">
        {{ option.value }}
      </option>
    </select>
    <slot></slot>
  </SettingRow>
</template>

<style scoped>
.setting-field {
  min-width: 220px;
  padding: 7px 10px;
  border: 1px solid var(--c-field-border);
  border-radius: 6px;
  background-color: var(--c-bg);
  color: var(--c-text);
  font-family: var(--f-body);
  font-size: 13px;
  cursor: pointer;
}

.setting-field option {
  background-color: var(--c-panel);
}
</style>
