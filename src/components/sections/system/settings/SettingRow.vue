<template>
  <!-- One setting: its name and a short help on the left, its control on the right -->
  <div class="setting-row">
    <div class="setting-text">
      <component :is="forId ? 'label' : 'div'" :for="forId || undefined" class="setting-label">
        {{ label }}<span v-if="restart" class="restart">{{ $t('message.system.settings.restartPill') }}</span>
      </component>
      <div v-if="help" class="setting-help">{{ help }}</div>
    </div>
    <div class="setting-control">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "SettingRow",
  props: {
    label: {type: String, required: true},
    help: {type: String, default: ""},
    // The setting applies once the utility is restarted
    restart: {type: Boolean, default: false},
    // The id of the control the label names
    forId: {type: String, default: ""},
  },
}
</script>

<style scoped>
.setting-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px 24px;
  padding: 14px 20px;
}

.setting-text {
  flex: 1 1 280px;
  min-width: 0;
}

.setting-label {
  display: block;
  font-weight: 500;
  color: var(--c-text);
}

.setting-help {
  margin-top: 2px;
  font-size: 12.5px;
  color: var(--c-muted);
}

.restart {
  display: inline-block;
  margin-left: 8px;
  padding: 1px 8px;
  border-radius: 10px;
  background-color: var(--c-accent-dim);
  color: var(--c-accent-light);
  font-size: 11px;
  font-weight: 500;
  vertical-align: 1px;
}

.setting-control {
  flex: 0 1 auto;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  margin-left: auto;
}
</style>
