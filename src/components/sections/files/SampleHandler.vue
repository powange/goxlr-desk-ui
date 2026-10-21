<template>
  <div class="toolbar">
    <div class="line"><hr/></div>
    <span v-if="importing" class="importing">{{ $t('message.sampleManager.importing') }}</span>
    <button class="toolButton" :title="$t('message.sampleManager.import')" :aria-label="$t('message.sampleManager.import')"
            @click="$refs.importInput.click()">
      <font-awesome-icon icon="fa-solid fa-file-import"/>
    </button>
    <input ref="importInput" type="file" multiple accept=".wav,.mp3,.ogg,.flac,audio/*" class="hidden"
           @change="importFromInput"/>
    <button class="toolButton" :class="{ active: multi }" :title="$t('message.sampleManager.multiSelect')"
            :aria-label="$t('message.sampleManager.multiSelect')" :aria-pressed="multi" @click="multi = !multi">
      <font-awesome-icon icon="fa-solid fa-square-check"/>
    </button>
    <button ref="newFolderButton" class="toolButton" :title="$t('message.sampleManager.newFolder')"
            :aria-label="$t('message.sampleManager.newFolder')" @click="openNewFolder">
      <font-awesome-icon icon="fa-solid fa-folder-plus"/>
    </button>
    <button ref="trashButton" class="toolButton" :title="$t('message.sampleManager.trash')"
            :aria-label="$t('message.sampleManager.trashCount', { count: getTrash().length })" @click="openTrash">
      <font-awesome-icon icon="fa-solid fa-trash-can"/>
      <span v-if="getTrash().length > 0" class="count">{{ getTrash().length }}</span>
    </button>
    <button class="toolButton" :title="$t('message.sampleManager.openFolder')"
            :aria-label="$t('message.sampleManager.openFolder')" @click="openSamples">
      <font-awesome-icon icon="fa-solid fa-folder"/>
    </button>
  </div>
  <div style="height: 340px; overflow-y: scroll">
    <SampleBrowser ref="browser" :multi="multi"
                   @rename-folder="renameFolder" @delete-folder="deleteFolder"
                   @rename-sample="renameSample" @move-sample="moveSample" @move-many="moveMany" @move-samples="requestMove"
                   @edit-sample="editSample" @delete-samples="deleteSamples" @duplicate-sample="duplicateSample"
                   @import-files="importFiles" @end-multi="multi = false"/>
  </div>

  <SampleEditor ref="editor"/>

  <!-- Move samples or folders to the trash -->
  <AccessibleModal ref="deleteModal" id="sampleDelete">
    <template v-slot:title>{{ deleteTitle }}</template>
    <template v-slot:default>
      <p class="question">{{ deleteQuestion }}</p>
      <template v-if="deleteProfiles.length > 0">
        <p class="warning">{{ $t('message.sampleManager.usedByProfiles') }}</p>
        <ul class="profiles">
          <li v-for="profile in deleteProfiles" :key="profile">{{ profile }}</li>
        </ul>
        <p class="hint">{{ $t('message.sampleManager.usedByProfilesHint') }}</p>
      </template>
      <p class="hint">{{ $t('message.sampleManager.trashHint') }}</p>
    </template>
    <template v-slot:footer>
      <ModalButton @click="confirmDelete">{{ $t('message.sampleManager.moveToTrash') }}</ModalButton>
      <ModalButton ref="deleteCancel" @click="$refs.deleteModal.closeModal()">{{ $t('message.sampleManager.cancel') }}</ModalButton>
    </template>
  </AccessibleModal>

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

  <!-- Move samples to another folder -->
  <AccessibleModal ref="moveModal" id="sampleMove">
    <template v-slot:title>{{ getMoveTitle() }}</template>
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

  <!-- The trash -->
  <AccessibleModal ref="trashModal" id="sampleTrash" width="560px">
    <template v-slot:title>{{ $t('message.sampleManager.trash') }}</template>
    <template v-slot:default>
      <p v-if="getTrash().length === 0" class="hint">{{ $t('message.sampleManager.trashEmpty') }}</p>
      <ul v-else class="trashList">
        <li v-for="item in getTrash()" :key="item.id">
          <div class="trashInfo">
            <font-awesome-icon :icon="item.folder ? 'fa-solid fa-folder' : 'fa-solid fa-music'"/>
            <span class="trashPath">{{ item.path }}</span>
            <span class="hint">
              {{ formatDate(item.deleted_at) }}<template v-if="item.folder"> · {{ $t('message.sampleManager.folderCount', { count: item.files }) }}</template>
            </span>
          </div>
          <button @click="send({ RestoreSampleTrash: item.id })">{{ $t('message.sampleManager.restore') }}</button>
          <button @click="send({ EmptySampleTrash: item.id })">{{ $t('message.sampleManager.deleteForever') }}</button>
        </li>
      </ul>
      <p class="hint">{{ $t('message.sampleManager.trashRetention') }}</p>
    </template>
    <template v-slot:footer>
      <ModalButton v-if="getTrash().length > 0" @click="emptyTrash">
        {{ confirmEmpty ? $t('message.sampleManager.emptyTrashConfirm') : $t('message.sampleManager.emptyTrash') }}
      </ModalButton>
      <ModalButton ref="trashClose" @click="$refs.trashModal.closeModal()">{{ $t('message.sampleManager.close') }}</ModalButton>
    </template>
  </AccessibleModal>

  <!-- The daemon refused an action -->
  <AccessibleModal ref="errorModal" id="sampleError">
    <template v-slot:title>{{ $t('message.sampleManager.errorTitle') }}</template>
    <template v-slot:default><p class="errorText">{{ errorMessage }}</p></template>
  </AccessibleModal>
</template>

<script>
import {getBaseHTTPAddress, websocket} from "@/util/sockets";
import {store} from "@/store";
import SampleBrowser from "@/components/sections/files/SampleBrowser.vue";
import SampleEditor from "@/components/sections/files/SampleEditor.vue";
import AccessibleModal from "@/components/design/modal/AccessibleModal.vue";
import ModalButton from "@/components/design/modal/ModalButton.vue";
import ModalInput from "@/components/design/modal/ModalInput.vue";

export default {
  name: "SampleHandler",
  components: {SampleBrowser, SampleEditor, ModalInput, ModalButton, AccessibleModal},

  data: function () {
    return {
      multi: false,
      importing: false,

      // What the name modal is for: 'newFolder', 'renameFolder' or 'renameSample'
      mode: undefined,
      nameValue: '',
      target: '',
      extension: '',

      movePaths: [],
      moveTarget: '',

      deletePaths: [],
      deleteTitle: '',
      deleteQuestion: '',
      deleteProfiles: [],

      confirmEmpty: false,
      errorMessage: '',
    }
  },

  methods: {
    openSamples() {
      websocket.open_path("Samples");
    },

    currentFolder() {
      return this.$refs.browser.getCurrentFolder();
    },

    nameOf(path) {
      return path.split('/').pop();
    },

    // ---------- Names ----------

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
      this.nameValue = this.nameOf(path);
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
        let folder = this.currentFolder();
        this.send({CreateSampleFolder: folder.length > 0 ? `${folder}/${name}` : name});
        return;
      }

      let parent = this.target.split('/').slice(0, -1).join('/');
      let newName = name + this.extension;
      this.moveSample(this.target, parent.length > 0 ? `${parent}/${newName}` : newName);
    },

    // ---------- Moving ----------

    getMoveTitle() {
      return this.movePaths.length === 1
          ? this.$t('message.sampleManager.moveTitle', {name: this.nameOf(this.movePaths[0])})
          : this.$t('message.sampleManager.moveManyTitle', {count: this.movePaths.length});
    },

    requestMove(paths) {
      this.movePaths = paths;
      this.moveTarget = this.currentFolder();
      this.$refs.moveModal.openModal(this.$refs.moveSelect, undefined);
    },

    confirmMove() {
      this.$refs.moveModal.closeModal();
      this.moveMany(this.movePaths.map((path) => {
        let name = this.nameOf(path);
        return [path, this.moveTarget.length > 0 ? `${this.moveTarget}/${name}` : name];
      }));
    },

    // Several moves, one after the other, with all their errors shown together
    moveMany(moves) {
      this.sendAll(moves.filter(([from, to]) => from !== to).map(([from, to]) => ({MoveSamplePath: [from, to]})));
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

    // ---------- Editing and duplicating ----------

    editSample(path, name) {
      this.$refs.editor.open(path, name, undefined);
    },

    duplicateSample(path) {
      this.send({DuplicateSample: path});
    },

    // ---------- Deleting (to the trash) ----------

    deleteSamples(paths) {
      if (paths.length === 0) {
        return;
      }
      this.askDelete(paths, () => {
        this.deleteTitle = this.$t('message.sampleManager.deleteSampleTitle');
        this.deleteQuestion = paths.length === 1
            ? this.$t('message.sampleManager.deleteSampleQuestion', {name: this.nameOf(paths[0])})
            : this.$t('message.sampleManager.deleteSamplesQuestion', {count: paths.length});
      });
    },

    deleteFolder(path, name) {
      this.askDelete([path], (files) => {
        this.deleteTitle = this.$t('message.sampleManager.deleteFolderTitle');
        this.deleteQuestion = files > 0
            ? this.$t('message.sampleManager.deleteFolderQuestion', {name: name, count: files})
            : this.$t('message.sampleManager.deleteEmptyFolderQuestion', {name: name});
      });
    },

    // Asks the daemon which profiles use what's about to be deleted, then asks for confirmation.
    askDelete(paths, describe) {
      this.deletePaths = paths;
      Promise.all(paths.map((path) => websocket.get_sample_usage(path))).then((responses) => {
        let profiles = new Set();
        let files = 0;
        for (let response of responses) {
          files += response.SampleUsage.files;
          response.SampleUsage.profiles.forEach((profile) => profiles.add(profile));
        }
        describe(files);
        this.deleteProfiles = [...profiles].sort(Intl.Collator().compare);
        this.$refs.deleteModal.openModal(this.$refs.deleteCancel, undefined);
      }).catch((error) => this.showError(this.errorText(error)));
    },

    confirmDelete() {
      this.$refs.deleteModal.closeModal();
      this.sendAll(this.deletePaths.map((path) => ({DeleteSamplePath: path})));
      this.multi = false;
    },

    // ---------- Trash ----------

    getTrash() {
      return store.getSampleTrash();
    },

    openTrash() {
      this.confirmEmpty = false;
      this.$refs.trashModal.openModal(this.$refs.trashClose, this.$refs.trashButton);
    },

    emptyTrash() {
      if (!this.confirmEmpty) {
        this.confirmEmpty = true;
        return;
      }
      this.confirmEmpty = false;
      this.send({EmptySampleTrash: null});
    },

    formatDate(seconds) {
      return new Date(seconds * 1000).toLocaleString();
    },

    // ---------- Importing ----------

    importFromInput(event) {
      let files = [...event.target.files];
      event.target.value = '';
      this.importFiles(files, this.currentFolder());
    },

    importFiles(files, folder) {
      if (files.length === 0) {
        return;
      }
      let form = new FormData();
      for (let file of files) {
        form.append("file", file, file.name);
      }

      this.importing = true;
      let url = getBaseHTTPAddress() + "files/samples-import?folder=" + encodeURIComponent(folder);
      fetch(url, {method: "POST", body: form})
          .then((response) => response.json())
          .then((result) => {
            if (result !== "Ok" && result.Error !== undefined) {
              this.showError(result.Error);
            }
          })
          .catch((error) => this.showError(String(error)))
          .finally(() => this.importing = false);
    },

    // ---------- Daemon ----------

    errorText(error) {
      return (error !== undefined && error.Error !== undefined) ? error.Error : String(error);
    },

    send(command) {
      return websocket.send_daemon_command(command).catch((error) => {
        this.showError(this.errorText(error));
        throw error;
      }).catch(() => {});
    },

    // Sends commands one after the other, collecting the errors.
    sendAll(commands) {
      let errors = [];
      let chain = Promise.resolve();
      for (let command of commands) {
        chain = chain.then(() => websocket.send_daemon_command(command).catch((error) => {
          errors.push(this.errorText(error));
        }));
      }
      chain.then(() => {
        if (errors.length > 0) {
          this.showError(errors.join("\n"));
        }
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
.toolbar {
  height: 30px;
  display: flex;
  align-items: center;
}

.line {
  flex: 1;
}

.line hr {
  border: 1px solid var(--c-line);
}

.toolButton {
  position: relative;
  color: var(--c-muted);
  background-color: transparent;
  border: 0;
  padding: 8px;
  font-size: 14px;
  cursor: pointer;
}

.toolButton:hover, .toolButton:focus, .toolButton.active {
  color: var(--c-text);
}

.toolButton.active {
  color: var(--c-accent);
}

.count {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 9px;
  background-color: var(--c-accent);
  color: var(--c-on-accent);
  border-radius: 6px;
  padding: 0 3px;
}

.importing {
  font-size: 0.85em;
  color: var(--c-muted);
  margin-right: 6px;
}

.hidden {
  display: none;
}

.folderSelect {
  width: 100%;
  background-color: var(--c-disabled);
  border: 1px solid var(--c-line);
  padding: 5px;
  color: var(--c-text);
}

.question {
  margin: 0 0 10px 0;
}

.warning {
  margin: 0;
  font-weight: bold;
}

.profiles {
  margin: 6px 0;
}

.hint {
  margin: 6px 0 0 0;
  font-size: 0.85em;
  color: var(--c-muted);
}

.trashList {
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 300px;
  overflow-y: auto;
}

.trashList li {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 0;
  border-bottom: 1px solid var(--c-line);
}

.trashInfo {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.trashPath {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.trashList button {
  background-color: var(--c-raised-2);
  border: 1px solid var(--c-line);
  color: var(--c-text);
  padding: 3px 8px;
  cursor: pointer;
}

.errorText {
  white-space: pre-line;
  margin: 0;
}
</style>
