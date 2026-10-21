<template>
  <div>
    <BigButton
        v-if="!inline && store.getConfig() !== undefined"
        id="settings_button"
        ref="button"
        :title="$t('message.system.settingsButton')"
        @button-clicked="$refs.modal.openModal(undefined, $refs.button)"
    >
      <font-awesome-icon icon="fa-solid fa-gear"/>
    </BigButton>
    <AccessibleModal :inline="inline"
        width="630px"
        ref="modal"
        id="about_modal"
        :show_footer="false"
    >
      <template v-slot:title>{{ $t('message.system.settingsButton') }}</template>

      <div class="settingList" role="region" :aria-label="$t('message.system.settings.settingsRegionAccessibility')">
        <ListSetting :value="getCurrentLanguage()" :options="getLanguageKeys()"
                     :description="$t('message.system.settings.language')"
                     :label="$t('message.system.settings.language')" @change="setUILanguage"/>

        <ListSetting :value="getUIHandler()" :options="getUIHandlerKeys()"
                     :description="$t('message.system.settings.uiHandler')"
                     :label="$t('message.system.settings.uiHandler')" @change="setUIHandler"/>

        <ListSetting :value="getLogLevel()" :options="getLogKeys()" :description="$t('message.system.settings.logLevel')"
                     :label="$t('message.system.settings.logLevel')" @change="setLogLevel"/>

        <ListSetting :value="getFirmwareSource()" :options="getFirmwareSourceKeys()" :description="$t('message.system.settings.firmwareSource')"
                     :label="$t('message.system.settings.firmwareSource')" @change="setFirmwareSource"/>

        <BooleanSetting v-if="is_macos()" :label="$t('message.system.settings.macosAggregateManagement')" :enabled="get_macos_aggregate_management()"
                        @change="set_macos_aggregate_management"
                        :description="$t('message.system.settings.macosAggregateManagementAccessibility')"/>

        <BooleanSetting :label="$t('message.system.settings.allowNetworkAccess')" :enabled="get_allow_network_access()"
                        @change="set_allow_network_access"
                        :description="$t('message.system.settings.allowNetworkAccessAccessibility')"/>
        <NetworkAccessLinks v-if="get_allow_network_access()" :key="String(get_allow_network_access())"/>

        <BooleanSetting :label="$t('message.system.settings.autoStart')" :enabled="isAutostart()"
                        @change="setAutoStart" :description="$t('message.system.settings.autoStartAccessibility')"/>

        <BooleanSetting :label="$t('message.system.settings.showOnLaunch')" :enabled="isShowUi()"
                        @change="setShowUi" :description="$t('message.system.settings.showOnLaunchAccessibility')"/>

        <BooleanSetting :label="$t('message.system.settings.showTray')" :enabled="isShowIcon()"
                        @change="setShowIcon" :description="$t('message.system.settings.showTrayAccessibility')"/>

        <BooleanSetting v-if="isTTSAvailable()" :label="$t('message.system.settings.ttsOnButton')"
                        :enabled="isTTSEnabled()" @change="setTTSEnabled"
                        :description="$t('message.system.settings.ttsOnButtonAccessibility')"/>


        <div class="recoverDefaults" role="group" :aria-label="$t('message.system.settings.recoverDefaults')">
          <div class="label">{{ $t('message.system.settings.recoverDefaults') }}</div>
          <div class="buttons">
            <div>
              <button :ref="'recoverProfiles'" @click="askRecover('Profiles')">
                {{ $t('message.system.settings.recoverOptions.profiles') }}
              </button>
            </div>
            <div>
              <button :ref="'recoverMicProfiles'" @click="askRecover('MicProfiles')">
                {{ $t('message.system.settings.recoverOptions.micProfiles') }}
              </button>
            </div>
            <div>
              <button :ref="'recoverIcons'" @click="askRecover('Icons')">
                {{ $t('message.system.settings.recoverOptions.icons') }}
              </button>
            </div>
            <div>
              <button :ref="'recoverPresets'" @click="askRecover('Presets')">
                {{ $t('message.system.settings.recoverOptions.presets') }}
              </button>
            </div>
          </div>
        </div>

        <div class="shutdownButton">
          <div style="text-align: right">
            <button ref="shutdownButton" class="shutdown" @click="shutdown_util()">
              {{ $t('message.system.settings.shutdownUtility') }}
            </button>
          </div>
        </div>
      </div>
    </AccessibleModal>
    <!-- Restoring only adds the default files that are missing, it never replaces a file -->
    <AccessibleModal ref="recoverConfirm" id="confirm_recover" :show_close="false">
      <template v-slot:title>{{ $t('message.system.settings.recoverConfirmTitle') }}</template>
      <template v-slot:default>{{ $t('message.system.settings.recoverConfirmMessage', {type: recoverLabel()}) }}</template>
      <template v-slot:footer>
        <ModalButton ref="recoverOk" @click="recover_defaults()">{{ $t('message.system.settings.recoverConfirmOk') }}</ModalButton>
        <ModalButton @click="$refs.recoverConfirm.closeModal()">{{ $t('message.sampleManager.cancel') }}</ModalButton>
      </template>
    </AccessibleModal>
    <AccessibleModal ref="shutdownConfirm" id="confirm_shutdown" @modal-close="closeConfirm">
      <template v-slot:title>{{ $t('message.system.settings.shutdownConfirmTitle') }}</template>
      <template v-slot:default>{{ $t('message.system.settings.shutdownConfirmMessage') }}</template>
      <template v-slot:footer>
        <ModalButton @click="isShutdown = true; $refs.shutdownConfirm.closeModal()">{{ $t('message.modalButtons.yes') }}</ModalButton>
        <ModalButton ref="focusNo" @click="$refs.shutdownConfirm.closeModal()">{{ $t('message.modalButtons.no') }}</ModalButton>
      </template>
    </AccessibleModal>
  </div>
</template>

<script>
import AccessibleModal from "@/components/design/modal/AccessibleModal.vue";
import NetworkAccessLinks from "@/components/sections/system/NetworkAccessLinks.vue";
import BigButton from "@/components/buttons/BigButton.vue";
import {store} from "@/store";
import {errorMessage, websocket} from "@/util/sockets";
import {languages} from "@/lang/config";
import BooleanSetting from "@/components/sections/system/modals/settings/BooleanSetting.vue";
import ListSetting from "@/components/sections/system/modals/settings/ListSetting.vue";
import ModalButton from "@/components/design/modal/ModalButton.vue";

export default {
  props: {
    // Shows the content in place (System section) instead of a button opening a dialog
    inline: {type: Boolean, default: false},
  },
  name: "SettingsButton",
  computed: {
    languages() {
      return languages
    },
    store() {
      return store
    }
  },
  components: {NetworkAccessLinks, ModalButton, ListSetting, BooleanSetting, BigButton, AccessibleModal},

  data() {
    return {
      // The defaults waiting for confirmation (Profiles, MicProfiles, Icons or Presets)
      pendingRecover: undefined,
      isShutdown: false,
    }
  },

  methods: {
    isLanguageSupported() {
      if (store.getConfig() === null) {
        return false;
      }
      return store.getConfig().hasOwnProperty("locale");
    },

    getLanguageKeys() {
      let options = [
        {
          key: "-1",
          value: this.$t('message.system.settings.useSystem')
        },
      ];

      for (let locale of Object.keys(languages)) {
        options.push({
          key: locale,
          value: languages[locale]
        })
      }
      return options;
    },

    getLogKeys() {
      return [
        {
          key: "Off",
          value: this.$t('message.system.settings.logLevels.off'),
        },
        {
          key: "Error",
          value: this.$t('message.system.settings.logLevels.error'),
        },
        {
          key: "Warn",
          value: this.$t('message.system.settings.logLevels.warn'),
        },
        {
          key: "Info",
          value: this.$t('message.system.settings.logLevels.info'),
        },
        {
          key: "Debug",
          value: this.$t('message.system.settings.logLevels.debug'),
        },
        {
          key: "Trace",
          value: this.$t('message.system.settings.logLevels.trace'),
        },
      ];
    },

    getFirmwareSourceKeys() {
      return [
        {
          key: "Live",
          value: this.$t('message.system.settings.firmwareSources.live'),
        },
        {
          key: "Beta",
          value: this.$t('message.system.settings.firmwareSources.beta'),
        }
      ]
    },

    getUIHandlerKeys() {
      let options = [];
      options.push({
        key: "browser",
        value: this.$t('message.system.settings.uiHandlers.browser')
      });
      if (this.getAppPath() !== null) {
        options.push({
          key: "app",
          value: this.$t('message.system.settings.uiHandlers.app')
        });
      }
      if (this.isCustomPath()) {
        options.push({
          key: "custom",
          value: this.$t('message.system.settings.uiHandlers.custom')
        });
      }

      return options;
    },

    getUIHandler() {
      if (this.getActivePath() === null) {
        return "browser";
      }
      if (this.isActivePath()) {
        return "app";
      }
      return "custom";
    },

    setUIHandler(value) {
      let newValue = null;
      if (value === "app") {
        newValue = this.getAppPath();
      }
      if (value === "custom") {
        // Do nothing here..
        return;
      }
      websocket.send_daemon_command({"SetActivatorPath": newValue})
    },

    setUILanguage(value) {
      let language = value;
      if (language === "-1") {
        language = null;
      }
      websocket.send_daemon_command({"SetLocale": language}).then(() => {
        if (language === null) {
          language = store.getConfig().locale.system_locale;
        }

        this.$i18n.locale = language;
      });
    },

    getUILanguageIsSystem() {
      if (store.getConfig() === null) {
        return true;
      }

      // If the User Locale is null, defer to the system locale..
      return store.getConfig().locale.user_locale === null;
    },

    getCurrentLanguage() {
      if (store.getConfig() === null) {
        return "-1";
      }

      if (store.getConfig().locale.user_locale === null) {
        return "-1";
      }
      return store.getConfig().locale.user_locale;
    },

    isCurrentLanguage(lang) {
      if (lang === "-1") {
        return this.getUILanguageIsSystem();
      }
      return lang === store.getConfig().locale.user_locale;
    },

    getActivePath() {
      if (store.getConfig() === undefined) {
        return null;
      }
      return store.getConfig().activation.active_path;
    },
    getAppPath() {
      if (store.getConfig() === undefined) {
        return "";
      }
      return store.getConfig().activation.app_path;
    },
    isCustomPath() {
      if (store.getConfig() === undefined) {
        return false;
      }
      let active_path = store.getConfig().activation.active_path;
      return (active_path !== null && !this.isActivePath());
    },
    isActivePath() {
      if (store.getConfig() === undefined || this.getActivePath() === null) {
        return false;
      }
      // Thanks to Windows Case-Insensitive paths :D
      return this.getActivePath().localeCompare(this.getAppPath(), undefined, {sensitivity: 'base'}) === 0;
    },

    getLogLevel() {
      if (store.getConfig() === undefined) {
        return "Debug";
      }
      return store.getConfig().log_level;
    },
    setLogLevel(value) {
      websocket.send_daemon_command({"SetLogLevel": value});
    },

    getFirmwareSource() {
      if (store.getConfig() === undefined) {
        return "Live";
      }
      return store.getConfig().firmware_source;
    },
    setFirmwareSource(value) {
      websocket.send_daemon_command({"SetFirmwareSource": value});
    },

    openLogs() {
      websocket.open_path("Logs");
    },

    get_allow_network_access() {
      if (store.getConfig() === undefined) {
        return false;
      }
      return store.getConfig().allow_network_access;
    },

    set_allow_network_access(value) {
      websocket.send_daemon_command({"SetAllowNetworkAccess": value});
    },

    get_macos_aggregate_management() {
      if (store.getConfig() === undefined) {
        return true;
      }
      return !store.getConfig().handle_macos_aggregates;
    },

    set_macos_aggregate_management(value) {
      websocket.send_daemon_command({"HandleMacOSAggregates": !value});
    },

    isAutostart() {
      if (store.getConfig() === undefined) {
        return false;
      }

      return store.getConfig().autostart_enabled;
    },

    setAutoStart(value) {
      websocket.send_daemon_command({"SetAutoStartEnabled": value});
    },

    isShowUi() {
      if (store.getConfig() === undefined) {
        return false;
      }

      return store.getConfig().open_ui_on_launch;
    },

    setShowUi(value) {
      websocket.send_daemon_command({"SetUiLaunchOnLoad": value});
    },

    isShowIcon() {
      if (store.getConfig() === undefined) {
        return true;
      }

      return store.getConfig().show_tray_icon;
    },

    setShowIcon(value) {
      websocket.send_daemon_command({"SetShowTrayIcon": value});
    },

    isTTSAvailable() {
      if (store.getConfig() === undefined) {
        return false;
      }

      return store.getConfig().tts_enabled !== null;
    },

    isTTSEnabled() {
      return store.getConfig().tts_enabled;
    },

    setTTSEnabled(value) {
      websocket.send_daemon_command({"SetTTSEnabled": value});
    },

    recoverLabel() {
      const keys = {Profiles: "profiles", MicProfiles: "micProfiles", Icons: "icons", Presets: "presets"};
      return this.pendingRecover ? this.$t(`message.system.settings.recoverOptions.${keys[this.pendingRecover]}`) : "";
    },

    askRecover(type) {
      this.pendingRecover = type;
      this.$refs.recoverConfirm.openModal(this.$refs.recoverOk, this.$refs[`recover${type}`]);
    },

    recover_defaults() {
      const label = this.recoverLabel();
      this.$refs.recoverConfirm.closeModal();
      websocket.send_daemon_command({"RecoverDefaults": this.pendingRecover})
          .then(() => store.addToast("ok", this.$t('message.system.settings.recoverDone', {type: label})))
          .catch(error => store.addToast("error", errorMessage(error)));
    },

    closeConfirm() {
      if (this.isShutdown) {
        this.isShutdown = false;
        websocket.send_daemon_command("StopDaemon");
      } else if (this.inline) {
        // Shown in place: there's no dialog to reopen, go back to the button
        this.$nextTick(() => this.$refs.shutdownButton.focus());
      } else {
        this.$refs.modal.openModal(this.$refs.shutdownButton);
      }
    },

    shutdown_util() {
      this.$refs.modal.closeModal();
      this.$nextTick(() => {
        this.$refs.shutdownConfirm.openModal(this.$refs.focusNo);
      });
    },

    // It annoys me that this has to exist... but it is what it is :D
    is_macos() {
      if (store.getConfig() === undefined) {
        return true;
      }


      // Based on https://doc.rust-lang.org/std/env/consts/constant.OS.html - It's not my fault if it doesn't work!
      return store.getConfig().platform === "macos";
    }
  },
};
</script>

<style scoped>
.settingList > :nth-child(odd) {
  background-color: var(--c-raised);
}

.settingList > :nth-child(even) {
  background-color: var(--c-bg);
}

.recoverDefaults {
  display: flex;
  height: 20px;
  padding: 10px;
}

.recoverDefaults .label {
  margin: auto;
  width: 100%;
  color: var(--c-text-soft);
}

.recoverDefaults .buttons {
  display: flex;
  gap: 10px;
}

.recoverDefaults .buttons div button {
  white-space: nowrap;
  border: 1px solid var(--c-line-strong);
  background-color: transparent;
  color: var(--c-text-soft);
  padding: 3px 8px;
  cursor: pointer;
}

.recoverDefaults .buttons div button:hover {
  border: 1px solid var(--c-text);
  color: var(--c-text);
}

.shutdownButton {
  margin: auto;
  padding: 5px;
}

.shutdownButton .shutdown {
  color: var(--c-text-soft);
  border: 1px solid var(--c-danger);
  background-color: transparent;
  padding: 4px;
}

.shutdownButton .shutdown:hover {
  cursor: pointer;
  color: var(--c-text);
  border: 1px solid var(--c-danger);
}


</style>
