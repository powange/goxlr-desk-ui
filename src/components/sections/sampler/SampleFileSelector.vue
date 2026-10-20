<template>
  <VerticalScrollingContainer :max-height="maxHeight" v-if="showSamples()">
    <div v-if="getDirectoryList().length > 0">
      <p class="title screenreader-only" role="heading">{{$t('message.sampler.samples.sampleSelector.directories')}}</p>
      <div class="buttons">
        <div v-for="(directory, index) in getDirectoryList()" v-bind:key="index" class="folderRow"
             :class="{ dropTarget: dropTarget === directory.id }"
             @dragover="onFolderDragOver($event, directory.id)" @dragleave="onFolderDragLeave(directory.id)"
             @drop="onFolderDrop($event, directory.id)">
          <ButtonItem :id="directory.id" class="folderButton"
                      text="" @on-click="selectDirectory" ref="button" :background="background">
            <font-awesome-icon v-if="directory.icon !== undefined" :icon="directory.icon"/>
            {{ directory.label }}
          </ButtonItem>
          <button v-if="manage && directory.folder !== undefined" class="folderAction"
                  :aria-label="$t('message.sampleManager.renameFolderLabel', { name: directory.label })"
                  :title="$t('message.sampleManager.rename')"
                  @click="$emit('rename-folder', currentPathTo(directory.folder))">
            <font-awesome-icon icon="fa-solid fa-pen"/>
          </button>
          <button v-if="manage && directory.folder !== undefined" class="folderAction"
                  :aria-label="$t('message.sampleManager.deleteFolderLabel', { name: directory.label })"
                  :title="$t('message.sampleManager.delete')"
                  @click="$emit('delete-folder', currentPathTo(directory.folder), directory.label)">
            <font-awesome-icon icon="fa-solid fa-trash"/>
          </button>
        </div>
      </div>
    </div>

    <div v-if="getSampleList().length > 0">
      <p class="title screenreader-only" role="heading">{{$t('message.sampler.samples.sampleSelector.samples')}}</p>
      <RadioList
          ref="sampleList"
          :padding="padding"
          :background="background"
          :group="`${this.prefix}_sample_list`"
          :options="getSampleList()"
          :selected="getSelectedSample()"
          @selection-changed="selectSample"
          :menu="manage ? getSampleMenu() : undefined"
          :menu_id="`${prefix}_sample_menu`"
          :scroll-top="getMenuScrollOffset"
          @menu-selected="sampleMenuSelected"
          :draggable="manage"
          @item-dragstart="onSampleDragStart"
          @item-dragend="onSampleDragEnd"
          @item-dblclick="onSampleDoubleClick"
      />
    </div>
  </VerticalScrollingContainer>

  <span v-else>
    {{ $t('message.sampler.samples.sampleSelector.noSamples') }}
  </span>
</template>

<script>
import {store} from "@/store";
import {getBaseHTTPAddress} from "@/util/sockets";
import VerticalScrollingContainer from "@/components/containers/VerticalScrollingContainer.vue";
import ButtonItem from "@/components/lists/ButtonItem.vue";
import RadioList from "@/components/lists/RadioList.vue";

export default {
  name: "SampleFileSelector",
  components: {RadioList, ButtonItem, VerticalScrollingContainer},

  // Only emitted when 'manage' is set, paths are relative to the samples folder ('/' separated).
  emits: ['rename-folder', 'rename-sample', 'move-sample', 'move-sample-request', 'edit-sample', 'delete-sample',
    'delete-folder'],

  props: {
    prefix: { type: String, optional: false },
    maxHeight: {type: String, optional: true, default: "inherit"},
    padding: {type: String, required: false, default: "8px"},
    background: {type: String, required: false, default: "#3b413f"},
    group: {type: String, required: true},

    // Enables managing the files: renaming folders and samples, and moving samples into folders.
    manage: {type: Boolean, required: false, default: false},
  },

  data() {
    return {
      current_path: [],
      selectedSample: undefined,

      audio_player: undefined,
      audio_playing: false,

      // The sample being dragged, and the folder it's over
      dragging: undefined,
      dropTarget: undefined,
    }
  },

  methods: {
    showSamples() {
      return this.getSampleList().length > 0 || this.getDirectoryList().length > 0;
    },


    getDirectoryList() {
      let samples = [];
      if (this.current_path.length > 0) {
        samples.push({
          id: this.prefix + '*',
          icon: "turn-up",
          label: this.$t('message.sampler.samples.sampleSelector.parentDirectory')
        });
      }

      for (let directory of this.getFileList(true).sort(Intl.Collator().compare)) {
        samples.push({
          id: this.prefix + directory,
          icon: "fa-solid fa-folder",
          label: directory,
          folder: directory,
        });
      }
      return samples;
    },

    getSampleList() {
      let samples = [];
      for (let file of this.getFileList(false).sort(Intl.Collator().compare)) {
        samples.push({
          id: this.prefix + file,
          icon: "fa-solid fa-music",
          label: file
        });
      }

      // Return the list :)
      return samples;
    },

    getFileList(directories) {
      let directory = this.getCurrentDirectory();

      // Get a full list of files
      let files = [];
      for (let file of directory) {
        if (directories && typeof file == 'object') {
          files.push(Object.keys(file)[0]);
        }
        if (!directories && typeof file != 'object') {
          files.push(file);
        }
      }

      // Return the list :)
      return files;
    },

    getCurrentDirectory() {
      // Start at the 'Top' level of the structure..
      let level = this.getSamplePaths();

      // Firstly, we need to iterate through our structure to the correct place..
      let descend_path = [...this.current_path];
      while (descend_path.length > 0) {

        // Grab the first element of the path and remove it from the list..
        let next = descend_path.shift();

        // Iterate through all the parts at this layer of the structure, try
        // to locate the object containing this paths data..
        for (let path of level) {

          // Is this a directory?
          if (typeof path == 'object') {
            // Get the Directory Name...
            let dirName = Object.keys(path)[0];

            // Is it the directory we're looking for?
            if (dirName === next) {
              // Place this as the new 'Top' level
              level = path[dirName];

              // Break the loop, we good.
              break;
            }
          }
        }
      }

      return level;
    },

    getSamplePaths() {
      let files = store.getSampleFiles();
      if (files === undefined) {
        return [];
      }

      // Builds a tree of nested '{ name: [...] }' objects (folders) and strings (files).
      let root = [];
      let descend = function (fields) {
        let current = root;
        for (let element of fields) {
          let subDirectory = current.find(function (field) {
            return typeof field == 'object' && field[element];
          });

          // Couldn't find an existing SubDirectory, create it..
          if (!subDirectory) {
            subDirectory = Object.create(null);
            subDirectory[element] = [];
            current.push(subDirectory);
          }
          current = subDirectory[element];
        }
        return current;
      };

      for (let value of Object.keys(files)) {
        let fields = value.replace(/\\/g, '/').split("/");
        descend(fields.slice(0, -1)).push(fields[fields.length - 1]);
      }

      // Folders without samples only appear in the folder list.
      for (let folder of store.getSampleFolders()) {
        descend(folder.replace(/\\/g, '/').split("/").filter((part) => part.length > 0));
      }
      return root;
    },

    // The path of a file or folder in the current folder, relative to the samples folder
    currentPathTo(name) {
      return [...this.current_path, name].join('/');
    },

    getCurrentFolder() {
      return this.current_path.join('/');
    },

    // The sample menu is placed from the button's offset, which doesn't account for scrolling.
    // Add up the scrolling of every container between the list and the element both the button
    // and the menu are positioned against (this tab has two nested scrolling containers).
    getMenuScrollOffset() {
      let list = this.$refs.sampleList !== undefined ? this.$refs.sampleList.$el : undefined;
      if (list === undefined || list === null) {
        return 0;
      }

      let stop = list.offsetParent;
      let offset = 0;
      for (let element = list.parentElement; element !== null && element !== stop; element = element.parentElement) {
        offset += element.scrollTop;
      }
      return offset;
    },

    getSampleMenu() {
      return [
        {name: this.$t('message.sampleManager.edit'), slug: "edit"},
        {name: this.$t('message.sampleManager.rename'), slug: "rename"},
        {name: this.$t('message.sampleManager.moveTo'), slug: "move"},
        {name: this.$t('message.sampleManager.delete'), slug: "delete"},
      ];
    },

    sampleMenuSelected(event) {
      let name = event.item.substring(this.prefix.length);
      if (event.option.slug === "rename") {
        this.$emit('rename-sample', this.currentPathTo(name), name);
      }
      if (event.option.slug === "move") {
        this.$emit('move-sample-request', this.currentPathTo(name), name);
      }
      if (event.option.slug === "edit") {
        this.stopPlayback();
        this.$emit('edit-sample', this.currentPathTo(name), name);
      }
      if (event.option.slug === "delete") {
        this.stopPlayback();
        this.$emit('delete-sample', this.currentPathTo(name), name);
      }
    },

    // Double clicking a sample opens it in the editor (only when managing files).
    onSampleDoubleClick(id) {
      if (!this.manage) {
        return;
      }
      let name = id.substring(this.prefix.length);
      this.stopPlayback();
      this.$emit('edit-sample', this.currentPathTo(name), name);
    },

    onSampleDragStart(event, id) {
      this.dragging = id.substring(this.prefix.length);
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("text/plain", this.dragging);
    },

    onSampleDragEnd() {
      this.dragging = undefined;
      this.dropTarget = undefined;
    },

    // The folder a directory entry stands for ('*' is the parent folder)
    getDropFolder(directoryId) {
      let id = directoryId.substring(this.prefix.length);
      if (id === "*") {
        return this.current_path.slice(0, -1).join('/');
      }
      return this.currentPathTo(id);
    },

    onFolderDragOver(event, directoryId) {
      if (!this.manage || this.dragging === undefined) {
        return;
      }
      event.preventDefault();
      event.dataTransfer.dropEffect = "move";
      this.dropTarget = directoryId;
    },

    onFolderDragLeave(directoryId) {
      if (this.dropTarget === directoryId) {
        this.dropTarget = undefined;
      }
    },

    onFolderDrop(event, directoryId) {
      if (!this.manage || this.dragging === undefined) {
        return;
      }
      event.preventDefault();

      let name = this.dragging;
      let folder = this.getDropFolder(directoryId);
      this.onSampleDragEnd();
      this.$emit('move-sample', this.currentPathTo(name), folder.length > 0 ? `${folder}/${name}` : name);
    },

    focus() {
      if (this.getDirectoryList().length > 0) {
        this.$refs.button[0].focus();
        return;
      }

      if (this.getSampleList().length > 0) {
        this.$refs.sampleList.getFirstButtonRef().focus()
      }
    },

    selectDirectory(id) {
      this.stopPlayback();
      this.selectedSample = undefined;

      id = id.substring(this.prefix.length);

      if (id === "*") {
        this.current_path.pop();
      } else {
        this.current_path.push(id);
      }

      this.$nextTick(() => {
        if (this.getDirectoryList().length > 0) {
          this.focus();
        }
      });
    },

    selectSample(sample) {
      this.stopPlayback();
      this.selectedSample = sample.substring(this.prefix.length);
      this.audio_player.src = this.getSampleUrl();

      // Changing the src will stop playback, but wont trigger the stop events.
      this.audio_playing = false;
    },

    getSelectedSample() {
      if (this.selectedSample === undefined) {
        return undefined;
      }
      return this.prefix + this.selectedSample;
    },

    getSelectedSampleName() {
      if (this.selectedSample === undefined) {
        return undefined;
      }

      return this.selectedSample;
    },

    stopPlayback() {
      if (this.isAudioPlaying()) {
        this.audio_player.pause();
      }
    },

    toggleAudio() {
      if (!this.isAudioPlaying()) {
        this.audio_player.play();
      } else {
        this.audio_player.pause();
      }
    },

    isAudioPlaying() {
      return this.audio_playing;
    },

    getSampleUrl() {
      if (this.selectedSample === undefined) {
        return undefined;
      }

      let url = getBaseHTTPAddress();
      url = url + "files/samples/" + this.selectedSample;

      return url;
    },
  },

  mounted() {
    this.audio_player = new Audio();
    this.audio_player.onpause = () => {
      this.audio_playing = false;
      this.audio_player.currentTime = 0;
    };
    this.audio_player.onplay = () => {
      this.audio_playing = true;
    }
    this.audio_player.onended = () => {
      this.audio_playing = false;
      this.audio_player.currentTime = 0;
    }
  },
}
</script>

<style scoped>
.buttons {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  gap: 8px;
}

.folderRow {
  display: flex;
  align-items: stretch;
  gap: 4px;
}

.folderRow > .folderButton {
  flex: 1;
  min-width: 0;
}

.folderRow.dropTarget {
  outline: 1px dashed #59b1b6;
}

.folderAction {
  border: 0;
  background-color: transparent;
  color: #a5a7a6;
  padding: 0 10px;
  margin-right: 6px;
}

.folderAction:hover, .folderAction:focus {
  color: #fff;
}
</style>
