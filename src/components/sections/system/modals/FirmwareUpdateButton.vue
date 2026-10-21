<template>
  <div v-show="inline || this.shouldShowUpdateButton()">
    <BigButton v-if="!inline" id="firmware_update_button" ref="firmware_update_button"
               :title="updateButtonTitle"
               @button-clicked="handleButtonClick"
    >
      <font-awesome-icon icon="fa-solid fa-download" />
    </BigButton>
    <AccessibleModal :inline="inline" id="firmware_update_modal" ref="firmware_update_modal" width="620px" :show_footer=false>
      <template v-slot:title>{{ inline ? $t('message.system.menu.firmware') : updateButtonTitle }}</template>

      <!-- As a page (System menu): the state, what's new, then the actions -->
      <div v-if="inline" class="settings-page">
        <p class="page-intro">{{ $t('message.system.pages.firmware.intro') }}</p>

        <SettingsCard>
          <div class="fw-status">
            <span class="fw-icon" :class="firmwareState()" aria-hidden="true">
              <font-awesome-icon :icon="firmwareState() === 'outdated' ? 'fa-solid fa-arrow-up' : (firmwareState() === 'unknown' ? 'fa-solid fa-question' : 'fa-solid fa-check')"/>
            </span>
            <div>
              <div class="fw-headline">{{ $t(`message.system.pages.firmware.state.${firmwareState()}`) }}</div>
              <div class="fw-sub">{{ $t(isDeviceMini() ? 'message.system.pages.firmware.mini' : 'message.system.pages.firmware.full') }}</div>
            </div>
          </div>
          <dl class="fw-versions">
            <div><dt>{{ $t('message.system.pages.firmware.installed') }}</dt><dd>{{ getCurrentFirmwareVersion() }}</dd></div>
            <div><dt>{{ $t('message.system.pages.firmware.latest') }}</dt><dd>{{ isLatestFirmwareAvailable() ? getLatestFirmwareInfo().version.join('.') : '—' }}</dd></div>
            <div><dt>{{ $t('message.system.pages.firmware.channel') }}</dt><dd>{{ isBetaUpdateSite() ? $t('message.system.settings.firmwareSources.beta') : $t('message.system.settings.firmwareSources.live') }}</dd></div>
          </dl>
        </SettingsCard>

        <SettingsCard v-if="isLatestFirmwareAvailable() && getLatestFirmwareInfo().change_log"
                      :title="$t('message.system.firmwareUpdate.changelog', {version: getLatestFirmwareInfo().version.join('.')})">
          <p class="fw-changelog">{{ changelogBody() }}</p>
        </SettingsCard>

        <p class="fw-warning" role="note">
          <font-awesome-icon icon="fa-solid fa-triangle-exclamation" aria-hidden="true"/>
          <span>
            {{ $t('message.system.firmwareUpdate.warning') }}
            <a href="https://github.com/GoXLR-on-Linux/goxlr-utility/wiki/Firmware-Updating" target="_blank" rel="noopener">{{ $t('message.system.firmwareUpdate.warningInfo') }}</a>
            <template v-if="isBetaUpdateSite()"><br>{{ $t('message.system.firmwareUpdate.betaWarning') }}</template>
          </span>
        </p>

        <SettingsCard>
          <div class="fw-actions">
            <span class="fw-hint">{{ $t({outdated: 'message.system.pages.firmware.hintUpdate', newer: 'message.system.pages.firmware.hintDowngrade'}[firmwareState()] || 'message.system.pages.firmware.hintReinstall') }}</span>
            <button type="button" class="settings-action" @click="confirmFlash(true)">{{ $t('message.system.firmwareUpdate.customButton') }}</button>
            <button v-if="isLatestFirmwareAvailable() && compareCurrentFirmwareToLatest() < 0" type="button" class="settings-action primary" @click="confirmFlash(false)">
              {{ $t('message.system.firmwareUpdate.updateTo', { version: getLatestFirmwareInfo().version.join('.') }) }}
            </button>
            <button v-else-if="isLatestFirmwareAvailable()" type="button" class="settings-action" @click="confirmFlash(false)">
              {{ $t(firmwareState() === 'newer' ? 'message.system.firmwareUpdate.downgradeTo' : 'message.system.firmwareUpdate.reinstall', { version: getLatestFirmwareInfo().version.join('.') }) }}
            </button>
          </div>
        </SettingsCard>
      </div>

      <template v-else>
      <p class="firmwareWarning">
        {{ $t('message.system.firmwareUpdate.warning') }}
        <a
            href="https://github.com/GoXLR-on-Linux/goxlr-utility/wiki/Firmware-Updating"
            target="_blank"
        >{{ $t('message.system.firmwareUpdate.warningInfo') }}</a>
      </p>

      <p class="firmwareBetaWarning" v-if="!customFirmware && isBetaUpdateSite()">
        {{ $t('message.system.firmwareUpdate.betaWarning') }}
      </p>

      <p v-if="customFirmware && !inline">
        {{ $t('message.system.firmwareUpdate.customFirmware') }}
      </p>
      <p v-else-if="!isLatestFirmwareAvailable()">
        {{ $t('message.system.firmwareUpdate.noInfo', { currentVersion: getCurrentFirmwareVersion() }) }}
      </p>
      <p v-else-if="compareCurrentFirmwareToLatest() < 0">
        {{ $t('message.system.firmwareUpdate.newVersionAvailable', { latestVersion: getLatestFirmwareInfo().version.join('.') }) }}

        <p class="changelog">
          Version {{ getLatestFirmwareInfo().version.join('.') }} Changelog:<br>
          {{ getLatestFirmwareInfo().change_log }}
        </p>
      </p>
      <p v-else-if="compareCurrentFirmwareToLatest() > 0">
        {{ $t('message.system.firmwareUpdate.currentVersionIsNewer', {currentVersion: getCurrentFirmwareVersion(), latestVersion: getLatestFirmwareInfo().version.join('.') }) }}
      </p>
      <p v-else>
        {{ $t('message.system.firmwareUpdate.currentIsUpToDate', { latestVersion: getLatestFirmwareInfo().version.join('.') }) }}

        <p class="changelog">
          {{ $t('message.system.firmwareUpdate.changelog', {version: getLatestFirmwareInfo().version.join('.')}) }}<br>
          {{ getLatestFirmwareInfo().change_log }}
        </p>
      </p>

      <div class="modalButtonBox">
        <button @click="startFirmwareUpdate">{{$t('message.modalButtons.continue')}}</button>
        <button class="cancel" @click="$refs.firmware_update_modal.closeModal()">{{$t('message.modalButtons.cancel')}}</button>
      </div>
      </template>
    </AccessibleModal>

    <AccessibleModal v-if="inline" ref="flashConfirm" id="firmware_flash_confirm" :show_close="false">
      <template v-slot:title>{{ $t('message.system.firmwareUpdate.confirmTitle') }}</template>
      <template v-slot:default>
        <p>{{ customFirmware ? $t('message.system.firmwareUpdate.confirmCustom') : $t('message.system.firmwareUpdate.confirmText') }}</p>
        <p v-if="!customFirmware && firmwareState() === 'newer'">{{ $t('message.system.firmwareUpdate.confirmDowngrade', { current: getCurrentFirmwareVersion(), version: getLatestFirmwareInfo().version.join('.') }) }}</p>
      </template>
      <template v-slot:footer>
        <ModalButton ref="flashOk" @click="$refs.flashConfirm.closeModal(); startFirmwareUpdate()">{{ $t('message.modalButtons.continue') }}</ModalButton>
        <ModalButton @click="$refs.flashConfirm.closeModal()">{{ $t('message.modalButtons.cancel') }}</ModalButton>
      </template>
    </AccessibleModal>
  </div>
</template>

<script>
import {store} from "@/store";
import {isDeviceMini, versionNewerOrEqualTo} from "@/util/util";
import {uploadFirmwareBlob, websocket} from "@/util/sockets";
import AccessibleModal from "@/components/design/modal/AccessibleModal.vue";
import BigButton from "@/components/buttons/BigButton.vue";
import ModalButton from "@/components/design/modal/ModalButton.vue";
import SettingsCard from "@/components/sections/system/settings/SettingsCard.vue";

export default {
  props: {
    // Shows the content in place (System section) instead of a button opening a dialog
    inline: {type: Boolean, default: false},
  },
  name: "FirmwareUpdateButton",
  components: {SettingsCard, ModalButton, BigButton, AccessibleModal},

  data() {
    return {
      setupTitle: "Update Firmware",
      customFirmware: false,
      lastCtrlKeyState: false,
      lastShiftKeyState: false,
      lastButtonVisibility: false,
      updateButtonTitle: "Title",
    }
  },

  mounted() {
    window.addEventListener("keydown", this.handleNewKeyStateEvent);
    window.addEventListener("keyup", this.handleNewKeyStateEvent);

    // initial update button title
    this.updateButtonTitle = this.getNewUpdateButtonTitle();
  },

  methods: {
    handleNewKeyStateEvent(e) {
      if (!(["Control", "Shift"].includes(e.key))) return;
      // true = down, false = up

      if (e.key === "Shift") {
        if (e.type === "keydown" && this.lastShiftKeyState) return;
        else if (e.type === "keyup" && !this.lastShiftKeyState) return;

        this.lastShiftKeyState = e.type === "keydown";
      };

      if (e.key === "Control") {
        if (e.type === "keydown" && this.lastCtrlKeyState) return;
        else if (e.type === "keyup" && !this.lastCtrlKeyState) return;

        this.lastCtrlKeyState = e.type === "keydown";
      };

      this.updateButtonTitle = this.getNewUpdateButtonTitle();
    },

    isDeviceMini,

    // The change log, without its first line when it only repeats the version ("1.4.3.110:")
    changelogBody() {
      const lines = this.getLatestFirmwareInfo().change_log.trim().split("\n");
      const version = this.getLatestFirmwareInfo().version.join('.');
      if (lines.length > 1 && lines[0].trim().replace(/:$/, "") === version) {
        lines.shift();
      }
      return lines.join("\n").trim();
    },

    // up to date, an update to install, or nothing known (no update information)
    firmwareState() {
      if (!this.isLatestFirmwareAvailable()) return "unknown";
      const order = this.compareCurrentFirmwareToLatest();
      if (order < 0) return "outdated";
      if (order > 0) return "newer";
      return "current";
    },

    isBetaUpdateSite() {
        return store.getConfig() === undefined || store.getConfig().firmware_source === "Beta";
    },

    getNewUpdateButtonTitle() {
      if (this.$refs.firmware_update_modal?.isOpen())
        return this.updateButtonTitle; // don't change the title if the modal is already open

      if (this.$t === undefined)
        return;

      if (this.lastCtrlKeyState && this.lastShiftKeyState)
        return this.$t('message.system.firmwareUpdateButton.custom'); // custom firmware if both keys are pressed
      else if (this.compareCurrentFirmwareToLatest() < 0)
        return this.$t('message.system.firmwareUpdateButton.update'); // update if firmware is older
      else if (this.compareCurrentFirmwareToLatest() > 0)
        return this.$t('message.system.firmwareUpdateButton.downgrade'); // downgrade if firmware is newer
      else if (this.lastCtrlKeyState && !this.lastShiftKeyState && this.isLatestFirmwareAvailable())
        return this.$t('message.system.firmwareUpdateButton.reinstall'); // reinstall if only ctrl is pressed and firmware servers are available
    },

    shouldShowUpdateButton() {
      const updateButtonTitle = this.getNewUpdateButtonTitle();
      const newState = updateButtonTitle !== undefined || this.$refs.firmware_update_modal?.isOpen();

      // this is a workaround to prevent the button from being empty when the user switches firmware release channels.
      // we are working against vues reactive system here by registering a global keydown/keyup event listener and
      // cannot rely on computed properties to update the button title, so this is the next best thing.
      if (newState !== this.lastButtonVisibility) {
        this.lastButtonVisibility = newState;
        this.updateButtonTitle = updateButtonTitle;
      }

      return newState;
    },

    handleButtonClick() {
      this.customFirmware = this.lastCtrlKeyState && this.lastShiftKeyState;
      this.$refs.firmware_update_modal.openModal(undefined, this.$refs.firmware_update_button)
    },

    isLatestFirmwareAvailable() {
      // tc-helicon took the update servers offline, so the update check is kinda useless.
      // to prevent issues during development, we will need to check for null values here.
      return store.getConfig().latest_firmware.Mini !== null
          && store.getConfig().latest_firmware.Full !== null;
    },

    // checks if the current firmware is older (-1), equal (0) or newer (1) than the latest firmware
    compareCurrentFirmwareToLatest() {
      if (store.getConfig() === undefined || store.getActiveDevice() === undefined)
        return 0;

      if (!this.isLatestFirmwareAvailable())
        return 0;

      const latestVersion = isDeviceMini()
        ? store.getConfig().latest_firmware.Mini.version
        : store.getConfig().latest_firmware.Full.version;
      const currentVersion = store.getActiveDevice().hardware.versions.firmware;

      if (!versionNewerOrEqualTo(currentVersion, latestVersion))
        return -1; // current firmware is older

      return latestVersion.join('.') === currentVersion.join('.')
          ? 0 // current firmware is equal
          : 1; // current firmware is newer
    },

    getLatestFirmwareInfo() {
      if (store.getConfig() === undefined || store.getActiveDevice() === undefined || !this.isLatestFirmwareAvailable()) {
        // vue does not like null values during render.
        // when the tc-helicon update servers are not available, we just return empty values
        return {
          change_log: "",
          version: []
        };
      }

      return isDeviceMini()
          ? store.getConfig().latest_firmware.Mini
          : store.getConfig().latest_firmware.Full;
    },


    getCurrentFirmwareVersion() {
      if (store.getActiveDevice() === undefined)
        return false;

      return store.getActiveDevice().hardware.versions.firmware.join('.');
    },

    // Asks before flashing: the latest firmware, or a file chosen next (custom)
    confirmFlash(custom) {
      this.customFirmware = custom;
      this.$refs.flashConfirm.openModal(this.$refs.flashOk);
    },

    startFirmwareUpdate() {
      if (store.getConfig() === undefined || store.getActiveDevice() === undefined)
        return false;

      if (this.customFirmware) {
        // custom firmware upload
        this.selectFirmwareFile()
            .then(result => {
              this.$refs.firmware_update_modal.closeModal();
              // The daemon answers {"Error": ..} when it refuses the file (too big, unknown device)
              uploadFirmwareBlob(result, store.getActiveDevice().hardware.serial_number)
                  .then(data => {
                    if (data && data.Error !== undefined) store.addToast("error", data.Error);
                  })
                  .catch(error => store.addToast("error", String(error)));
            })
            .catch(() => this.$refs.firmware_update_modal.closeModal());
      }
      else
      {
        // normal firmware update
        this.$refs.firmware_update_modal.closeModal();
        websocket.run_firmware_update(store.getActiveDevice().hardware.serial_number, null, true);
      }
    },

    selectFirmwareFile() {
      return new Promise((resolve, reject) => {
        const filePickerDialog = document.createElement('input');
        filePickerDialog.type = 'file';
        filePickerDialog.accept = '.bin';
        filePickerDialog.oncancel = () => reject("Operation cancelled by user");
        filePickerDialog.onchange = () => {
          // read the file as an ArrayBuffer
          const reader = new FileReader();
          reader.onloadend = event =>
              resolve(new Blob([event.target.result], { type: "application/octet-stream" }));
          reader.readAsArrayBuffer(filePickerDialog.files[0])
        }
        filePickerDialog.click();
      });
    },
  }
}
</script>

<style scoped>
.fw-status {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
}

.fw-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  flex: none;
  border-radius: 50%;
  background-color: color-mix(in srgb, var(--c-ok) 18%, transparent);
  color: var(--c-ok);
  font-size: 18px;
}

.fw-icon.outdated {
  background-color: var(--c-accent-dim);
  color: var(--c-accent-light);
}

.fw-icon.unknown {
  background-color: var(--c-raised);
  color: var(--c-muted);
}

.fw-headline {
  font-size: 17px;
  font-weight: 600;
  color: var(--c-text);
}

.fw-sub {
  color: var(--c-muted);
}

.fw-versions {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin: 0;
}

.fw-versions div {
  padding: 14px 20px;
  border-left: 1px solid var(--c-line);
}

.fw-versions div:first-child {
  border-left: none;
}

.fw-versions dt {
  font-size: 12px;
  color: var(--c-muted);
}

.fw-versions dd {
  margin: 0;
  font-family: var(--f-mono);
  font-size: 15px;
  color: var(--c-text);
}

.fw-changelog {
  margin: 0;
  padding: 4px 20px 18px;
  white-space: pre-line;
  color: var(--c-text-soft);
}

.fw-warning {
  display: flex;
  gap: 12px;
  margin: 0;
  padding: 14px 16px;
  border: 1px solid color-mix(in srgb, var(--c-warn) 40%, transparent);
  border-radius: 8px;
  background-color: color-mix(in srgb, var(--c-warn) 10%, transparent);
  color: var(--c-text-soft);
  font-size: 13px;
}

.fw-warning svg {
  margin-top: 2px;
  color: var(--c-warn);
}

.fw-warning a {
  color: var(--c-accent);
}

.fw-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  padding: 16px 20px;
}

.fw-hint {
  flex: 1 1 260px;
  color: var(--c-muted);
  font-size: 12.5px;
}

.modalButtonBox {
  display: flex;
  flex-direction: row;
  justify-content: right;
  gap: 5px;

  button.primary {
    background-color: var(--c-accent);
    border-color: var(--c-accent);
    color: var(--c-on-accent);
  }

  button {
    padding: 5px;
    color: var(--c-text-soft);
    border: 1px solid var(--c-line-strong);
    background-color: transparent;
    padding: 4px 8px;
    cursor: pointer;

    &:hover {
      color: var(--c-text);
      border-color: var(--c-text);
    }

    &.cancel {
      border-color: var(--c-danger);

      &:hover {
        border-color: var(--c-danger);
      }
    }
  }
}

.firmwareWarning {
  padding: 10px;
  border-left: 5px solid rgba(204, 0, 0, 0.5);
  background: rgba(204, 0, 0, 0.1);

  a {
    color: var(--c-text);

    &:hover {
      color: var(--c-accent);
    }
  }
}

.firmwareBetaWarning {
  padding: 10px;
  border-left: 5px solid rgba(204, 156, 0, 0.5);
  background: rgba(204, 177, 0, 0.1);
}

.changelog {
  background-color: rgba(0, 0, 0, 0.25);
  padding: 10px;
}

p {
  white-space: pre-line;
}
</style>