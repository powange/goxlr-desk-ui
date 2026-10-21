<template>
  <header class="topbar">
    <label class="picker">
      <span class="picker-label">{{ $t('message.topBar.profile') }}</span>
      <select :value="getActiveProfile()" @change="loadProfile($event.target.value)"
              :aria-label="$t('message.topBar.profileLabel')">
        <option v-for="name in getProfiles()" :key="name" :value="name">{{ name }}</option>
      </select>
    </label>
    <button ref="save" class="bar-button primary" @click="$refs.saveModal.openModal($refs.saveOk, $refs.save)"
            :title="$t('message.profileManager.saveProfileName', { profileName: getActiveProfile() })">
      <font-awesome-icon icon="fa-solid fa-floppy-disk"/>
      <span>{{ $t('message.topBar.save') }}</span>
    </button>

    <label class="picker">
      <span class="picker-label">{{ $t('message.topBar.micProfile') }}</span>
      <select :value="getActiveMicProfile()" @change="loadMicProfile($event.target.value)"
              :aria-label="$t('message.topBar.micProfileLabel')">
        <option v-for="name in getMicProfiles()" :key="name" :value="name">{{ name }}</option>
      </select>
    </label>

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
import {store} from "@/store";
import {sendHttpCommand} from "@/util/sockets";
import {isDeviceMini} from "@/util/util";
import AccessibleModal from "@/components/design/modal/AccessibleModal.vue";
import ModalButton from "@/components/design/modal/ModalButton.vue";

export default {
  name: "TopBar",
  components: {ModalButton, AccessibleModal},
  emits: ["toggle-visualiser"],

  props: {
    // The device zone of the open section: faders, effects, sampler, mic or none
    activeZone: {type: String, default: "none"},
    visualiserOpen: {type: Boolean, default: false},
  },

  methods: {
    isMini() {
      return isDeviceMini();
    },

    zoneClass(zone) {
      return zone === this.activeZone ? "zone on" : "zone";
    },

    getProfiles() {
      return store.getProfileFiles().slice().sort(Intl.Collator().compare);
    },

    getMicProfiles() {
      return store.getMicProfileFiles().slice().sort(Intl.Collator().compare);
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
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 0 4px 0 10px;
  border: 1px solid var(--c-line);
  border-radius: 6px;
  background-color: var(--c-raised);
}

.picker-label {
  font-family: var(--f-mono);
  font-size: 10px;
  letter-spacing: .08em;
  text-transform: uppercase;
  color: var(--c-muted);
}

.picker select {
  appearance: none;
  border: none;
  background: transparent;
  color: var(--c-text);
  font-weight: 600;
  font-size: 13px;
  padding: 7px 22px 7px 2px;
  cursor: pointer;
  max-width: 220px;
  background-image: linear-gradient(45deg, transparent 50%, var(--c-muted) 50%), linear-gradient(135deg, var(--c-muted) 50%, transparent 50%);
  background-position: calc(100% - 11px) 50%, calc(100% - 6px) 50%;
  background-size: 5px 5px;
  background-repeat: no-repeat;
}

.picker select option {
  background-color: var(--c-panel);
  color: var(--c-text);
}

.picker:focus-within {
  border-color: var(--c-accent);
}

.bar-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 7px 12px;
  border-radius: 6px;
  border: 1px solid var(--c-line);
  background-color: var(--c-raised);
  color: var(--c-text);
  font-weight: 600;
  font-size: 13px;
  cursor: pointer;
}

.bar-button.primary {
  background-color: var(--c-accent);
  border-color: var(--c-accent);
  color: var(--c-on-accent);
}

.bar-button:hover {
  filter: brightness(1.1);
}

.bar-button:focus-visible, .map-button:focus-visible {
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
