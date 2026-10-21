<template>
  <!-- Asks for a name (rename, duplicate), refusing one already used or that can't be a file name -->
  <AccessibleModal ref="modal" :id="id" :show_close="false">
    <template v-slot:title>{{ title }}</template>
    <template v-slot:default>
      <label class="name-field">
        <span>{{ $t('message.profileManager.nameLabel') }}</span>
        <ModalInput ref="input" v-model="name" @on-enter="submit"/>
      </label>
      <p v-if="problem()" class="problem" role="alert">{{ problem() }}</p>
    </template>
    <template v-slot:footer>
      <ModalButton :enabled="!problem()" @click="submit">{{ okLabel }}</ModalButton>
      <ModalButton @click="$refs.modal.closeModal()">{{ $t('message.sampleManager.cancel') }}</ModalButton>
    </template>
  </AccessibleModal>
</template>

<script>
import AccessibleModal from "@/components/design/modal/AccessibleModal.vue";
import ModalButton from "@/components/design/modal/ModalButton.vue";
import ModalInput from "@/components/design/modal/ModalInput.vue";

const RESERVED = /^(con|prn|aux|nul|com[1-9]|lpt[1-9])(\..*)?$/i;

export default {
  name: "NameDialog",
  components: {AccessibleModal, ModalButton, ModalInput},
  emits: ["submit"],

  props: {
    id: {type: String, required: true},
    title: {type: String, required: true},
    okLabel: {type: String, required: true},
    // Names already used (compared without case)
    taken: {type: Array, default: () => []},
  },

  data() {
    return {name: "", original: ""};
  },

  methods: {
    open(name, returnFocus) {
      this.name = name;
      this.original = name;
      this.$refs.modal.openModal(this.$refs.input, returnFocus);
    },

    // The same rules as the daemon's, so the problem shows while typing
    problem() {
      const name = this.name.trim();
      if (name === "") return this.$t('message.profileManager.nameEmpty');
      if (/[/\\:*?"<>|\x00-\x1f]/.test(name) || RESERVED.test(name) || /[. ]$/.test(name) || name === "." || name === "..") {
        return this.$t('message.profileManager.nameInvalid');
      }
      const lower = name.toLowerCase();
      if (lower !== this.original.toLowerCase() && this.taken.some(used => used.toLowerCase() === lower)) {
        return this.$t('message.profileManager.nameTaken', {name});
      }
      if (name === this.original) return " ";
      return "";
    },

    submit() {
      if (this.problem()) return;
      this.$refs.modal.closeModal();
      this.$emit("submit", this.name.trim());
    },
  },
}
</script>

<style scoped>
.name-field {
  display: grid;
  gap: 6px;
  color: var(--c-muted);
  font-size: 13px;
}

.problem {
  margin: 8px 0 0;
  min-height: 1em;
  color: var(--c-danger);
  font-size: 13px;
}
</style>
