<template>
  <!-- Short messages in the corner: errors stay until closed, confirmations go after a few seconds.
       Screen readers hear them through the live regions (alert for errors). -->
  <div class="toasts">
    <div v-for="toast in toasts()" :key="toast.id" class="toast" :class="toast.type"
         :role="toast.type === 'error' ? 'alert' : 'status'">
      <font-awesome-icon :icon="toast.type === 'error' ? 'fa-solid fa-circle-exclamation' : 'fa-solid fa-check'"/>
      <span class="text">{{ toast.message }}</span>
      <button type="button" class="close" @click="close(toast.id)" :aria-label="$t('message.common.close')">
        <font-awesome-icon icon="fa-solid fa-xmark"/>
      </button>
    </div>
  </div>
</template>

<script>
import {store} from "@/store";

export default {
  name: "AppToasts",

  methods: {
    toasts() {
      return store.toasts;
    },

    close(id) {
      store.removeToast(id);
    },
  },
}
</script>

<style scoped>
.toasts {
  position: fixed;
  right: 16px;
  bottom: 16px;
  z-index: 200;
  display: grid;
  gap: 8px;
  max-width: min(420px, calc(100vw - 32px));
}

.toast {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid var(--c-line-strong);
  border-left: 4px solid var(--c-ok);
  background-color: var(--c-panel);
  color: var(--c-text);
  font-size: 13px;
  box-shadow: 0 8px 24px var(--c-shadow);
}

.toast.error {
  border-left-color: var(--c-danger);
}

.toast.error > svg {
  color: var(--c-danger);
}

.toast.ok > svg {
  color: var(--c-ok);
}

.text {
  flex: 1;
  white-space: pre-line;
  overflow-wrap: anywhere;
}

.close {
  border: none;
  background: none;
  color: var(--c-muted);
  cursor: pointer;
  padding: 0 2px;
}

.close:hover {
  color: var(--c-text);
}
</style>
