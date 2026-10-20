<template>
  <div style="height: 30px; text-align: right">
    <div style="height: 14px; display: inline-block; width: calc(100% - 90px);">
      <hr style="border: 1px solid #2d3230"/>
    </div>
    <button ref="newFolderButton" class="openButton" :aria-label="$t('message.sampleManager.newFolder')"
            :title="$t('message.sampleManager.newFolder')" @click="openNewFolder">
      <font-awesome-icon icon="fa-solid fa-folder-plus"/>
    </button>
    <button class="openButton" :aria-label="$t('message.sampleManager.openFolder')"
            :title="$t('message.sampleManager.openFolder')" @click="openSamples">
      <font-awesome-icon icon="fa-solid fa-folder"/>
    </button>
  </div>
  <div style="height: 340px; overflow-y: scroll">
    <SampleFileSelector ref="selector" background="transparent" padding="6px" group="sample_list" prefix="list_sample_"
                        :manage="true"
                        @rename-folder="renameFolder" @rename-sample="renameSample"
                        @move-sample="moveSample" @move-sample-request="requestMove"/>
  </div>

  <!-- New folder / rename -->
  <AccessibleModal ref="nameModal" id="sampleName">
    <template v-slot:title>{{ getNameTitle() }}</template>
    <template v-slot:default>
      <ModalInput ref="nameInput" v-model="nameValue" :placeholder="$t('message.sampleManager.namePlaceholder')"
                  @on-enter="confirmName"/>
      <p v-if="extension !== ''" class="hint">{{ $t('message.sampleManager.extensionKept', { extension: extension }) }}</p>
    </template>
    <template v-slot:footer>
      <ModalButton @click="confirmName">{{ $t('message.sampleManager.ok') }}</ModalButton>
      <ModalButton @click="$refs.nameModal.closeModal()">{{ $t('message.sampleManager.cancel') }}</ModalButton>
    </template>
  </AccessibleModal>

  <!-- Move a sample to another folder -->
  <AccessibleModal ref="moveModal" id="sampleMove">
    <template v-slot:title>{{ $t('message.sampleManager.moveTitle', { name: moveName }) }}</template>
    <template v-slot:default>
      <select ref="moveSelect" v-model="moveTarget" class="folderSelect"
              :aria-label="$t('message.sampleManager.moveDestination')">
        <option v-for="folder in getFolderOptions()" :key="folder" :value="folder">
          {{ folder === '' ? $t('message.sampleManager.rootFolder') : folder }}
        </option>
      </select>
    </template>
    <template v-slot:footer>
      <ModalButton @click="confirmMove">{{ $t('message.sampleManager.move') }}</ModalButton>
      <ModalButton @click="$refs.moveModal.closeModal()">{{ $t('message.sampleManager.cancel') }}</ModalButton>
    </template>
  </AccessibleModal>

  <!-- The daemon refused an action -->
  <AccessibleModal ref="errorModal" id="sampleError">
    <template v-slot:title>{{ $t('message.sampleManager.errorTitle') }}</template>
    <template v-slot:default>{{ errorMessage }}</template>
  </AccessibleModal>
</template>

<script>
import {websocket} from "@/util/sockets";
import {store} from "@/store";
import SampleFileSelector from "@/components/sections/sampler/SampleFileSelector.vue";
import AccessibleModal from "@/components/design/modal/AccessibleModal.vue";
import ModalButton from "@/components/design/modal/ModalButton.vue";
import ModalInput from "@/components/design/modal/ModalInput.vue";

export default {
  name: "SampleHandler",
  components: {ModalInput, ModalButton, AccessibleModal, SampleFileSelector},

  data: function () {
    return {
      // What the name modal is for: 'newFolder', 'renameFolder' or 'renameSample'
      mode: undefined,
      nameValue: '',
      target: '',
      extension: '',

      moveSource: '',
      moveName: '',
      moveTarget: '',

      errorMessage: '',
    }
  },

  methods: {
    openSamples() {
      websocket.open_path("Samples");
    },

    getNameTitle() {
      if (this.mode === 'newFolder') {
        return this.$t('message.sampleManager.newFolder');
      }
      if (this.mode === 'renameFolder') {
        return this.$t('message.sampleManager.renameFolder');
      }
      return this.$t('message.sampleManager.renameSample');
    },

    openNameModal() {
      this.$refs.nameModal.openModal(this.$refs.nameInput, this.$refs.newFolderButton);
    },

    openNewFolder() {
      this.mode = 'newFolder';
      this.nameValue = '';
      this.extension = '';
      this.openNameModal();
    },

    renameFolder(path) {
      this.mode = 'renameFolder';
      this.target = path;
      this.nameValue = path.split('/').pop();
      this.extension = '';
      this.openNameModal();
    },

    renameSample(path, name) {
      // Only the name is edited, the extension (the file's format) is kept.
      let dot = name.lastIndexOf('.');
      this.mode = 'renameSample';
      this.target = path;
      this.nameValue = dot > 0 ? name.substring(0, dot) : name;
      this.extension = dot > 0 ? name.substring(dot) : '';
      this.openNameModal();
    },

    confirmName() {
      this.$refs.nameModal.closeModal();

      let name = this.nameValue.trim();
      if (name === '') {
        return;
      }
      if (name.includes('/') || name.includes('\\')) {
        this.showError(this.$t('message.sampleManager.invalidName'));
        return;
      }

      if (this.mode === 'newFolder') {
        let folder = this.$refs.selector.getCurrentFolder();
        this.send({CreateSampleFolder: folder.length > 0 ? `${folder}/${name}` : name});
        return;
      }

      let parent = this.target.split('/').slice(0, -1).join('/');
      let newName = name + this.extension;
      let destination = parent.length > 0 ? `${parent}/${newName}` : newName;
      this.moveSample(this.target, destination);
    },

    requestMove(path, name) {
      this.moveSource = path;
      this.moveName = name;
      this.moveTarget = this.$refs.selector.getCurrentFolder();
      this.$refs.moveModal.openModal(this.$refs.moveSelect, undefined);
    },

    confirmMove() {
      this.$refs.moveModal.closeModal();
      let destination = this.moveTarget.length > 0 ? `${this.moveTarget}/${this.moveName}` : this.moveName;
      this.moveSample(this.moveSource, destination);
    },

    moveSample(from, to) {
      if (from === to) {
        return;
      }
      this.send({MoveSamplePath: [from, to]});
    },

    getFolderOptions() {
      let folders = store.getSampleFolders().map((folder) => folder.replace(/\\/g, '/'));
      return ['', ...folders.sort(Intl.Collator().compare)];
    },

    send(command) {
      websocket.send_daemon_command(command).catch((error) => {
        let message = (error !== undefined && error.Error !== undefined) ? error.Error : String(error);
        this.showError(message);
      });
    },

    showError(message) {
      this.errorMessage = message;
      this.$refs.errorModal.openModal(undefined, undefined);
    },
  }
}
</script>

<style scoped>
.openButton {
  display: inline-block;
  color: #a5a7a6;
  background-color: transparent;
  border: 0;
  padding: 10px;
  font-size: 14px
}

.openButton:hover, .openButton:focus {
  color: #fff;
}

.folderSelect {
  width: 100%;
  background-color: #2B2F2D;
  border: 1px solid #3b413f;
  padding: 5px;
  color: #fff;
}

.hint {
  margin: 6px 0 0 0;
  font-size: 0.85em;
  color: #a5a7a6;
}
</style>
