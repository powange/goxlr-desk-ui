<template>
  <div v-show="inline || this.shouldShowUpdateButton()">
    <BigButton v-if="!inline" id="firmware_update_button" ref="firmware_update_button"
               :title="updateButtonTitle"
               @button-clicked="handleButtonClick"
    >
      <font-awesome-icon icon="fa-solid fa-download" />
    </BigButton>
    <AccessibleModal :inline="inline" id="firmware_update_modal" ref="firmware_update_modal" width="620px" :show_footer=false>
      <template v-slot:title>{{ updateButtonTitle || $t('message.system.menu.firmware') }}</template>

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

      <!-- As a page (System menu): explicit actions, each confirmed before flashing -->
      <div v-if="inline" class="modalButtonBox">
        <button v-if="isLatestFirmwareAvailable() && compareCurrentFirmwareToLatest() < 0" class="primary" @click="confirmFlash(false)">
          {{ $t('message.system.firmwareUpdate.updateTo', { version: getLatestFirmwareInfo().version.join('.') }) }}
        </button>
        <button v-else-if="isLatestFirmwareAvailable()" @click="confirmFlash(false)">
          {{ $t('message.system.firmwareUpdate.reinstall', { version: getLatestFirmwareInfo().version.join('.') }) }}
        </button>
        <button @click="confirmFlash(true)">{{ $t('message.system.firmwareUpdate.customButton') }}</button>
      </div>
      <div v-else class="modalButtonBox">
        <button @click="startFirmwareUpdate">{{$t('message.modalButtons.continue')}}</button>
        <button class="cancel" @click="$refs.firmware_update_modal.closeModal()">{{$t('message.modalButtons.cancel')}}</button>
      </div>
    </AccessibleModal>

    <AccessibleModal v-if="inline" ref="flashConfirm" id="firmware_flash_confirm" :show_close="false">
      <template v-slot:title>{{ $t('message.system.firmwareUpdate.confirmTitle') }}</template>
      <template v-slot:default>
        <p>{{ customFirmware ? $t('message.system.firmwareUpdate.confirmCustom') : $t('message.system.firmwareUpdate.confirmText') }}</p>
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

export default {
  props: {
    // Shows the content in place (System section) instead of a button opening a dialog
    inline: {type: Boolean, default: false},
  },
  name: "FirmwareUpdateButton",
  components: {ModalButton, BigButton, AccessibleModal},

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
              uploadFirmwareBlob(result, store.getActiveDevice().hardware.serial_number);
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