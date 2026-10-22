<template>
  <div id="main">
    <DeviceSelector v-if="!isDeviceSet()"/>
    <!-- The interface stays in place, covered, until the connection comes back -->
    <div v-if="isDeviceSet() && isReconnecting()" class="reconnecting" role="alert">
      <span>{{ $t('message.deviceSelector.reconnecting') }}</span>
    </div>
    <template v-if="isDeviceSet()">
      <Tabs ref="device-tabs" vertical shortcuts @on-change="onTabChange" :label="$t('message.navigation.accessibilityDeviceSection')">
        <template #nav-top>
          <div class="brand">
            <svg class="brand-logo" width="28" height="28" viewBox="0 0 64 64" aria-hidden="true"><rect x="2" y="2" width="60" height="60" rx="14" fill="#0d1416"/><g stroke="#34474b" stroke-width="3.5" stroke-linecap="round"><line x1="17" y1="14" x2="17" y2="50"/><line x1="27" y1="14" x2="27" y2="50"/><line x1="37" y1="14" x2="37" y2="50"/><line x1="47" y1="14" x2="47" y2="50"/></g><g fill="#4cc3c6"><rect x="12" y="31" width="10" height="7" rx="2"/><rect x="22" y="19" width="10" height="7" rx="2"/><rect x="32" y="37" width="10" height="7" rx="2"/><rect x="42" y="25" width="10" height="7" rx="2"/></g></svg>
            <span class="brand-text">
              <span class="brand-name"><span class="brand-device">GoXLR </span><b>Desk</b></span>
              <span class="brand-note">{{ $t('message.brand.unofficial') }}</span>
            </span>
          </div>
        </template>
        <template #nav-bottom>
          <AppButton variant="link" class="shortcuts-link" @click="$refs.shortcuts.$refs.help.openModal(undefined, $event.currentTarget)">
            <font-awesome-icon icon="fa-solid fa-keyboard"/>
            <span>{{ $t('message.shortcuts.title') }}</span>
            <kbd class="key">?</kbd>
          </AppButton>
          <div class="theme-switch">
            <SegmentedControl :options="getThemeOptions()" :selected="themeMode" @selection-changed="changeTheme"
                              :label="$t('message.theme.label')"/>
          </div>
          <div class="device-status">
            <span class="device-name"><span class="dot" aria-hidden="true"></span>{{ getDeviceName() }}</span>
            <span class="device-detail">{{ getSerial() }}</span>
            <!-- The app's version, under the device (below the page it made a scroll bar) -->
            <VersionCheck @firmware-click="onFirmwareClicked" />
          </div>
        </template>
        <template #header>
          <TopBar :active-zone="activeZone" :visualiser-open="visualiserOpen" @toggle-visualiser="toggleVisualiser"/>
          <div v-show="visualiserOpen" class="visualiser-panel" aria-hidden="true">
            <GoXLRVisualiser :highlighted-areas="this.visualiserHighlightAreas" @area-click="onAreaClicked"
                             @sample-drop="onSampleDrop"/>
          </div>
        </template>

        <Tab id="mixer" icon="fa-solid fa-sliders" :name="$t('message.navigation.mixer')" selected>
          <ContentContainer>
            <Mixer ref="mixer"/>
          </ContentContainer>
        </Tab>
        <Tab id="mic" icon="fa-solid fa-microphone-lines" :name="$t('message.navigation.microphone')">
          <Mic ref="mic"/>
        </Tab>
        <Tab id="effects" v-if="!isDeviceMini()" icon="fa-solid fa-wand-magic-sparkles" :name="$t('message.navigation.effects')">
          <EffectsTab ref="effects" @on-effect-preset-change="onEffectPresetChange"/>
        </Tab>
        <Tab id="sampler" v-if="!isDeviceMini()" icon="fa-solid fa-table-cells-large" :name="$t('message.navigation.sampler')">
          <div class="sampler-page">
            <Panel :title="$t('message.navigation.samples')" class="sampler-library">
              <SampleHandler/>
            </Panel>
            <div class="sampler-device">
              <SamplerTab ref="sampler" @on-sample-bank-change="onSampleBankChange" @sample-drop="onSampleDrop"/>
            </div>
          </div>
        </Tab>
        <Tab id="routing" icon="fa-solid fa-shuffle" :name="$t('message.navigation.routing')">
          <ContentContainer>
            <Routing/>
          </ContentContainer>
        </Tab>

        <Tab id="profiles" icon="fa-solid fa-file-lines" :group="$t('message.navigation.library')" :name="$t('message.navigation.profiles')">
          <div class="library">
            <Panel :title="$t('message.navigation.profiles')">
              <ProfileHandler/>
            </Panel>
            <Panel :title="$t('message.microphone.profiles.title')">
              <MicProfileHandler bare/>
            </Panel>
            <Panel :title="$t('message.profileManager.trashTitle')">
              <ProfileTrash/>
            </Panel>
          </div>
        </Tab>

        <Tab id="system" icon="fa-solid fa-gear" :group="$t('message.navigation.application')" :name="$t('message.navigation.system')">
          <div class="system-wrap">
            <SystemComponent/>
          </div>
        </Tab>
      </Tabs>
    </template>
    <Language v-if="!utilitySupportsLanguages()" />
    <A11yNotifications/>
    <AppToasts/>
    <AppShortcuts v-if="isDeviceSet()" ref="shortcuts"/>
    <SetupWizard v-if="isDeviceSet() && !isReconnecting()" ref="setupWizard" @open-section="id => $refs['device-tabs'].selectTabById(id)"/>

    <AccessibleModal id="firmware_update_progress_modal" ref="firmware_update_progress_modal" width="620px" :show_footer=false :show_close=false>
      <template v-slot:title>{{$t('message.system.firmwareUpdate.title')}}</template>

      <div v-if="getFirmwareUpdateState() == 'Pause'">
        {{ $t('message.system.firmwareUpdate.updatePaused', {version: getFirmwareTargetVersion()}) }}

        <ProgressBar
            :progress="getUpdateProgress()"
            :status_message="getFirmwareUpdateStateLocalized()"
            status_position="top"
        />

        <div class="modalButtonBox">
          <AppButton variant="primary" @click="continueFirmwareUpdate">{{$t('message.modalButtons.continue')}}</AppButton>
          <AppButton variant="danger" @click="completeFirmwareUpdate">{{$t('message.modalButtons.cancel')}}</AppButton>
        </div>
      </div>

      <div v-else-if="getFirmwareUpdateState() == 'Complete'">
        {{ $t('message.system.firmwareUpdate.completed') }}

        <ProgressBar
            :progress="getUpdateProgress()"
            :status_message="getFirmwareUpdateStateLocalized()"
            status_position="top"
        />

        <div class="modalButtonBox">
          <AppButton @click="completeFirmwareUpdate">{{$t('message.modalButtons.close')}}</AppButton>
        </div>
      </div>

      <div v-else-if="getFirmwareUpdateState() == 'Failed'">
        {{ $t('message.system.firmwareUpdate.failed') }}
        <p v-if="firmwareError()" class="firmware-error">{{ firmwareError() }}</p>
        <p class="firmware-hint">{{ $t('message.system.firmwareUpdate.seeLogs') }}</p>

        <ProgressBar
            :progress="getUpdateProgress()"
            :status_message="getFirmwareUpdateStateLocalized()"
            status_position="top"
        />

        <div class="modalButtonBox">
          <AppButton @click="completeFirmwareUpdate">{{$t('message.modalButtons.close')}}</AppButton>
        </div>
      </div>

      <div v-else>
        {{ $t('message.system.firmwareUpdate.updateInProgress') }}

        <ProgressBar
            :progress="getUpdateProgress()"
            :status_message="getFirmwareUpdateStateLocalized()"
            status_position="top"
        />
      </div>

      <!--<textarea :value="JSON.stringify(firmwareUpdateStatus, null, 2)"></textarea>-->

    </AccessibleModal>

    <SampleAssignModal v-if="isDeviceSet() && !isDeviceMini()" ref="sampleAssign"/>
  </div>
</template>

<script>
import A11yNotifications from "./A11yNotifications.vue";
import AppToasts from "./Toasts.vue";
import AppShortcuts from "./Shortcuts.vue";
import SetupWizard from "./SetupWizard.vue";
import Mixer from "./sections/Mixer.vue";
import Tabs from "@/components/tabs/Tabs.vue";
import AppButton from "@/components/design/AppButton.vue";
import Tab from "@/components/tabs/Tab.vue";
import Routing from "@/components/sections/Routing.vue";
import Mic from "@/components/sections/Mic.vue";
import DeviceSelector from "@/components/sections/DeviceSelector.vue";
import {store} from "@/store";
import {runWebsocket, websocket} from "@/util/sockets";
import SystemComponent from "@/components/sections/System.vue";
import TopBar from "@/components/TopBar.vue";
import SegmentedControl from "@/components/design/SegmentedControl.vue";
import {getThemeMode, setThemeMode} from "@/util/theme";
import Panel from "@/components/design/Panel.vue";
import ProfileHandler from "@/components/profiles/handlers/ProfileHandler.vue";
import MicProfileHandler from "@/components/profiles/handlers/MicProfileHandler.vue";
import ProfileTrash from "@/components/profiles/ProfileTrash.vue";
import SampleHandler from "@/components/sections/files/SampleHandler.vue";
import EffectsTab from "@/components/sections/EffectsTab.vue";
import {isDeviceMini} from "@/util/util";
import SamplerTab from "@/components/sections/SamplerTab.vue";
import SampleAssignModal from "@/components/sections/sampler/SampleAssignModal.vue";
import ContentContainer from "@/components/containers/ContentContainer.vue";
import GoXLRVisualiser from "@/components/visualisation/GoXLRVisualiser.vue";
import VersionCheck from "@/components/VersionCheck.vue";
import {HighlightArea} from "@/components/visualisation/VisualiserHelper";
import Language from "@/components/Language.vue";
import AccessibleModal from "@/components/design/modal/AccessibleModal.vue";
import ProgressBar from "@/components/design/ProgressBar.vue";

// Whether the large GoXLR drawing is shown, remembered between sessions (open by default).
function loadVisualiserOpen() {
  try {
    return localStorage.getItem("visualiserOpen") !== "false";
  } catch (e) {
    return true;
  }
}

// The device zone shown on the top bar map for each section.
const SECTION_ZONES = {mixer: "faders", mic: "mic", effects: "effects", sampler: "sampler"};

export default {
  name: "GoXLR",
  expose: ['openFirmwareUpdateProgressModal'],
  components: {
    AppButton,
    ProgressBar,
    AccessibleModal,
    Language,
    VersionCheck,
    GoXLRVisualiser,
    A11yNotifications,
    AppToasts,
    AppShortcuts,
    SetupWizard,
    ContentContainer,
    SamplerTab,
    SampleAssignModal,
    EffectsTab,
    TopBar,
    SegmentedControl,
    Panel,
    ProfileHandler,
    MicProfileHandler,
    ProfileTrash,
    SampleHandler,
    SystemComponent,
    DeviceSelector,
    Routing,
    Tab,
    Tabs,
    Mixer,
    Mic,
  },

  computed: {
    deviceShown() {
      return this.isDeviceSet();
    },
    firmwareUpdateStatus() {
      const updateState = store.status.firmware;

      if (this.$refs.firmware_update_progress_modal === undefined)
        return updateState;

      // open progress modal if there is an update in progress
      const isPerformingUpdate = updateState !== undefined && Object.keys(updateState).length > 0;
      if (isPerformingUpdate && !this.$refs.firmware_update_progress_modal.isOpen()) {
        this.$refs.firmware_update_progress_modal.openModal(undefined, undefined);
      } else if (!isPerformingUpdate && this.$refs.firmware_update_progress_modal.isOpen()){
        this.$refs.firmware_update_progress_modal.closeModal();
      }

      return updateState;
    }
  },

  data() {
    return {
      visualiserHighlightAreas: [],
      activeZone: "faders",
      visualiserOpen: loadVisualiserOpen(),
      themeMode: getThemeMode(),
    }
  },

  methods: {
    isDeviceMini,

    toggleVisualiser() {
      this.visualiserOpen = !this.visualiserOpen;
      try {
        localStorage.setItem("visualiserOpen", String(this.visualiserOpen));
      } catch (e) {
        // Storage can be unavailable, the panel just won't be remembered.
      }
    },

    getThemeOptions() {
      return [
        {id: "dark", label: this.$t('message.theme.dark')},
        {id: "light", label: this.$t('message.theme.light')},
        {id: "system", label: this.$t('message.theme.system')},
      ];
    },

    changeTheme(mode) {
      this.themeMode = mode;
      setThemeMode(mode);
    },

    getDeviceName() {
      return isDeviceMini() ? "GoXLR Mini" : "GoXLR";
    },

    getSerial() {
      return store.getActiveDevice().hardware.serial_number;
    },

    loadLocale() {
      if (!this.utilitySupportsLanguages()) {
        return;
      }

      // Load up the Locale..
      let locale = store.getConfig().locale.system_locale;
      if (store.getConfig().locale.user_locale !== null) {
        locale = store.getConfig().locale.user_locale;
      }
      this.$i18n.locale = locale;
    },

    utilitySupportsLanguages() {
      if (!store.isConnected()) {
        return false;
      }

      if (store.getConfig() == undefined) {
        return false;
      }

      return store.getConfig().hasOwnProperty("locale");
    },

    // Stays true while reconnecting, the interface is then covered by a notice
    isDeviceSet() {
      return store.hasActiveDevice() && (store.isConnected() || store.hasConnected());
    },

    isReconnecting() {
      return !store.isConnected() && store.hasConnected();
    },

    onTabChange(tab) {
      let id = tab.id;
      if (id) {
        try {
          localStorage.setItem("activeTab", id);
        } catch (e) {
          // Only remembered for this session
        }
      }
      this.activeZone = SECTION_ZONES[id] || "none";
      if (id === "effects") {
        // This one comes initially from the store...
        this.visualiserHighlightAreas = [
          HighlightArea[`EFFECTS_PRESET${this.$refs.effects.getActivePreset().slice(-1)}`]
        ];
      } else if (id === "sampler") {
        this.visualiserHighlightAreas = [
          HighlightArea[`SAMPLER_BANK_${this.$refs.sampler.activeBank}`]
        ];
      } else {
        this.visualiserHighlightAreas = []
      }
    },

    // Samples dragged from the Samples browser onto a sampler button
    onSampleDrop(drop) {
      this.$refs.sampleAssign.open(drop.button, drop.paths, drop.bank);
    },


    onEffectPresetChange(activePreset) {
      this.visualiserHighlightAreas = [HighlightArea[`EFFECTS_PRESET${activePreset.slice(-1)}`]];
    },

    onSampleBankChange(activeBank) {
      this.visualiserHighlightAreas = [HighlightArea[`SAMPLER_BANK_${activeBank}`]];
    },


    onFirmwareClicked() {
      if (store.getActiveDevice() === null || store.getActiveDevice() === undefined) {
        // This should never happen, the message only shows if there's an active device!
        return;
      }
      this.loadSystemTab();
    },

    onAreaClicked(area) {
      const faderAreas = {[HighlightArea.CHANNEL_A]: "A", [HighlightArea.CHANNEL_B]: "B", [HighlightArea.CHANNEL_C]: "C", [HighlightArea.CHANNEL_D]: "D"};
      if (area.alt && faderAreas[area.area] !== undefined) {
        // Fader lighting lives in the Mixer now
        this.$refs["device-tabs"].selectTabById("mixer");
        this.$nextTick(() => this.$refs.mixer.openLighting(faderAreas[area.area]));
        return;
      }
      const presetAreas = [HighlightArea.EFFECTS_PRESET1, HighlightArea.EFFECTS_PRESET2, HighlightArea.EFFECTS_PRESET3,
        HighlightArea.EFFECTS_PRESET4, HighlightArea.EFFECTS_PRESET5, HighlightArea.EFFECTS_PRESET6];
      if (area.alt && presetAreas.includes(area.area)) {
        // Effects lighting lives in the Effects section now
        this.$refs["device-tabs"].selectTabById("effects");
        this.$nextTick(() => this.$refs.effects.openLighting());
        return;
      }
      if (area.alt && area.area === HighlightArea.COUGH) {
        // Cough and Bleep lighting lives in the Mic section now
        this.$refs["device-tabs"].selectTabById("mic");
        this.$nextTick(() => this.$refs.mic.$refs.cough.openLighting());
        return;
      }
      const bankAreas = {[HighlightArea.SAMPLER_BANK_A]: "A", [HighlightArea.SAMPLER_BANK_B]: "B", [HighlightArea.SAMPLER_BANK_C]: "C"};
      if (area.alt && bankAreas[area.area] !== undefined) {
        // Sampler lighting lives in the Sampler section now
        this.$refs["device-tabs"].selectTabById("sampler");
        this.$nextTick(() => {
          this.$refs.sampler.setActiveBank(bankAreas[area.area]);
          this.$refs.sampler.openLighting();
        });
        return;
      }
      if (area.alt) {
        // Every lit area has its lighting next to its settings now (handled above)
        return;
      }

      switch (area.area) {
        case HighlightArea.COUGH: {
          this.loadConfigurationTab();
          break;
        }
        case HighlightArea.CHANNEL_A:
          this.loadConfigurationTab("A");
          break;
        case HighlightArea.CHANNEL_B:
          this.loadConfigurationTab("B");
          break;
        case HighlightArea.CHANNEL_C:
          this.loadConfigurationTab("C");
          break;
        case HighlightArea.CHANNEL_D: {
          this.loadConfigurationTab("D");
          break;
        }
        case HighlightArea.SAMPLER_BANK_A: {
          this.loadSampleBank("A");
          break;
        }
        case HighlightArea.SAMPLER_BANK_B: {
          this.loadSampleBank("B");
          break;
        }
        case HighlightArea.SAMPLER_BANK_C: {
          this.loadSampleBank("C");
          break;
        }
        case HighlightArea.EFFECTS_PRESET1: {
          this.loadEffectsTab("Preset1");
          break;
        }
        case HighlightArea.EFFECTS_PRESET2: {
          this.loadEffectsTab("Preset2");
          break;
        }
        case HighlightArea.EFFECTS_PRESET3: {
          this.loadEffectsTab("Preset3");
          break;
        }
        case HighlightArea.EFFECTS_PRESET4: {
          this.loadEffectsTab("Preset4");
          break;
        }
        case HighlightArea.EFFECTS_PRESET5: {
          this.loadEffectsTab("Preset5");
          break;
        }
        case HighlightArea.EFFECTS_PRESET6: {
          this.loadEffectsTab("Preset6");
          break;
        }
      }
    },

    // Faders now live in the Mixer, and the cough button in the Mic section.
    loadConfigurationTab(channel = undefined) {
      this.$refs['device-tabs'].selectTabById(channel === undefined ? "mic" : "mixer");
    },

    loadSampleBank(bank) {
      this.$refs['device-tabs'].selectTabById("sampler");
      this.$nextTick(() => {
        this.$refs.sampler.setActiveBank(bank);
      })
    },

    loadEffectsTab(preset) {
      this.$refs['device-tabs'].selectTabById("effects");
      this.$nextTick(() => {
        this.$refs.effects.onEffectSelectionChange(preset);
      });
    },

    loadSystemTab() {
      this.$refs['device-tabs'].selectTabById("system");
    },

    // The device being updated: the active one when it is, otherwise the first one updating.
    firmwareSerial() {
      const firmware = store.status.firmware || {};
      return firmware[store.getActiveSerial()] !== undefined ? store.getActiveSerial() : Object.keys(firmware)[0];
    },

    firmwareDevice() {
      const serial = this.firmwareSerial();
      return serial === undefined ? undefined : store.status.firmware[serial];
    },

    firmwareError() {
      const device = this.firmwareDevice();
      return device && device.error ? device.error : "";
    },

    getFirmwareUpdateState() {
      if (this.firmwareUpdateStatus === undefined)
        return false;

      const firstDevice = this.firmwareDevice();
      if (firstDevice === undefined)
        return false;

      if (typeof firstDevice.state === "string")
        return firstDevice.state;

      return Object.keys(firstDevice.state)[0];
    },

    getFirmwareUpdateStateLocalized() {
      const state = this.getFirmwareUpdateState();
      if (state === false) return "";

      return this.$t(`message.system.firmwareUpdate.progress.${state[0].toLowerCase() + state.slice(1)}`) ;
    },

    continueFirmwareUpdate() {
      if (this.firmwareUpdateStatus  === undefined)
        return false;

      const firstDeviceSerial = this.firmwareSerial();
      websocket.continue_firmware_update(firstDeviceSerial);
    },

    completeFirmwareUpdate() {
      if (this.firmwareUpdateStatus  === undefined)
        return false;

      const firstDeviceSerial = this.firmwareSerial();
      websocket.clear_firmware_state(firstDeviceSerial);
    },

    getUpdateProgress() {
      if (this.firmwareUpdateStatus  === undefined)
        return 0;

      if (this.getFirmwareUpdateState() === "Complete")
        return 100;

      const firstDevice = this.firmwareDevice();
      if (firstDevice === undefined)
        return 0;

      return firstDevice.progress;
    },

    getFirmwareTargetVersion() {
      if (this.firmwareUpdateStatus  === undefined)
        return this.$t('message.common.unknown');

      if (this.getFirmwareUpdateState() !== "Pause")
        return this.$t('message.common.unknown');

      const firstDevice = this.firmwareDevice();
      const firmwareInfo = firstDevice.state["Pause"];
      return firmwareInfo.version.join('.');
    }
  },

  created() {
    runWebsocket();
  },

  watch: {
    // The section opened last time comes back with the interface
    deviceShown: {
      handler(shown) {
        if (!shown) return;
        let id = undefined;
        try {
          id = localStorage.getItem("activeTab");
        } catch (e) {
          return;
        }
        this.$nextTick(() => {
          const tabs = this.$refs["device-tabs"];
          const tab = tabs && tabs.tabs.find(tab => tab.id === id && !tab.hidden);
          if (tab && !tab.isActive) tabs.selectTab(tab);
        });
      },
      immediate: true,
    },
  },

  mounted() {
    store.onConnected(() => {
      this.loadLocale();
    });
  }
};
</script>

<style>
.screenreader-only {
  position: absolute;
  left: -10000px;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;
}

#main {
  width: 100%;
  font-size: 10pt;
}

#main .brand {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 4px 10px 16px;
  font-family: var(--f-title);
  font-size: 15px;
  letter-spacing: .04em;
  color: var(--c-text);
}

#main .brand-logo {
  flex: none;
}

#main .brand-text {
  display: grid;
  gap: 1px;
}

#main .brand-name {
  font-size: 17px;
  line-height: 1;
}

#main .brand-device {
  color: var(--c-muted);
  font-weight: 500;
}

#main .brand-note {
  font-family: var(--f-mono);
  font-size: 9.5px;
  letter-spacing: .1em;
  text-transform: uppercase;
  color: var(--c-muted);
}

#main .theme-switch {
  margin-top: auto;
  padding: 10px 4px;
}

#main .device-status {
  padding: 12px 10px 2px;
  border-top: 1px solid var(--c-line);
  display: grid;
  gap: 2px;
  font-size: 12px;
  color: var(--c-muted);
}

#main .device-name {
  color: var(--c-text);
  font-weight: 600;
}

#main .device-status .dot {
  display: inline-block;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: var(--c-ok);
  margin-right: 7px;
  vertical-align: 1px;
}

#main .device-detail {
  font-family: var(--f-mono);
  font-size: 11px;
}

#main .visualiser-panel {
  display: flex;
  justify-content: center;
  padding: 10px 16px 0;
  border-bottom: 1px solid var(--c-line);
}

#main .visualiser-panel > * {
  width: 100%;
  max-width: 760px;
}

/* Library and buttons side by side, the selected button's samples below across the page */
#main .sampler-page {
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  gap: 16px;
  padding: var(--page-gutter);
}

#main .sampler-library {
  flex: 0 1 460px;
  min-width: 0;
}

#main .sampler-device {
  display: contents;
}

/* The buttons card keeps its own height; the library stretches to it */
#main .sampler-library {
  display: flex;
  flex-direction: column;
}

/* Its own row, from the left edge */
#main .sampler-page .button-samples {
  flex: 0 0 100%;
  max-width: 100%;
  box-sizing: border-box;
}

.firmware-error {
  margin: 8px 0 0;
  color: var(--c-danger);
  white-space: pre-line;
}

.firmware-hint {
  margin: 4px 0 0;
  color: var(--c-muted);
  font-size: 13px;
}

.shortcuts-link {
  margin: 0 16px 8px;
  justify-content: flex-start;
  font-size: 12px;
  color: var(--c-muted);
}

.shortcuts-link .key {
  font-family: var(--f-mono);
  font-size: 11px;
  padding: 0 5px;
  border: 1px solid var(--c-field-border);
  border-radius: 3px;
}

.reconnecting {
  position: fixed;
  inset: 0;
  z-index: 150;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 80px;
  background-color: var(--c-shadow);
}

.reconnecting span {
  padding: 10px 16px;
  border-radius: 8px;
  border: 1px solid var(--c-warn);
  background-color: var(--c-panel);
  color: var(--c-text);
  font-weight: 600;
  box-shadow: 0 8px 24px var(--c-shadow);
}

#main .system-wrap {
  padding: var(--page-gutter);
}

#main .library {
  padding: var(--page-gutter);
  display: grid;
  gap: 16px;
  max-width: 640px;
}
</style>

<style scoped>
.modalButtonBox {
  display: flex;
  flex-direction: row;
  justify-content: right;
  gap: 5px;

}
</style>