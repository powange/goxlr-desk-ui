<template>
  <AccessibleModal ref="modal" id="sampleAssign" :prevent_esc="busy" :show_close="!busy">
    <template v-slot:title>{{ $t('message.sampleAssign.title', { bank: bank, button: buttonLabel() }) }}</template>
    <template v-slot:default>
      <div class="bankRow">
        <span>{{ $t('message.sampleAssign.bank') }}</span>
        <button v-for="b in ['A', 'B', 'C']" :key="b" class="bankButton" :class="{ active: bank === b }"
                :disabled="busy" @click="bank = b">{{ b }}</button>
      </div>

      <ul class="samples">
        <li v-for="path in paths" :key="path">
          <font-awesome-icon icon="fa-solid fa-music"/>
          <span>{{ fileName(path) }}</span>
        </li>
      </ul>

      <p class="hint" v-if="currentSamples().length === 0">{{ $t('message.sampleAssign.empty') }}</p>
      <template v-else>
        <p class="hint">{{ $t('message.sampleAssign.current', { count: currentSamples().length }) }}</p>
        <ul class="current">
          <li v-for="(sample, index) in currentSamples()" :key="index">{{ sample.name }}</li>
        </ul>
      </template>

      <p class="progress" v-if="busy">{{ progressText }}</p>
      <p class="error" v-if="error !== undefined">{{ error }}</p>
    </template>
    <template v-slot:footer>
      <ModalButton ref="addButton" :enabled="!busy" @click="assign(false)">{{ $t('message.sampleAssign.add') }}</ModalButton>
      <ModalButton :enabled="!busy && currentSamples().length > 0" @click="assign(true)">{{ $t('message.sampleAssign.replace') }}</ModalButton>
      <ModalButton :enabled="!busy" @click="$refs.modal.closeModal()">{{ $t('message.sampleManager.cancel') }}</ModalButton>
    </template>
  </AccessibleModal>
</template>

<script>
import AccessibleModal from "@/components/design/modal/AccessibleModal.vue";
import ModalButton from "@/components/design/modal/ModalButton.vue";
import {store} from "@/store";
import {websocket} from "@/util/sockets";

// How long one sample may take to be added (its gain is calculated first)
const ADD_TIMEOUT = 120000;
const REMOVE_TIMEOUT = 10000;

export default {
  name: "SampleAssignModal",
  components: {ModalButton, AccessibleModal},

  data() {
    return {
      bank: "A",
      button: "TopLeft",
      paths: [],
      busy: false,
      progressText: "",
      error: undefined,
    }
  },

  methods: {
    open(button, paths) {
      this.bank = store.getActiveDevice().sampler.active_bank;
      this.button = button;
      this.paths = paths;
      this.busy = false;
      this.error = undefined;
      this.$refs.modal.openModal(this.$refs.addButton);
    },

    buttonLabel() {
      const keys = {TopLeft: "topLeft", TopRight: "topRight", BottomLeft: "bottomLeft", BottomRight: "bottomRight"};
      return this.$t(`message.sampler.banks.buttons.${keys[this.button]}`);
    },

    fileName(path) {
      return path.split('/').pop();
    },

    getButtonState() {
      return store.getActiveDevice().sampler.banks[this.bank][this.button];
    },

    currentSamples() {
      if (store.getActiveDevice() === undefined) return [];
      return this.getButtonState().samples;
    },

    async assign(replace) {
      this.busy = true;
      this.error = undefined;
      const serial = store.getActiveSerial();

      try {
        if (replace) {
          this.progressText = this.$t('message.sampleAssign.removing');
          // Removing index 0 each time, the list shrinks as we go
          for (let i = this.currentSamples().length; i > 0; i--) {
            await websocket.send_command(serial, {RemoveSampleByIndex: [this.bank, this.button, 0]});
          }
          // The reply comes before the status update, wait for the list to be empty so the
          // sample count used by addSample starts from 0.
          await this.waitFor(() => this.currentSamples().length === 0, REMOVE_TIMEOUT,
              this.$t('message.sampleAssign.timeoutRemove'));
        }

        for (const [index, path] of this.paths.entries()) {
          this.progressText = this.$t('message.sampleAssign.adding', {
            index: index + 1, total: this.paths.length, name: this.fileName(path)
          });
          await this.addSample(serial, path);
        }

        const message = this.$t('message.sampleAssign.done', {count: this.paths.length, bank: this.bank, button: this.buttonLabel()});
        store.setAccessibilityNotification("polite", message);
        this.busy = false;
        this.$refs.modal.closeModal();
      } catch (error) {
        this.busy = false;
        this.error = (error && error.Error) ? error.Error : String(error);
      }
    },

    // Sends AddSample, then waits for the daemon to finish the gain calculation and add the sample,
    // as it refuses a new one while a calculation is running.
    async addSample(serial, path) {
      const before = this.getButtonState().samples.length;
      await websocket.send_command(serial, {AddSample: [this.bank, this.button, path]});

      await this.waitFor(() => {
        const state = store.getActiveDevice().sampler.processing_state;
        if (state.last_error !== null) {
          const message = state.last_error;
          websocket.send_command(serial, {ClearSampleProcessError: []});
          throw `${this.fileName(path)} : ${message}`;
        }
        return this.getButtonState().samples.length > before && state.progress === null;
      }, ADD_TIMEOUT, this.$t('message.sampleAssign.timeout', {name: this.fileName(path)}));
    },

    // Polls the store until check() is true, or throws timeoutMessage.
    async waitFor(check, timeout, timeoutMessage) {
      const started = Date.now();
      while (!check()) {
        if (Date.now() - started > timeout) {
          throw timeoutMessage;
        }
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    },
  }
}
</script>

<style scoped>
.bankRow {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.bankButton {
  background-color: #353937;
  color: #fff;
  border: none;
  padding: 4px 14px;
}

.bankButton.active {
  background-color: #59b1b6;
  color: #000;
}

.bankButton:not(.active):not(:disabled):hover {
  background-color: #737775;
}

.samples, .current {
  margin: 0;
  padding-left: 0;
  list-style: none;
  max-height: 160px;
  overflow-y: auto;
}

.samples li {
  display: flex;
  gap: 8px;
  align-items: center;
  padding: 2px 0;
}

.current {
  padding-left: 18px;
  list-style: disc;
  font-size: 0.85em;
  color: #a5a7a6;
}

.hint {
  margin: 10px 0 4px 0;
  font-size: 0.85em;
  color: #a5a7a6;
}

.progress {
  margin: 10px 0 0 0;
}

.error {
  margin: 10px 0 0 0;
  color: #ff6b6b;
}
</style>
