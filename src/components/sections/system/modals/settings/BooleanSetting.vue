<script>
import Toggle from "@/components/design/Toggle.vue";
import SettingRow from "@/components/sections/system/settings/SettingRow.vue";

export default {
  components: {Toggle, SettingRow},
  emits: ['change'],

  name: "BooleanSetting",
  props: {
    label: {type: String, required: true},
    description: {type: String, required: true},
    enabled: {type: Boolean, required: true},
    help: {type: String, default: ""},
    restart: {type: Boolean, default: false},
  },

  methods: {
    onChange() {
      this.$emit('change', !this.enabled);
    },
  }
}
</script>

<template>
  <SettingRow :label="label" :help="help" :restart="restart">
    <Toggle :model-value="enabled" @update:model-value="onChange" :label="label" :aria-description="description"/>
  </SettingRow>
</template>
