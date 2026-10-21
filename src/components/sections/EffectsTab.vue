<template>
  <div class="preset-bar" role="group" :aria-label="$t('message.effects.preset.title')">
    <div class="preset-field">
      <span class="preset-label">{{ $t('message.effects.preset.title') }}</span>
      <SelectMenu class="preset-select" :options="getEffectOptions()" :selected="getActivePreset()"
                  @select="onEffectSelectionChange" :label="$t('message.effects.preset.group')"/>
    </div>
    <label class="preset-field">
      <span class="preset-label">{{ $t('message.effects.preset.name') }}</span>
      <input ref="nameInput" class="preset-name" type="text" v-model="nameDraft" maxlength="64"
             :aria-label="$t('message.effects.preset.menuRename')"
             @keydown.enter="commitName" @keydown.esc="nameDraft = getCurrentPresetName(); $refs.nameInput.blur()"
             @blur="commitName"/>
    </label>
    <AppButton ref="saveButton" variant="primary" @click="savePressed">
      <font-awesome-icon icon="fa-solid fa-floppy-disk"/>
      <span>{{ $t('message.effects.preset.menuSave') }}</span>
    </AppButton>
    <AppButton ref="loadButton" @click="$refs.select_preset_modal.openModal(undefined, $refs.loadButton)">
      <font-awesome-icon icon="fa-solid fa-folder"/>
      <span>{{ $t('message.effects.preset.menuLoad') }}</span>
    </AppButton>
    <AppButton ref="lightingButton" @click="openLighting()">
      <font-awesome-icon icon="fa-solid fa-lightbulb"/>
      <span>{{ $t('message.common.lighting') }}</span>
    </AppButton>
    <span class="grow"></span>
    <label class="master">
      <span class="preset-label">{{ $t('message.effects.face.master') }}</span>
      <Toggle :model-value="isFxEnabled()" @update:model-value="setFxEnabled" :label="$t('message.effects.face.master')"/>
    </label>
  </div>

  <div class="effects-page">
    <EffectsFace :selected="selectedEffect" @select="selectedEffect = $event"/>

    <div class="effect-settings">
      <div v-if="isButtonEffect()" class="settings-head">
        <span class="settings-label">{{ $t('message.effects.face.enabled') }}</span>
        <Toggle :model-value="isSelectedEnabled()" @update:model-value="setSelectedEnabled"
                :label="$t('message.effects.face.power', { effect: getSelectedName() })"/>
      </div>
      <component :is="getSelectedComponent()"/>
    </div>
  </div>

  <!-- Modals -->
  <AccessibleModal ref="lightingModal" id="effectsLighting" width="min(640px, 94vw)" body-padding="0"
                   @modal-close="lightingOpen = false">
    <template v-slot:title>{{ $t('message.effects.lighting.title') }}</template>
    <EffectsLighting v-if="lightingOpen" :preset="getActivePreset()" :preset-name="getCurrentPresetName()"
                     :selected-effect="selectedEffect"/>
  </AccessibleModal>


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
import AppButton from "@/components/design/AppButton.vue";
import ReverbEffect from "@/components/sections/effects/ReverbEffect.vue";
import SelectMenu from "@/components/design/SelectMenu.vue";
import EchoEffect from "@/components/sections/effects/EchoEffect.vue";
import PitchEffect from "@/components/sections/effects/PitchEffect.vue";
import GenderEffect from "@/components/sections/effects/GenderEffect.vue";
import MegaphoneEffect from "@/components/sections/effects/MegaphoneEffect.vue";
import RobotEffect from "@/components/sections/effects/RobotEffect.vue";
import HardTuneEffect from "@/components/sections/effects/HardTuneEffect.vue";
import {EffectPresets} from "@/util/mixerMapping";
import EffectsFace from "@/components/sections/effects/EffectsFace.vue";
import Toggle from "@/components/design/Toggle.vue";
import EffectsLighting from "@/components/sections/effects/lighting/EffectsLighting.vue";

// The settings shown under the device face, and the command switching a button effect
const EFFECT_COMPONENTS = {
  reverb: ReverbEffect, echo: EchoEffect, pitch: PitchEffect, gender: GenderEffect,
  megaphone: MegaphoneEffect, robot: RobotEffect, hard_tune: HardTuneEffect,
};
const ENABLE_COMMANDS = {megaphone: "SetMegaphoneEnabled", robot: "SetRobotEnabled", hard_tune: "SetHardTuneEnabled"};
const TITLE_KEYS = {reverb: "reverb", echo: "echo", pitch: "pitch", gender: "gender", megaphone: "megaphone", robot: "robot", hard_tune: "hardTune"};
import {store} from "@/store";
import {websocket} from "@/util/sockets";
import ModalButton from "@/components/design/modal/ModalButton.vue";
import AccessibleModal from "@/components/design/modal/AccessibleModal.vue";
import ScrollingRadioList from "@/components/lists/ScrollingRadioList.vue";

export default {
  emits: ["on-effect-preset-change"],

  name: "EffectsTab",
  components: {AppButton, SelectMenu, 
    EffectsLighting,
    EffectsFace,
    Toggle,
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
      // The effect whose settings are shown
      selectedEffect: "reverb",
      lightingOpen: false,
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
    // The effects' lighting (moved here from the Lighting section)
    openLighting() {
      this.lightingOpen = false;
      this.$nextTick(() => {
        this.lightingOpen = true;
        this.$refs.lightingModal.openModal(undefined, this.$refs.lightingButton);
      });
    },

    getSelectedComponent() {
      return EFFECT_COMPONENTS[this.selectedEffect];
    },

    getSelectedName() {
      return this.$t(`message.effects.${TITLE_KEYS[this.selectedEffect]}.title`);
    },

    isButtonEffect() {
      return ENABLE_COMMANDS[this.selectedEffect] !== undefined;
    },

    isSelectedEnabled() {
      return store.getActiveDevice().effects.current[this.selectedEffect].is_enabled;
    },

    setSelectedEnabled(enabled) {
      websocket.send_command(store.getActiveSerial(), {[ENABLE_COMMANDS[this.selectedEffect]]: enabled});
    },

    isFxEnabled() {
      return store.getActiveDevice().effects.is_enabled;
    },

    setFxEnabled(enabled) {
      websocket.send_command(store.getActiveSerial(), {SetFXEnabled: enabled});
    },

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
      // Saving under a name that's already in the library asks before overwriting it. The name
      // typed may not have reached the device yet, so check that one.
      const name = this.nameDraft.trim() || this.getCurrentPresetName();
      if (name !== this.getCurrentPresetName()) this.commitName();
      if (store.getPresetFiles().includes(name)) {
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
  margin: var(--page-gutter) var(--page-gutter) 0;
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
  border: 1px solid var(--c-field-border);
  border-radius: 6px;
  background-color: var(--c-raised);
  color: var(--c-text);
  font-size: 13px;
}

.preset-select {
  min-width: 200px;
}

.preset-name {
  width: 220px;
}

.preset-field select:focus-visible, .preset-name:focus {
  outline: 2px solid var(--c-accent);
  outline-offset: 1px;
}

.grow {
  flex: 1;
}

.master {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  align-self: center;
}

/* The device face, then the selected effect's settings */
.effects-page {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 16px;
  padding: 16px var(--page-gutter) var(--page-gutter);
}

.effect-settings {
  display: grid;
  gap: 10px;
  justify-items: start;
  min-width: 0;
}

/* The selected effect's settings wrap onto several rows rather than widening the page */
.effect-settings :deep(.container) {
  max-width: 100%;
  box-sizing: border-box;
}

.effect-settings :deep(.content) {
  flex-wrap: wrap;
  row-gap: 10px;
  width: auto;
  justify-content: flex-start;
}

.settings-head {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  background-color: var(--c-panel);
  border: 1px solid var(--c-line);
  border-radius: 8px;
}

.settings-label {
  font-family: var(--f-mono);
  font-size: 10px;
  letter-spacing: .08em;
  text-transform: uppercase;
  color: var(--c-muted);
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
