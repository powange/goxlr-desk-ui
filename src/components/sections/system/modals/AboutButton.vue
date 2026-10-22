<template>
  <div>
    <BigButton v-if="!inline" id="about_button" ref="button" :title="$t('message.system.aboutButton')"
               @button-clicked="$refs.aboutModal.openModal(undefined, $refs.button)">
      <font-awesome-icon icon="fa-solid fa-circle-info"/>
    </BigButton>
    <AccessibleModal :inline="inline" ref="aboutModal" id="about_modal" :show_footer=false>
      <template v-slot:title>{{ $t('message.system.aboutButton') }}</template>
      <div class="settings-page">
        <p class="page-intro">{{ $t('message.system.pages.about.intro') }}</p>
        <div class="about-grid">
          <SettingsCard :title="$t('message.system.pages.about.device')">
            <dl class="about-list">
              <div><dt>{{ $t('message.system.about.serial') }}</dt><dd>{{ getSerial() }}</dd></div>
              <div><dt>{{ $t('message.system.about.firmware') }}</dt><dd>{{ getFirmwareVersion() }}</dd></div>
              <div><dt>{{ $t('message.system.about.dice') }}</dt><dd>{{ getDice() }}</dd></div>
              <div><dt>{{ $t('message.system.about.fpga') }}</dt><dd>{{ getFPGACount() }}</dd></div>
            </dl>
          </SettingsCard>
          <SettingsCard :title="$t('message.system.pages.about.software')">
            <dl class="about-list">
              <div><dt>{{ $t('message.system.pages.about.utility') }}</dt><dd>{{ getUtilityVersion() }}</dd></div>
              <div><dt>{{ $t('message.system.pages.about.driver') }}</dt><dd>{{ getDriverVersion() }}</dd></div>
            </dl>
          </SettingsCard>
        </div>
        <SettingsCard>
          <div class="about-actions">
            <span>{{ $t('message.system.pages.about.shareHint') }}</span>
            <button type="button" class="settings-action" @click="openLogs()">{{ $t('message.system.pages.settings.openLogs') }}</button>
            <button type="button" class="settings-action" @click="copyVersions()">{{ copied ? $t('message.system.networkAccess.copied') : $t('message.system.pages.about.copy') }}</button>
          </div>
        </SettingsCard>
      </div>
    </AccessibleModal>
  </div>
</template>

<script>
import BigButton from "@/components/buttons/BigButton.vue";
import AccessibleModal from "@/components/design/modal/AccessibleModal.vue";
import {store} from "@/store";
import {websocket} from "@/util/sockets";
import SettingsCard from "@/components/sections/system/settings/SettingsCard.vue";
import { isWindowsDriver } from "@/util/util";

export default {
  props: {
    // Shows the content in place (System section) instead of a button opening a dialog
    inline: {type: Boolean, default: false},
  },
  name: "AboutButton",
  components: {SettingsCard, AccessibleModal, BigButton},

  data() {
    return {
      showModal: false,
      copied: false,
      aboutTitle: "About"
    }
  },

  methods: {
    openLogs() {
      websocket.open_path("Logs");
    },

    // The versions as text, for a bug report or a request for help
    copyVersions() {
      const text = [
        `GoXLR Utility ${this.getUtilityVersion()}`,
        `Driver: ${this.getDriverVersion()}`,
        `Serial: ${this.getSerial()}`,
        `Firmware: ${this.getFirmwareVersion()}, DICE: ${this.getDice()}, FPGA: ${this.getFPGACount()}`,
      ].join("\n");
      navigator.clipboard.writeText(text).then(() => {
        this.copied = true;
        setTimeout(() => this.copied = false, 2000);
      }).catch(() => store.addToast("error", this.$t('message.integrations.copyFailed')));
    },

    getSerial() {
      return store.getActiveSerial();
    },

    getUtilityVersion() {
      return store.getVersion();
    },

    getDriverVersion() {
      let version = this.$t('message.common.unknown');
      if (store.getConfig() === undefined) {
        return version;
      }

      if (store.getConfig().driver_interface.version !== null) {
        version = this.buildVersionString(store.getConfig().driver_interface.version);
      }

      if (isWindowsDriver()) {
        return "TC-Helicon Driver (" + version + ")";
      }
      return "libUSB (" + version + ")";
    },

    getFirmwareVersion() {
      return this.buildVersionString(store.getActiveDevice().hardware.versions.firmware);
    },

    getDice() {
      return this.buildVersionString(store.getActiveDevice().hardware.versions.dice);
    },

    getFPGACount() {
      return store.getActiveDevice().hardware.versions.fpga_count;
    },

    buildVersionString(version) {
      let output = "";
      for (let i =0; i < version.length; i++) {
        if (version[i] == null) {
          return output;
        }
        if (output !== "") {
          output = output + "."
        }
        output = output + version[i];
      }
      return output;
    },
  }
}
</script>

<style scoped>
.about-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  align-items: start;
}

.about-list {
  margin: 0;
}

.about-list div {
  display: flex;
  align-items: baseline;
  gap: 16px;
  padding: 12px 20px;
  border-top: 1px solid var(--c-line);
}

.about-list dt {
  width: 130px;
  flex: none;
  color: var(--c-muted);
}

.about-list dd {
  margin: 0;
  font-family: var(--f-mono);
  font-size: 13.5px;
  color: var(--c-text);
}

.about-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  padding: 16px 20px;
}

.about-actions span {
  flex: 1 1 260px;
  color: var(--c-muted);
  font-size: 12.5px;
}
</style>
