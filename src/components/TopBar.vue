<template>
  <header class="topbar">
    <SelectMenu class="picker" button-class="picker-button" :options="getProfiles()" :selected="getActiveProfile()"
                :label="$t('message.topBar.profileLabel')" @select="askLoad($event, false)">
      <template #prefix><span class="picker-label">{{ $t('message.topBar.profile') }}</span></template>
    </SelectMenu>
    <AppButton ref="save" variant="primary" @click="$refs.saveModal.openModal($refs.saveOk, $refs.save)"
            :title="$t('message.profileManager.saveProfileName', { profileName: getActiveProfile() })">
      <font-awesome-icon icon="fa-solid fa-floppy-disk"/>
      <span>{{ $t('message.topBar.save') }}</span>
    </AppButton>

    <SelectMenu class="picker" button-class="picker-button" :options="getMicProfiles()" :selected="getActiveMicProfile()"
                :label="$t('message.topBar.micProfileLabel')" @select="askLoad($event, true)">
      <template #prefix><span class="picker-label">{{ $t('message.topBar.micProfile') }}</span></template>
    </SelectMenu>

    <AppButton ref="lighting" @click="openLighting">
      <font-awesome-icon icon="fa-solid fa-lightbulb"/>
      <span>{{ $t('message.topBar.lighting') }}</span>
    </AppButton>

    <span class="grow"></span>

    <button class="map-button" @click="$emit('toggle-visualiser')" :aria-expanded="visualiserOpen"
            :title="visualiserOpen ? $t('message.topBar.hideDevice') : $t('message.topBar.showDevice')">
      <svg viewBox="0 0 132 40" class="map" aria-hidden="true">
        <rect x="1" y="1" width="130" height="38" rx="5" class="frame"/>
        <line v-for="x in [12, 24, 36, 48]" :key="x" :x1="x" y1="9" :x2="x" y2="31" :class="['fader', zoneClass('faders')]"/>
        <rect v-if="!isMini()" x="60" y="7" width="34" height="12" rx="2" :class="zoneClass('effects')"/>
        <rect v-if="!isMini()" x="60" y="22" width="34" height="12" rx="2" :class="zoneClass('sampler')"/>
        <circle cx="112" cy="20" r="11" :class="zoneClass('mic')"/>
      </svg>
      <font-awesome-icon :icon="visualiserOpen ? 'fa-solid fa-chevron-up' : 'fa-solid fa-chevron-down'" class="chevron"/>
    </button>
  </header>

  <AccessibleModal ref="lightingModal" id="globalLighting" width="min(560px, 94vw)" body-padding="0"
                   @modal-close="lightingOpen = false">
    <template v-slot:title>{{ $t('message.topBar.lightingTitle') }}</template>
    <GlobalLighting v-if="lightingOpen"/>
  </AccessibleModal>

  <!-- Loading another profile replaces the current one, including what wasn't saved -->
  <AccessibleModal ref="loadModal" id="topBarLoad" :show_close="false">
    <template v-slot:title>{{ $t('message.topBar.loadTitle', { name: pendingLoad.name }) }}</template>
    <template v-slot:default>
      {{ $t(pendingLoad.mic ? 'message.topBar.loadMicQuestion' : 'message.topBar.loadQuestion', { current: pendingLoad.current }) }}
    </template>
    <template v-slot:footer>
      <ModalButton ref="loadOk" @click="confirmLoad(false)">{{ $t('message.topBar.load') }}</ModalButton>
      <ModalButton @click="confirmLoad(true)">{{ $t('message.topBar.saveThenLoad') }}</ModalButton>
      <ModalButton @click="$refs.loadModal.closeModal()">{{ $t('message.sampleManager.cancel') }}</ModalButton>
    </template>
  </AccessibleModal>

  <AccessibleModal ref="saveModal" id="topBarSave" :show_close="false">
    <template v-slot:title>{{ $t('message.profileManager.overwriteTitle') }}</template>
    <template v-slot:default>{{ $t('message.profileManager.overwriteQuestion', { activeProfile: getActiveProfile() }) }}</template>
    <template v-slot:footer>
      <ModalButton ref="saveOk" @click="saveProfile(); $refs.saveModal.closeModal()">{{ $t('message.profileManager.overwriteYes') }}</ModalButton>
      <ModalButton @click="$refs.saveModal.closeModal()">{{ $t('message.profileManager.overwriteNo') }}</ModalButton>
    </template>
  </AccessibleModal>
</template>

<script>
import AppButton from "@/components/design/AppButton.vue";
import {store} from "@/store";
import {sendHttpCommand} from "@/util/sockets";
import {isDeviceMini} from "@/util/util";
import AccessibleModal from "@/components/design/modal/AccessibleModal.vue";
import ModalButton from "@/components/design/modal/ModalButton.vue";
import GlobalLighting from "@/components/sections/lighting/GlobalLighting.vue";
import SelectMenu from "@/components/design/SelectMenu.vue";

export default {
  name: "TopBar",
  components: {AppButton, SelectMenu, GlobalLighting, ModalButton, AccessibleModal},

  data() {
    return {
      lightingOpen: false,
      // The profile chosen in a picker, waiting for confirmation
      pendingLoad: {name: "", mic: false, current: ""},
    };
  },
  emits: ["toggle-visualiser"],

  props: {
    // The device zone of the open section: faders, effects, sampler, mic or none
    activeZone: {type: String, default: "none"},
    visualiserOpen: {type: Boolean, default: false},
  },

  methods: {
    // The device-wide lighting (moved here from the Lighting section)
    openLighting() {
      this.lightingOpen = false;
      this.$nextTick(() => {
        this.lightingOpen = true;
        this.$refs.lightingModal.openModal(undefined, this.$refs.lighting);
      });
    },

    isMini() {
      return isDeviceMini();
    },

    zoneClass(zone) {
      return zone === this.activeZone ? "zone on" : "zone";
    },

    getProfiles() {
      return store.getProfileFiles().slice().sort(Intl.Collator().compare).map(name => ({id: name, label: name}));
    },

    getMicProfiles() {
      return store.getMicProfileFiles().slice().sort(Intl.Collator().compare).map(name => ({id: name, label: name}));
    },

    askLoad(name, mic) {
      const current = mic ? this.getActiveMicProfile() : this.getActiveProfile();
      this.pendingLoad = {name, mic, current};
      this.$refs.loadModal.openModal(this.$refs.loadOk);
    },

    // Optionally saves the current profile first, then loads the chosen one
    async confirmLoad(saveFirst) {
      const {name, mic} = this.pendingLoad;
      this.$refs.loadModal.closeModal();
      const serial = store.getActiveSerial();
      if (saveFirst) {
        await sendHttpCommand(serial, mic ? {SaveMicProfile: []} : {SaveProfile: []}).catch(error => console.log(error));
      }
      if (mic) {
        this.loadMicProfile(name);
      } else {
        this.loadProfile(name);
      }
    },

    getActiveProfile() {
      return store.getActiveDevice().profile_name;
    },

    getActiveMicProfile() {
      return store.getActiveDevice().mic_profile_name;
    },

    loadProfile(name) {
      sendHttpCommand(store.getActiveSerial(), {LoadProfile: [name, true]}).catch(error => console.log(error));
      store.setAccessibilityNotification("polite", this.$t('message.profileManager.accessibilityLoadedProfile', {profileName: name}));
    },

    loadMicProfile(name) {
      sendHttpCommand(store.getActiveSerial(), {LoadMicProfile: [name, true]}).catch(error => console.log(error));
    },

    saveProfile() {
      sendHttpCommand(store.getActiveSerial(), {SaveProfile: []});
      store.setAccessibilityNotification("polite", this.$t('message.profileManager.accessibilitySavedProfile', {profileName: this.getActiveProfile()}));
    },
  }
}
</script>

<style scoped>
.topbar {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  padding: 10px 16px;
  background-color: var(--c-panel);
  border-bottom: 1px solid var(--c-line);
}

.picker {
  min-width: 170px;
  max-width: 260px;
}

.picker :deep(.picker-button) {
  padding: 7px 10px;
  border-color: var(--c-line-strong);
  font-weight: 600;
  font-size: 13px;
}

.picker-label {
  font-family: var(--f-mono);
  font-size: 10px;
  font-weight: normal;
  letter-spacing: .08em;
  text-transform: uppercase;
  color: var(--c-muted);
}

.map-button:focus-visible {
  outline: 2px solid var(--c-accent);
  outline-offset: 2px;
}

.grow {
  flex: 1;
}

.map-button {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  border: 1px solid transparent;
  border-radius: 6px;
  background: transparent;
  color: var(--c-muted);
  cursor: pointer;
}

.map-button:hover {
  border-color: var(--c-line);
  color: var(--c-text);
}

.map {
  width: 132px;
  height: 40px;
}

.map .frame {
  fill: none;
  stroke: var(--c-line-strong);
  stroke-width: 1.5;
}

.map .zone {
  fill: none;
  stroke: var(--c-line-strong);
  stroke-width: 1.5;
}

.map .zone.on {
  stroke: var(--c-accent);
  fill: color-mix(in srgb, var(--c-accent) 20%, transparent);
}

.map .fader {
  stroke-width: 2.5;
  stroke-linecap: round;
}

.map .fader.on {
  fill: none;
}

.chevron {
  font-size: 11px;
}
</style>
