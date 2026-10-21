<template>
  <div class="preset-bar" role="group" :aria-label="$t('message.effects.preset.title')">
    <label class="preset-field">
      <span class="preset-label">{{ $t('message.effects.preset.title') }}</span>
      <select :value="getActivePreset()" @change="onEffectSelectionChange($event.target.value)"
              :aria-label="$t('message.effects.preset.group')">
        <option v-for="option in getEffectOptions()" :key="option.id" :value="option.id">{{ option.label }}</option>
      </select>
    </label>
    <label class="preset-field">
      <span class="preset-label">{{ $t('message.effects.preset.name') }}</span>
      <input ref="nameInput" class="preset-name" type="text" v-model="nameDraft" maxlength="64"
             :aria-label="$t('message.effects.preset.menuRename')"
             @keydown.enter="commitName" @keydown.esc="nameDraft = getCurrentPresetName(); $refs.nameInput.blur()"
             @blur="commitName"/>
    </label>
    <button ref="saveButton" type="button" class="preset-button primary" @click="savePressed">
      <font-awesome-icon icon="fa-solid fa-floppy-disk"/>
      <span>{{ $t('message.effects.preset.menuSave') }}</span>
    </button>
    <button ref="loadButton" type="button" class="preset-button" @click="$refs.select_preset_modal.openModal(undefined, $refs.loadButton)">
      <font-awesome-icon icon="fa-solid fa-folder"/>
      <span>{{ $t('message.effects.preset.menuLoad') }}</span>
    </button>
  </div>

  <div class="effects-page">
    <ReverbEffect/>
    <EchoEffect/>
    <PitchEffect/>
    <GenderEffect/>
    <MegaphoneEffect/>
    <RobotEffect/>
    <HardTuneEffect/>
  </div>

  <!-- Modals -->

  <AccessibleModal
      ref="select_preset_modal"
      id="select_preset"
      :show_footer="true"
  >
    <template v-slot:title>
      <span>{{ $t('message.effects.preset.loadPreset') }}</span>
      <button
          class="openButton"
          @click="openPresets"
          :aria-label="$t('message.effects.preset.accessibilityOpenPresetDirectory')"
      >
        <font-awesome-icon icon="fa-solid fa-folder"/>
      </button>
    </template>
    <ScrollingRadioList
        v-if="getPresetList().length > 0"
        max_height="300px"
        group="preset_list"
        :options="getPresetList()"
        :selected="getSelectedPreset()"
        @selection-changed="selectPreset"
    />
    <span v-else>
      {{ $t('message.effects.preset.noPresets') }}
    </span>
    <template v-slot:footer>
      <ModalButton
          ref="ok" class="modal-default-button" :enabled="selectedPreset !== undefined"
          @click="confirmPresetLoad()">{{ $t('message.effects.preset.loadPresetOk') }}</ModalButton>
    </template>
  </AccessibleModal>

  <AccessibleModal ref="override_preset_modal" id="override_preset" :show_close="false">
    <template v-slot:title>{{ $t('message.effects.preset.confirmTitle') }}</template>
    <template v-slot:default>{{ $t('message.effects.preset.confirmMessage') }}</template>
    <template v-slot:footer>
      <ModalButton ref="confirmFocusOk" @click="loadPreset()">{{ $t('message.effects.preset.confirmOk') }}</ModalButton>
      <ModalButton @click="this.selectedPreset = undefined; $refs.override_preset_modal.closeModal();">
        {{ $t('message.effects.preset.confirmCancel') }}
      </ModalButton>
    </template>
  </AccessibleModal>

  <AccessibleModal ref="overwrite_library_save" id="overwrite_save" :show_close="false">
    <template v-slot:title>{{ $t('message.effects.preset.overwriteTitle') }}</template>
    <template v-slot:default>
      {{ $t('message.effects.preset.overwriteMessage', { current: getCurrentPresetName() }) }}
    </template>
    <template v-slot:footer>
      <ModalButton ref="overwriteConfirm" @click="saveActivePreset(); $refs.overwrite_library_save.closeModal();">
        {{ $t('message.effects.preset.overwriteConfirm') }}
      </ModalButton>
      <ModalButton @click="$refs.overwrite_library_save.closeModal();">{{ $t('message.effects.preset.overwriteCancel') }}</ModalButton>
    </template>
  </AccessibleModal>
</template>

<script>
import ReverbEffect from "@/components/sections/effects/ReverbEffect.vue";
import EchoEffect from "@/components/sections/effects/EchoEffect.vue";
import PitchEffect from "@/components/sections/effects/PitchEffect.vue";
import GenderEffect from "@/components/sections/effects/GenderEffect.vue";
import MegaphoneEffect from "@/components/sections/effects/MegaphoneEffect.vue";
import RobotEffect from "@/components/sections/effects/RobotEffect.vue";
import HardTuneEffect from "@/components/sections/effects/HardTuneEffect.vue";
import {EffectPresets} from "@/util/mixerMapping";
import {store} from "@/store";
import {websocket} from "@/util/sockets";
import ModalButton from "@/components/design/modal/ModalButton.vue";
import AccessibleModal from "@/components/design/modal/AccessibleModal.vue";
import ScrollingRadioList from "@/components/lists/ScrollingRadioList.vue";

export default {
  emits: ["on-effect-preset-change"],

  name: "EffectsTab",
  components: {
    ScrollingRadioList,
    AccessibleModal,
    ModalButton,
    HardTuneEffect,
    RobotEffect, MegaphoneEffect, GenderEffect, PitchEffect, EchoEffect, ReverbEffect,
  },

  data() {
    return {
      effectPresets: EffectPresets,

      selectedPreset: undefined,
      // The name being edited in the preset bar
      nameDraft: "",
    };
  },

  created() {
    this.nameDraft = this.getCurrentPresetName();
  },

  watch: {
    // Another preset, or a rename from elsewhere, refreshes the name field
    currentPresetName(name) {
      this.nameDraft = name;
    },
  },

  computed: {
    currentPresetName() {
      return this.getCurrentPresetName();
    },
  },

  methods: {
    commitName() {
      const name = this.nameDraft.trim();
      if (name === "" || name === this.getCurrentPresetName()) {
        this.nameDraft = this.getCurrentPresetName();
        return;
      }
      websocket.send_command(store.getActiveSerial(), {"RenameActivePreset": name}).then(() => {
        store.getActiveDevice().effects.preset_names[store.getActiveDevice().effects.active_preset] = name;
      });
    },

    savePressed() {
      // Saving under a name that's already in the library asks before overwriting it
      if (store.getPresetFiles().includes(this.getCurrentPresetName())) {
        this.$refs.overwrite_library_save.openModal(this.$refs.overwriteConfirm, this.$refs.saveButton);
      } else {
        this.saveActivePreset();
      }
    },

    getCurrentPresetName() {
      return store.getActiveDevice().effects.preset_names[store.getActiveDevice().effects.active_preset];
    },

    openPresets() {
      websocket.open_path("Presets");
    },

    confirmPresetLoad() {
      let returnRef = this.$refs.select_preset_modal.returnFocus;

      this.$refs.select_preset_modal.returnFocus = undefined;
      this.$refs.select_preset_modal.closeModal();

      this.$refs.override_preset_modal.openModal(this.$refs.confirmFocusOk, returnRef);
    },

    getPresetList() {
      let presets = [];
      for (let preset of store.getPresetFiles().sort(Intl.Collator().compare)) {
        presets.push({
          id: preset,
          label: preset,
        });
      }
      return presets;
    },

    getSelectedPreset() {
      return this.selectedPreset;
    },

    selectPreset(preset) {
      this.selectedPreset = preset;
    },

    getEffectOptions() {
      // We need to build the list from existing effects..
      let effects = [];
      for (let i = 0; i < this.effectPresets.length; i++) {
        effects.push({
          id: this.effectPresets[i],
          label: this.getLabel(i, this.effectPresets[i]),
        })
      }

      return effects;
    },

    loadPreset() {
      let name = this.getSelectedPreset();
      websocket.send_command(store.getActiveSerial(), {"LoadEffectPreset": name}).then(() => {
        store.getActiveDevice().effects.preset_names[store.getActiveDevice().effects.active_preset] = name;

        let currentBank = EffectPresets.indexOf(store.getActiveDevice().effects.active_preset) + 1;
        store.setAccessibilityNotification(
            "polite",
            this.$t("message.effects.preset.accessibilityPresetLoaded", { name: name, bank: currentBank })
        );

        this.selectedPreset = undefined;
      }).finally(() => {
        let self = this;
        setTimeout(() => {
          self.$refs.override_preset_modal.closeModal();
        }, 10);
      });
    },

    onEffectSelectionChange(id) {
      if (!this.isActive(id)) {
        websocket.send_command(store.getActiveSerial(), {"SetActiveEffectPreset": id});
      }
      this.$emit("on-effect-preset-change", id);
    },

    getActivePreset() {
      return store.getActiveDevice().effects.active_preset;
    },

    getLabel(id, key) {
      return (id + 1).toString() + ": " + store.getActiveDevice().effects.preset_names[key];
    },

    isActive(key) {
      return store.getActiveDevice().effects.active_preset === key;
    },

    saveActivePreset() {
      let name = store.getActiveDevice().effects.preset_names[store.getActiveDevice().effects.active_preset];

      websocket.send_command(store.getActiveSerial(), {"SaveActivePreset": []});
      store.setAccessibilityNotification(
          "polite",
          this.$t("message.effects.preset.accessibilityPresetSaved", { name: name })
      );
    },

  }
}
</script>

<style scoped>
/* The active preset: pick it, rename it in place, save it or load one from the library */
.preset-bar {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: 12px;
  margin: 24px 40px 0;
  padding: 12px 14px;
  background-color: var(--c-panel);
  border: 1px solid var(--c-line);
  border-radius: 8px;
}

.preset-field {
  display: grid;
  gap: 4px;
}

.preset-label {
  font-family: var(--f-mono);
  font-size: 10px;
  letter-spacing: .08em;
  text-transform: uppercase;
  color: var(--c-muted);
}

.preset-field select, .preset-name {
  padding: 7px 10px;
  border: 1px solid var(--c-line);
  border-radius: 6px;
  background-color: var(--c-raised);
  color: var(--c-text);
  font-size: 13px;
}

.preset-field select {
  min-width: 200px;
}

.preset-name {
  width: 220px;
}

.preset-field select:focus-visible, .preset-name:focus {
  outline: 2px solid var(--c-accent);
  outline-offset: 1px;
}

.preset-bar .preset-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 7px 12px;
  border: 1px solid var(--c-line);
  border-radius: 6px;
  background-color: var(--c-raised);
  color: var(--c-text);
  font-weight: 600;
  font-size: 13px;
  cursor: pointer;
}

.preset-bar .preset-button.primary {
  background-color: var(--c-accent);
  border-color: var(--c-accent);
  color: var(--c-on-accent);
}

.preset-bar .preset-button:hover {
  filter: brightness(1.1);
}

.preset-bar .preset-button:focus-visible {
  outline: 2px solid var(--c-accent);
  outline-offset: 2px;
}

/* The cards wrap onto several rows instead of one long scrolling row */
.effects-page {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 16px;
  padding: 16px 40px 40px;
}

button {
  background-color: transparent;
  color: var(--c-text);
  border: 0;
  padding: 0;
  margin: 0;
}

button:focus {
  outline: none;
}

.openButton {
  border: 0;
  background-color: transparent;
  padding: 0;
  margin-left: 5px;

  display: inline-block;
  color: var(--c-muted);
  font-size: 14px;
}

.openButton:hover {
  color: var(--c-text);
  cursor: pointer;
}
</style>
