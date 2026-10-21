<template>
  <!-- First steps on a new setup: the microphone and its gain, where the sound goes, then
       saving. Opens by itself while the default profile is in use, until finished or skipped. -->
  <AccessibleModal ref="modal" id="setupWizard" width="min(860px, 96vw)" :show_footer="false" @modal-close="onClose">
    <template v-slot:title>{{ $t('message.setupWizard.title', {step: step + 1, count: 3}) }}</template>

    <div class="wizard">
      <section v-if="step === 0">
        <h3>{{ $t('message.setupWizard.micTitle') }}</h3>
        <p>{{ $t('message.setupWizard.micText') }}</p>
        <SetupModel ref="setup"/>
      </section>

      <section v-else-if="step === 1">
        <h3>{{ $t('message.setupWizard.routingTitle') }}</h3>
        <p>{{ $t('message.setupWizard.routingText') }}</p>
        <ul>
          <li>{{ $t('message.routing.help.obs') }}</li>
          <li>{{ $t('message.routing.help.discord') }}</li>
          <li>{{ $t('message.routing.help.apps') }}</li>
        </ul>
        <AppButton variant="link" @click="$emit('open-section', 'routing'); close()">{{ $t('message.setupWizard.openRouting') }}</AppButton>
      </section>

      <section v-else>
        <h3>{{ $t('message.setupWizard.saveTitle') }}</h3>
        <p>{{ $t('message.setupWizard.saveText') }}</p>
        <AppButton variant="primary" @click="save">
          <font-awesome-icon icon="fa-solid fa-floppy-disk"/>
          <span>{{ $t('message.setupWizard.saveButton') }}</span>
        </AppButton>
      </section>

      <div class="actions">
        <AppButton variant="link" @click="finish">{{ $t('message.setupWizard.skip') }}</AppButton>
        <span class="grow"></span>
        <AppButton v-if="step > 0" @click="go(step - 1)">{{ $t('message.setupWizard.back') }}</AppButton>
        <AppButton v-if="step < 2" variant="primary" @click="go(step + 1)">{{ $t('message.setupWizard.next') }}</AppButton>
        <AppButton v-else variant="primary" @click="finish">{{ $t('message.setupWizard.finish') }}</AppButton>
      </div>
    </div>
  </AccessibleModal>
</template>

<script>
import AccessibleModal from "@/components/design/modal/AccessibleModal.vue";
import AppButton from "@/components/design/AppButton.vue";
import SetupModel from "@/components/sections/mic/SetupModel.vue";
import {store} from "@/store";
import {runCommand} from "@/util/sockets";

const DONE_KEY = "setupWizardDone";

export default {
  name: "SetupWizard",
  components: {AccessibleModal, AppButton, SetupModel},
  emits: ["open-section"],

  data() {
    return {step: 0};
  },

  mounted() {
    // From the System menu, at any time
    window.addEventListener("open-setup-wizard", this.open);
    let done = false;
    try {
      done = localStorage.getItem(DONE_KEY) === "1";
    } catch (e) {
      done = true;
    }
    // A new setup still uses the default profile
    if (!done && store.getActiveDevice().profile_name === "Default") {
      this.$nextTick(() => this.open());
    }
  },

  unmounted() {
    window.removeEventListener("open-setup-wizard", this.open);
  },

  methods: {
    open() {
      this.step = 0;
      this.$refs.modal.openModal(undefined, document.activeElement);
      this.$nextTick(() => this.$refs.setup && this.$refs.setup.opened());
    },

    close() {
      this.$refs.modal.closeModal();
    },

    go(step) {
      if (this.$refs.setup) this.$refs.setup.closed();
      this.step = step;
      this.$nextTick(() => this.$refs.setup && this.$refs.setup.opened());
    },

    save() {
      const serial = store.getActiveSerial();
      const device = store.getActiveDevice();
      runCommand(serial, {SaveProfile: []}).then(ok => {
        if (ok) runCommand(serial, {SaveMicProfile: []},
            {ok: this.$t('message.topBar.savedBoth', {profile: device.profile_name, mic: device.mic_profile_name})});
      });
    },

    finish() {
      try {
        localStorage.setItem(DONE_KEY, "1");
      } catch (e) {
        // Asked again next time
      }
      this.close();
    },

    onClose() {
      if (this.$refs.setup) this.$refs.setup.closed();
    },
  },
}
</script>

<style scoped>
.wizard {
  display: grid;
  gap: 14px;
  color: var(--c-text);
}

h3 {
  margin: 0 0 6px;
  font-size: 16px;
}

p {
  margin: 0 0 10px;
  color: var(--c-text-soft);
  max-width: 70ch;
}

ul {
  margin: 0 0 8px;
  padding-left: 18px;
  color: var(--c-text-soft);
  font-size: 13px;
}

.actions {
  display: flex;
  align-items: center;
  gap: 8px;
  border-top: 1px solid var(--c-line);
  padding-top: 12px;
}

.grow {
  flex: 1;
}
</style>
