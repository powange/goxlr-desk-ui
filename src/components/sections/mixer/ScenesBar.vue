<template>
  <!-- Scenes: a few settings (volumes, mutes, routing, effects, sampler bank) saved under a name
       and brought back in one click, without loading a whole profile -->
  <div class="scenes" role="group" :aria-label="$t('message.scenes.title')">
    <span class="scenes-label">{{ $t('message.scenes.title') }}</span>
    <div v-for="name in sceneNames()" :key="name" class="scene">
      <button type="button" class="scene-run" @click="run(name)" :title="$t('message.scenes.runHint', {name})">{{ name }}</button>
      <button type="button" class="scene-update" @click="ask('update', name, $event)"
              :aria-label="$t('message.scenes.update', {name})" :title="$t('message.scenes.update', {name})">
        <font-awesome-icon icon="fa-solid fa-floppy-disk"/>
      </button>
      <button type="button" class="scene-delete" @click="ask('delete', name, $event)"
              :aria-label="$t('message.scenes.delete', {name})" :title="$t('message.scenes.delete', {name})">
        <font-awesome-icon icon="fa-solid fa-xmark"/>
      </button>
    </div>
    <span v-if="sceneNames().length === 0" class="scenes-empty">{{ $t('message.scenes.empty') }}</span>
    <AppButton ref="newButton" variant="link" @click="$refs.nameDialog.open('', $refs.newButton)">
      {{ $t('message.scenes.new') }}
    </AppButton>
  </div>

  <NameDialog ref="nameDialog" id="sceneName" :title="$t('message.scenes.newTitle')" :ok-label="$t('message.scenes.create')"
              :taken="sceneNames()" @submit="capture"/>

  <!-- Replacing or deleting a scene can't be undone: the buttons are small and next to the
       scene's own, so a missed click asks first -->
  <AccessibleModal ref="confirmModal" id="sceneConfirm" :show_close="false">
    <template v-slot:title>{{ $t(pending.action === 'delete' ? 'message.scenes.deleteTitle' : 'message.scenes.updateTitle', {name: pending.name}) }}</template>
    <template v-slot:default>{{ $t(pending.action === 'delete' ? 'message.scenes.deleteQuestion' : 'message.scenes.updateQuestion', {name: pending.name}) }}</template>
    <template v-slot:footer>
      <ModalButton @click="confirm">{{ $t(pending.action === 'delete' ? 'message.scenes.deleteYes' : 'message.scenes.updateYes') }}</ModalButton>
      <ModalButton ref="cancel" @click="$refs.confirmModal.closeModal()">{{ $t('message.sampleManager.cancel') }}</ModalButton>
    </template>
  </AccessibleModal>
</template>

<script>
import AppButton from "@/components/design/AppButton.vue";
import NameDialog from "@/components/profiles/NameDialog.vue";
import AccessibleModal from "@/components/design/modal/AccessibleModal.vue";
import ModalButton from "@/components/design/modal/ModalButton.vue";
import {store} from "@/store";
import {runCommand} from "@/util/sockets";
import {isDeviceMini} from "@/util/util";
import {InputRouting, OutputRouting} from "@/util/mixerMapping";

export default {
  name: "ScenesBar",
  components: {AppButton, NameDialog, AccessibleModal, ModalButton},

  data() {
    return {
      // The replace or delete waiting for confirmation
      pending: {action: "", name: ""},
    };
  },

  methods: {
    sceneNames() {
      return Object.keys(store.getActiveDevice().scenes || {});
    },

    // The commands that bring the current state back
    currentState() {
      const device = store.getActiveDevice();
      const commands = [];
      for (const [channel, volume] of Object.entries(device.levels.volumes)) {
        commands.push({SetVolume: [channel, volume]});
      }
      for (const [fader, status] of Object.entries(device.fader_status)) {
        commands.push({SetFaderMuteState: [fader, status.mute_state]});
      }
      if (device.cough_button.is_toggle) {
        commands.push({SetCoughMuteState: device.cough_button.state});
      }
      for (const input of InputRouting) {
        for (const output of OutputRouting) {
          const enabled = device.router[input] && device.router[input][output];
          if (enabled !== undefined) commands.push({SetRouter: [input, output, enabled]});
        }
      }
      if (!isDeviceMini()) {
        const effects = device.effects;
        commands.push({SetActiveEffectPreset: effects.active_preset});
        commands.push({SetFXEnabled: effects.is_enabled});
        commands.push({SetMegaphoneEnabled: effects.current.megaphone.is_enabled});
        commands.push({SetRobotEnabled: effects.current.robot.is_enabled});
        commands.push({SetHardTuneEnabled: effects.current.hard_tune.is_enabled});
        commands.push({SetActiveSamplerBank: device.sampler.active_bank});
      }
      return commands;
    },

    capture(name) {
      runCommand(store.getActiveSerial(), {SaveScene: [name, this.currentState()]},
          {ok: this.$t('message.scenes.saved', {name})});
    },

    run(name) {
      runCommand(store.getActiveSerial(), {RunScene: name}, {a11y: this.$t('message.scenes.ran', {name})});
    },

    ask(action, name, event) {
      this.pending = {action, name};
      this.$refs.confirmModal.openModal(this.$refs.cancel, event.currentTarget);
    },

    confirm() {
      const {action, name} = this.pending;
      this.$refs.confirmModal.closeModal();
      if (action === "delete") this.remove(name); else this.capture(name);
    },

    remove(name) {
      runCommand(store.getActiveSerial(), {DeleteScene: name}, {ok: this.$t('message.scenes.deleted', {name})});
    },
  },
}
</script>

<style scoped>
.scenes {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border: 1px solid var(--c-line);
  border-radius: 8px;
  background-color: var(--c-panel);
}

.scenes-label {
  font-family: var(--f-mono);
  font-size: 11px;
  letter-spacing: .08em;
  text-transform: uppercase;
  color: var(--c-muted);
  margin-right: 4px;
}

.scenes-empty {
  font-size: 12px;
  color: var(--c-muted);
}

.scene {
  display: inline-flex;
  border: 1px solid var(--c-field-border);
  border-radius: 6px;
  overflow: hidden;
}

.scene button {
  border: none;
  background-color: var(--c-raised);
  color: var(--c-text);
  font-size: 13px;
  cursor: pointer;
  padding: 6px 10px;
}

.scene .scene-run {
  font-weight: 600;
}

.scene .scene-update, .scene .scene-delete {
  padding: 6px 8px;
  color: var(--c-muted);
  border-left: 1px solid var(--c-line);
}

.scene button:hover {
  background-color: var(--c-hover);
  color: var(--c-text);
}

.scene button:focus-visible {
  outline: 2px solid var(--c-accent);
  outline-offset: -2px;
}
</style>
