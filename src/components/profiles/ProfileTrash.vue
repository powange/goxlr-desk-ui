<template>
  <p v-if="getItems().length === 0" class="hint">{{ $t('message.profileManager.trashEmpty') }}</p>
  <template v-else>
    <ul class="trash-list">
      <li v-for="item in getItems()" :key="item.id">
        <font-awesome-icon :icon="item.mic ? 'fa-solid fa-microphone-lines' : 'fa-solid fa-file-lines'" fixed-width/>
        <span class="name">{{ item.name }}</span>
        <span class="meta">{{ item.mic ? $t('message.profileManager.trashMic') : $t('message.profileManager.trashProfile') }} · {{ formatDate(item.deleted_at) }}</span>
        <button type="button" class="small" @click="restore(item)">{{ $t('message.sampleManager.restore') }}</button>
        <button type="button" class="small danger" @click="remove(item)">{{ confirmDelete === item.id ? $t('message.sampleManager.deleteForeverConfirm') : $t('message.sampleManager.deleteForever') }}</button>
      </li>
    </ul>
    <button type="button" class="small danger empty" @click="emptyAll">
      {{ confirmEmpty ? $t('message.sampleManager.emptyTrashConfirm') : $t('message.sampleManager.emptyTrash') }}
    </button>
    <p v-if="error" class="error">{{ error }}</p>
  </template>
</template>

<script>
import {store} from "@/store";
import {sendHttpCommand} from "@/util/sockets";

// Deleted profiles and mic profiles (kept 30 days by the daemon), which can be put back.
export default {
  name: "ProfileTrash",

  data() {
    return {
      confirmEmpty: false,
      // The item a second click deletes for good
      confirmDelete: null,
      error: "",
    }
  },

  methods: {
    getItems() {
      return store.getProfileTrash();
    },

    formatDate(seconds) {
      return new Date(seconds * 1000).toLocaleString(this.$i18n.locale.replace("_", "-"));
    },

    send(command) {
      this.error = "";
      sendHttpCommand(store.getActiveSerial(), command).catch(error => {
        this.error = (error && error.Error) ? error.Error : String(error);
      });
    },

    restore(item) {
      this.send({RestoreProfileTrash: item.id});
    },

    // Can't be undone either: a second click confirms
    remove(item) {
      if (this.confirmDelete !== item.id) {
        this.confirmDelete = item.id;
        setTimeout(() => { if (this.confirmDelete === item.id) this.confirmDelete = null; }, 4000);
        return;
      }
      this.confirmDelete = null;
      this.send({EmptyProfileTrash: item.id});
    },

    // A second click confirms
    emptyAll() {
      if (!this.confirmEmpty) {
        this.confirmEmpty = true;
        setTimeout(() => this.confirmEmpty = false, 4000);
        return;
      }
      this.confirmEmpty = false;
      this.send({EmptyProfileTrash: null});
    },
  }
}
</script>

<style scoped>
.trash-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 6px;
}

.trash-list li {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  border: 1px solid var(--c-line);
  border-radius: 6px;
  background-color: var(--c-raised);
  color: var(--c-text);
}

.name {
  font-weight: 600;
}

.meta {
  flex: 1;
  font-size: 12px;
  color: var(--c-muted);
}

.small {
  padding: 4px 10px;
  border: 1px solid var(--c-line-strong);
  border-radius: 6px;
  background: transparent;
  color: var(--c-text);
  font-size: 12px;
  cursor: pointer;
}

.small:hover {
  border-color: var(--c-accent);
}

.small.danger:hover {
  border-color: var(--c-danger);
  color: var(--c-danger);
}

.small:focus-visible {
  outline: 2px solid var(--c-accent);
  outline-offset: 1px;
}

.empty {
  margin-top: 10px;
}

.hint {
  margin: 0;
  color: var(--c-muted);
  font-size: 12px;
}

.error {
  margin: 8px 0 0;
  color: var(--c-danger);
  font-size: 12px;
}
</style>
