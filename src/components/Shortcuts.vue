<template>
  <!-- Keyboard shortcuts for the frequent actions, listed in a dialog opened with "?" -->
  <AccessibleModal ref="help" id="shortcutsHelp" width="min(520px, 94vw)">
    <template v-slot:title>{{ $t('message.shortcuts.title') }}</template>
    <table class="shortcuts">
      <tbody>
      <tr v-for="row in rows()" :key="row.keys">
        <td><kbd>{{ row.keys }}</kbd></td>
        <td>{{ row.label }}</td>
      </tr>
      </tbody>
    </table>
  </AccessibleModal>
</template>

<script>
import AccessibleModal from "@/components/design/modal/AccessibleModal.vue";
import {store} from "@/store";
import {websocket} from "@/util/sockets";
import {isDeviceMini} from "@/util/util";
import {undoLast} from "@/util/undo";

const PRESETS = ["Preset1", "Preset2", "Preset3", "Preset4", "Preset5", "Preset6"];
const BANKS = {F7: "A", F8: "B", F9: "C"};

export default {
  name: "AppShortcuts",
  components: {AccessibleModal},

  mounted() {
    window.addEventListener("keydown", this.onKeydown);
  },

  unmounted() {
    window.removeEventListener("keydown", this.onKeydown);
  },

  methods: {
    rows() {
      const rows = [
        {keys: "Ctrl+S", label: this.$t('message.shortcuts.save')},
        {keys: "Ctrl+Z", label: this.$t('message.shortcuts.undo')},
        {keys: "M", label: this.$t('message.shortcuts.micMute')},
        {keys: "Ctrl+Shift+1…9", label: this.$t('message.shortcuts.sections')},
      ];
      if (!isDeviceMini()) {
        rows.push({keys: "F1…F6", label: this.$t('message.shortcuts.presets')});
        rows.push({keys: "F7, F8, F9", label: this.$t('message.shortcuts.banks')});
      }
      rows.push({keys: "?", label: this.$t('message.shortcuts.help')});
      return rows;
    },

    // Typing in a field, or a dialog open: the keys are theirs
    ignored(event) {
      const target = event.target;
      if (target && (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName))) return true;
      return document.querySelector(".modal-mask:not([style*='display: none'])") !== null;
    },

    onKeydown(event) {
      if ((event.ctrlKey || event.metaKey) && !event.shiftKey && !event.altKey && event.key.toLowerCase() === "z") {
        if (this.ignored(event) || !store.hasActiveDevice()) return;
        event.preventDefault();
        if (undoLast((serial, command) => websocket.send_command(serial, command))) {
          store.setAccessibilityNotification("polite", this.$t('message.shortcuts.undone'));
        }
        return;
      }
      if (event.ctrlKey || event.altKey || event.metaKey || event.repeat || !store.hasActiveDevice()) return;
      if (this.ignored(event)) return;
      const serial = store.getActiveSerial();
      const device = store.getActiveDevice();

      if (event.key === "?") {
        event.preventDefault();
        this.$refs.help.openModal(undefined, document.activeElement);
      } else if (event.key.toLowerCase() === "m" && !event.shiftKey) {
        if (!device.cough_button.is_toggle) return;
        event.preventDefault();
        const state = device.cough_button.state === "Unmuted" ? "MutedToX" : "Unmuted";
        websocket.send_command(serial, {SetCoughMuteState: state});
      } else if (!isDeviceMini() && /^F[1-6]$/.test(event.key)) {
        event.preventDefault();
        websocket.send_command(serial, {SetActiveEffectPreset: PRESETS[Number(event.key[1]) - 1]});
      } else if (!isDeviceMini() && BANKS[event.key] !== undefined) {
        event.preventDefault();
        websocket.send_command(serial, {SetActiveSamplerBank: BANKS[event.key]});
      }
    },
  },
}
</script>

<style scoped>
.shortcuts {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}

.shortcuts td {
  padding: 6px 4px;
  border-bottom: 1px solid var(--c-line);
}

kbd {
  font-family: var(--f-mono);
  padding: 2px 6px;
  border: 1px solid var(--c-field-border);
  border-radius: 4px;
  background-color: var(--c-raised);
  white-space: nowrap;
}
</style>
