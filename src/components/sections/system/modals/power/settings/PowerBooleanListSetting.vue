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
  <div class="setting">
    <div class="input">
      <Toggle :model-value="checked" @update:model-value="onCheckChange" :label="label" :aria-description="description"/>
    </div>
    <div class="label" @click="onCheckChange">{{ label }}</div>

    <div class="input">
      <select ref="selection" @change="onSelectChange">
        <option v-for="option of options" :key="option.key" :value="option.key" :selected="option.key === selected">
          {{ option.value }}
        </option>
      </select>
    </div>
  </div>
</template>

<style scoped>
.setting {
  cursor: pointer;
  display: flex;
  gap: 5px;
  height: 18px;
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

.input select {
  text-align: right;
  border: 0;
  background-color: transparent;
  font-family: var(--f-body);
  color: var(--c-text-soft);
}

.input select:hover {
  color: var(--c-text);
  cursor: pointer;
}

.input select option {
  background-color: var(--c-panel);
  text-align: left;
}
</style>