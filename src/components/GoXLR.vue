<template>
  <div id="main">
    <DeviceSelector v-if="!isDeviceSet()"/>
    <template v-if="isDeviceSet()">
      <Tabs ref="device-tabs" vertical shortcuts @on-change="onTabChange" :label="$t('message.navigation.accessibilityDeviceSection')">
        <template #nav-top>
          <div class="brand">
            <span class="brand-mark" aria-hidden="true"></span>
            <span>GoXLR Utility</span>
          </div>
        </template>
        <template #nav-bottom>
          <div class="device-status">
            <span class="device-name"><span class="dot" aria-hidden="true"></span>{{ getDeviceName() }}</span>
            <span class="device-detail">{{ getSerial() }}</span>
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
            <Mixer/>
          </ContentContainer>
        </Tab>
        <Tab id="mic" icon="fa-solid fa-microphone-lines" :name="$t('message.navigation.microphone')">
          <Mic/>
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
        <Tab id="lighting" icon="fa-solid fa-lightbulb" :name="$t('message.navigation.lighting')">
          <LightingTab ref="lighting" @on-lighting-changed="onLightingDataChange"/>
        </Tab>

        <Tab id="profiles" icon="fa-solid fa-file-lines" :group="$t('message.navigation.library')" :name="$t('message.navigation.profiles')">
          <div class="library">
            <Panel :title="$t('message.navigation.profiles')">
              <ProfileHandler/>
            </Panel>
            <Panel :title="$t('message.microphone.profiles.title')">
              <MicProfileHandler bare/>
            </Panel>
          </div>
        </Tab>
        <Tab id="presets" v-if="!isDeviceMini()" icon="fa-solid fa-layer-group" :group="$t('message.navigation.library')" :name="$t('message.navigation.presets')">
          <div class="library">
            <Panel :title="$t('message.navigation.presets')">
              <PresetHandler/>
            </Panel>
          </div>
        </Tab>

        <Tab id="system" icon="fa-solid fa-gear" :group="$t('message.navigation.application')" :name="$t('message.navigation.system')">
          <ContentContainer>
            <SystemComponent/>
          </ContentContainer>
        </Tab>
      </Tabs>
    </template>
    <VersionCheck @firmware-click="onFirmwareClicked" />
    <Language v-if="!utilitySupportsLanguages()" />
    <A11yNotifications/>

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
          <button @click="continueFirmwareUpdate">{{$t('message.modalButtons.continue')}}</button>
          <button @click="completeFirmwareUpdate" class="cancel">{{$t('message.modalButtons.cancel')}}</button>
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
          <button @click="completeFirmwareUpdate" class="close">{{$t('message.modalButtons.close')}}</button>
        </div>
      </div>

      <div v-else-if="getFirmwareUpdateState() == 'Failed'">
        {{ $t('message.system.firmwareUpdate.failed') }}

        <ProgressBar
            :progress="getUpdateProgress()"
            :status_message="getFirmwareUpdateStateLocalized()"
            status_position="top"
        />

        <div class="modalButtonBox">
          <button @click="completeFirmwareUpdate" class="close">{{$t('message.modalButtons.close')}}</button>
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
import Mixer from "./sections/Mixer.vue";
import Tabs from "@/components/tabs/Tabs.vue";
import Tab from "@/components/tabs/Tab.vue";
import Routing from "@/components/sections/Routing.vue";
import Mic from "@/components/sections/Mic.vue";
import DeviceSelector from "@/components/sections/DeviceSelector.vue";
import {store} from "@/store";
import {runWebsocket, websocket} from "@/util/sockets";
import SystemComponent from "@/components/sections/System.vue";
import TopBar from "@/components/TopBar.vue";
import Panel from "@/components/design/Panel.vue";
import ProfileHandler from "@/components/profiles/handlers/ProfileHandler.vue";
import MicProfileHandler from "@/components/profiles/handlers/MicProfileHandler.vue";
import SampleHandler from "@/components/sections/files/SampleHandler.vue";
import PresetHandler from "@/components/sections/files/PresetHandler.vue";
import EffectsTab from "@/components/sections/EffectsTab.vue";
import {isDeviceMini} from "@/util/util";
import LightingTab from "@/components/sections/lighting/LightingTab.vue";
import SamplerTab from "@/components/sections/SamplerTab.vue";
import SampleAssignModal from "@/components/sections/sampler/SampleAssignModal.vue";
import ContentContainer from "@/components/containers/ContentContainer.vue";
import CenteredContainer from "@/components/containers/CenteredContainer.vue";
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
const SECTION_ZONES = {mixer: "faders", configuration: "faders", mic: "mic", effects: "effects", sampler: "sampler"};

export default {
  name: "GoXLR",
  expose: ['openFirmwareUpdateProgressModal'],
  components: {
    ProgressBar,
    AccessibleModal,
    Language,
    VersionCheck,
    GoXLRVisualiser,
    A11yNotifications,
    CenteredContainer,
    ContentContainer,
    SamplerTab,
    SampleAssignModal,
    LightingTab,
    EffectsTab,
    TopBar,
    Panel,
    ProfileHandler,
    MicProfileHandler,
    SampleHandler,
    PresetHandler,
    SystemComponent,
    DeviceSelector,
    Routing,
    Tab,
    Tabs,
    Mixer,
    Mic,
  },

  computed: {
    HighlightArea() {
      return HighlightArea
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

    isDeviceSet() {
      let ready = store.hasActiveDevice() && store.isConnected();
      return ready;
    },

    onTabChange(tab) {
      let id = tab.id;
      this.activeZone = SECTION_ZONES[id] || "none";
      if (id === "configuration") {
        this.visualiserHighlightAreas = [
          HighlightArea.COUGH,
          HighlightArea.CHANNEL_A
        ];
      } else if (id === "effects") {
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

    onFaderChannelChange(activeChannel) {
      this.visualiserHighlightAreas[this.visualiserHighlightAreas.length - 1] = HighlightArea[`CHANNEL_${activeChannel}`];
    },

    onEffectPresetChange(activePreset) {
      this.visualiserHighlightAreas = [HighlightArea[`EFFECTS_PRESET${activePreset.slice(-1)}`]];
    },

    onSampleBankChange(activeBank) {
      this.visualiserHighlightAreas = [HighlightArea[`SAMPLER_BANK_${activeBank}`]];
    },

    onLightingDataChange() {
      let lightingData = this.$refs.lighting.getNodes();

      // mixer channels
      if (lightingData[0] === "mixer")
        this.visualiserHighlightAreas = [HighlightArea[`CHANNEL_${lightingData[1]}`]];

      // effect presets
      else if (lightingData[0] === "effects")
        this.visualiserHighlightAreas = [HighlightArea[`EFFECTS_PRESET${lightingData[1].slice(-1)}`]];

      // sampler banks
      else if (lightingData[0] === "sampler")
        this.visualiserHighlightAreas = [HighlightArea[`SAMPLER_BANK_${lightingData[1].slice(-1)}`]];

      // cough
      else if (lightingData[0] === "cough")
        this.visualiserHighlightAreas = [HighlightArea.COUGH];

      // nothing
      else this.visualiserHighlightAreas = [];
    },

    onFirmwareClicked() {
      if (store.getActiveDevice() === null || store.getActiveDevice() === undefined) {
        // This should never happen, the message only shows if there's an active device!
        return;
      }
      this.loadSystemTab();
    },

    onAreaClicked(area) {
      if (area.alt) {
        // All right click behaviour is handled by the Lighting Tab (saves sub-tab headaches)
        this.$refs["device-tabs"].selectTabById("lighting");
        this.$nextTick(() => this.$refs.lighting.activateArea(area.area));
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

    getFirmwareUpdateState() {
      if (this.firmwareUpdateStatus === undefined)
        return false;

      const firstDevice = Object.values(store.status.firmware)[0];
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

      const firstDeviceSerial = Object.keys(store.status.firmware)[0];
      websocket.continue_firmware_update(firstDeviceSerial);
    },

    completeFirmwareUpdate() {
      if (this.firmwareUpdateStatus  === undefined)
        return false;

      const firstDeviceSerial = Object.keys(store.status.firmware)[0];
      websocket.clear_firmware_state(firstDeviceSerial);
    },

    getUpdateProgress() {
      if (this.firmwareUpdateStatus  === undefined)
        return 0;

      if (this.getFirmwareUpdateState() === "Complete")
        return 100;

      const firstDevice = Object.values(store.status.firmware)[0];
      if (firstDevice === undefined)
        return 0;

      return firstDevice.progress;
    },

    getFirmwareTargetVersion() {
      if (this.firmwareUpdateStatus  === undefined)
        return this.$t('message.common.unknown');

      if (this.getFirmwareUpdateState() !== "Pause")
        return this.$t('message.common.unknown');

      const firstDevice = Object.values(store.status.firmware)[0];
      const firmwareInfo = firstDevice.state["Pause"];
      return firmwareInfo.version.join('.');
    }
  },

  created() {
    runWebsocket();
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

#main .brand-mark {
  width: 22px;
  height: 14px;
  border: 2px solid var(--c-accent);
  border-radius: 3px;
}

#main .device-status {
  margin-top: auto;
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

#main .sampler-page {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 16px;
  padding: 24px;
}

#main .sampler-library {
  flex: 0 1 460px;
}

#main .sampler-device {
  flex: 1 1 560px;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 16px;
  min-width: 0;
}

#main .library {
  padding: 24px;
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

    &.close {
      border-color: var(--c-accent-muted);

      &:hover {
        border-color: var(--c-accent);
      }
    }
  }
}
</style>