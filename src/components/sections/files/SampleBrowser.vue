<template>
  <div class="browser" :class="{ importing: importOver }"
       @dragover="onListDragOver" @dragleave="onListDragLeave" @drop="onListDrop">

    <div class="topRow">
      <nav class="breadcrumb" :aria-label="$t('message.sampleManager.breadcrumb')">
        <button @click="goTo(0)" :class="{ current: current_path.length === 0 }"
                @dragover="onFolderDragOver($event, '')" @drop="onFolderDrop($event, '')">
          {{ $t('message.sampleManager.rootName') }}
        </button>
        <template v-for="(part, index) in current_path" :key="index">
          <span class="separator">›</span>
          <button @click="goTo(index + 1)" :class="{ current: index === current_path.length - 1 }"
                  @dragover="onFolderDragOver($event, pathUpTo(index + 1))"
                  @drop="onFolderDrop($event, pathUpTo(index + 1))">{{ part }}</button>
        </template>
      </nav>
      <input type="search" class="search" v-model="search" :placeholder="$t('message.sampleManager.search')"
             :aria-label="$t('message.sampleManager.search')"/>
    </div>

    <div v-if="multi" class="multiBar">
      <span>{{ $t('message.sampleManager.selectedCount', { count: checked.length }) }}</span>
      <button @click="selectAll">{{ $t('message.sampleManager.selectAll') }}</button>
      <button @click="$emit('move-samples', [...checked])" :disabled="checked.length === 0">
        {{ $t('message.sampleManager.moveTo') }}
      </button>
      <button @click="$emit('delete-samples', [...checked])" :disabled="checked.length === 0">
        {{ $t('message.sampleManager.delete') }}
      </button>
      <button @click="$emit('end-multi')">{{ $t('message.sampleManager.done') }}</button>
    </div>

    <div v-if="!isSearching()" class="folders">
      <div v-for="folder in getFolderRows()" :key="folder.path" class="folderRow"
           :class="{ dropTarget: dropTarget === folder.path }"
           @dragover="onFolderDragOver($event, folder.path)" @dragleave="onFolderDragLeave(folder.path)"
           @drop="onFolderDrop($event, folder.path)">
        <button class="folderButton" @click="open(folder)">
          <font-awesome-icon :icon="folder.parent ? 'fa-solid fa-turn-up' : 'fa-solid fa-folder'"/>
          {{ folder.label }}
        </button>
        <template v-if="!folder.parent">
          <button class="folderAction" :title="$t('message.sampleManager.rename')"
                  :aria-label="$t('message.sampleManager.renameFolderLabel', { name: folder.label })"
                  @click="$emit('rename-folder', folder.path)">
            <font-awesome-icon icon="fa-solid fa-pen"/>
          </button>
          <button class="folderAction" :title="$t('message.sampleManager.delete')"
                  :aria-label="$t('message.sampleManager.deleteFolderLabel', { name: folder.label })"
                  @click="$emit('delete-folder', folder.path, folder.label)">
            <font-awesome-icon icon="fa-solid fa-trash"/>
          </button>
        </template>
      </div>
    </div>

    <RadioList v-if="getSampleOptions().length > 0"
               ref="sampleList"
               padding="6px"
               background="transparent"
               group="browser_sample_list"
               :options="getSampleOptions()"
               :selected="selected"
               @selection-changed="(id) => selected = id"
               :menu="getSampleMenu()"
               menu_id="browser_sample_menu"
               :scroll-top="getMenuScrollOffset"
               @menu-selected="sampleMenuSelected"
               :draggable="true"
               @item-dragstart="onSampleDragStart"
               @item-dragend="onSampleDragEnd"
               @item-dblclick="(id) => edit(id)">
      <template #item-actions="{ option }">
        <input v-if="multi" type="checkbox" class="itemCheck" :checked="isChecked(option.id)"
               @click.stop @change="toggleChecked(option.id)"
               :aria-label="$t('message.sampleManager.selectSample', { name: option.label })"/>
        <button class="itemPlay" @click.prevent.stop="togglePreview(option.id)" @dblclick.stop
                :aria-label="$t(isPreviewing(option.id) ? 'message.sampleManager.stopPreview' : 'message.sampleManager.playPreview', { name: option.label })"
                :title="$t(isPreviewing(option.id) ? 'message.sampleManager.stop' : 'message.sampleManager.listen')">
          <font-awesome-icon :icon="isPreviewing(option.id) ? 'fa-solid fa-stop' : 'fa-solid fa-play'"/>
        </button>
      </template>
    </RadioList>

    <p v-if="isEmpty()" class="empty">
      {{ isSearching() ? $t('message.sampleManager.noResults') : $t('message.sampleManager.emptyFolder') }}
    </p>
    <p class="dropHint">{{ $t('message.sampleManager.dropHint') }}</p>
  </div>
</template>

<script>
import {store} from "@/store";
import {getBaseHTTPAddress} from "@/util/sockets";
import RadioList from "@/components/lists/RadioList.vue";

// List ids are this prefix + the sample's path relative to the samples folder.
const PREFIX = "browser_";

export default {
  name: "SampleBrowser",
  components: {RadioList},

  // Paths are relative to the samples folder, '/' separated.
  emits: ['rename-folder', 'delete-folder', 'rename-sample', 'move-sample', 'move-samples', 'edit-sample',
    'delete-samples', 'duplicate-sample', 'import-files', 'end-multi'],

  props: {
    // Multiple selection mode (check boxes)
    multi: {type: Boolean, default: false},
  },

  data() {
    return {
      current_path: [],
      search: '',
      selected: undefined,
      checked: [],

      audio_player: undefined,
      audio_playing: false,
      previewing: undefined,

      // The samples being dragged, and the folder they're over
      dragging: [],
      dropTarget: undefined,
      importOver: false,
    }
  },

  watch: {
    multi(enabled) {
      if (!enabled) {
        this.checked = [];
      }
    },
  },

  methods: {
    // ---------- Data ----------

    // Every sample as { path, name, folder, info }
    getAllSamples() {
      let files = store.getSampleFiles();
      if (files === undefined) {
        return [];
      }
      return Object.keys(files).map((key) => {
        let path = key.replace(/\\/g, '/');
        let parts = path.split('/');
        return {path, name: parts[parts.length - 1], folder: parts.slice(0, -1).join('/'), info: files[key]};
      });
    },

    getAllFolders() {
      let folders = new Set(store.getSampleFolders().map((folder) => folder.replace(/\\/g, '/')));
      // Also the folders of samples (older daemons don't list folders)
      for (let sample of this.getAllSamples()) {
        let parts = sample.folder.split('/').filter((part) => part !== '');
        for (let index = 1; index <= parts.length; index++) {
          folders.add(parts.slice(0, index).join('/'));
        }
      }
      return [...folders];
    },

    // Sample names used by the active profile's sampler
    getUsedNames() {
      let used = new Set();
      let device = store.getActiveDevice();
      if (device === undefined || device.sampler === undefined || device.sampler === null) {
        return used;
      }
      for (let bank of Object.values(device.sampler.banks)) {
        for (let button of Object.values(bank)) {
          for (let sample of button.samples) {
            used.add(sample.name);
          }
        }
      }
      return used;
    },

    getCurrentFolder() {
      return this.current_path.join('/');
    },

    pathUpTo(length) {
      return this.current_path.slice(0, length).join('/');
    },

    isSearching() {
      return this.search.trim() !== '';
    },

    getFolderRows() {
      let current = this.getCurrentFolder();
      let rows = [];
      if (this.current_path.length > 0) {
        rows.push({
          parent: true,
          path: this.pathUpTo(this.current_path.length - 1),
          label: this.$t('message.sampler.samples.sampleSelector.parentDirectory'),
        });
      }
      let children = this.getAllFolders().filter((folder) => {
        let parent = folder.split('/').slice(0, -1).join('/');
        return parent === current;
      });
      for (let folder of children.sort(Intl.Collator().compare)) {
        rows.push({parent: false, path: folder, label: folder.split('/').pop()});
      }
      return rows;
    },

    getVisibleSamples() {
      let samples = this.getAllSamples();
      if (this.isSearching()) {
        let query = this.search.trim().toLowerCase();
        return samples.filter((sample) => sample.name.toLowerCase().includes(query));
      }
      let current = this.getCurrentFolder();
      return samples.filter((sample) => sample.folder === current);
    },

    getSampleOptions() {
      let used = this.getUsedNames();
      return this.getVisibleSamples()
          .sort((a, b) => Intl.Collator().compare(a.name, b.name))
          .map((sample) => {
            let detail = this.describe(sample.info, sample.name);
            if (this.isSearching() && sample.folder !== '') {
              detail = `${sample.folder} · ${detail}`;
            }
            return {
              id: PREFIX + sample.path,
              icon: "fa-solid fa-music",
              label: sample.name,
              detail,
              badge: used.has(sample.name) ? "fa-solid fa-link" : undefined,
              badgeLabel: used.has(sample.name) ? this.$t('message.sampleManager.usedByActiveProfile') : undefined,
            };
          });
    },

    // "0:03.2 · WAV · 512 KB"
    describe(info, name) {
      let parts = [];
      if (info !== undefined && info.duration !== undefined && info.duration !== null) {
        let minutes = Math.floor(info.duration / 60);
        let seconds = (info.duration - minutes * 60).toFixed(1).padStart(4, '0');
        parts.push(`${minutes}:${seconds}`);
      }
      let dot = name.lastIndexOf('.');
      if (dot > 0) {
        parts.push(name.substring(dot + 1).toUpperCase());
      }
      if (info !== undefined && info.size) {
        let kb = info.size / 1024;
        parts.push(kb < 1024
            ? this.$t('message.sampleManager.sizeKb', {size: Math.max(1, Math.round(kb))})
            : this.$t('message.sampleManager.sizeMb', {size: (kb / 1024).toFixed(1)}));
      }
      return parts.join(' · ');
    },

    isEmpty() {
      return this.getSampleOptions().length === 0 && (this.isSearching() || this.getFolderRows().length === 0);
    },

    pathOf(id) {
      return id.substring(PREFIX.length);
    },

    nameOf(path) {
      return path.split('/').pop();
    },

    // ---------- Navigation ----------

    open(folder) {
      this.stopPlayback();
      this.selected = undefined;
      this.search = '';
      this.current_path = folder.path === '' ? [] : folder.path.split('/');
    },

    goTo(length) {
      this.open({path: this.pathUpTo(length)});
    },

    // ---------- Menu ----------

    getSampleMenu() {
      return [
        {name: this.$t('message.sampleManager.edit'), slug: "edit"},
        {name: this.$t('message.sampleManager.rename'), slug: "rename"},
        {name: this.$t('message.sampleManager.duplicate'), slug: "duplicate"},
        {name: this.$t('message.sampleManager.moveTo'), slug: "move"},
        {name: this.$t('message.sampleManager.delete'), slug: "delete"},
      ];
    },

    sampleMenuSelected(event) {
      let path = this.pathOf(event.item);
      let name = this.nameOf(path);
      switch (event.option.slug) {
        case "edit":
          this.edit(event.item);
          break;
        case "rename":
          this.$emit('rename-sample', path, name);
          break;
        case "duplicate":
          this.$emit('duplicate-sample', path);
          break;
        case "move":
          this.$emit('move-samples', [path]);
          break;
        case "delete":
          this.stopPlayback();
          this.$emit('delete-samples', [path]);
          break;
      }
    },

    edit(id) {
      this.stopPlayback();
      let path = this.pathOf(id);
      this.$emit('edit-sample', path, this.nameOf(path));
    },

    // The menu is placed from the button's offset, which doesn't account for scrolling: add up
    // the scrolling of the containers between the list and the element the menu is placed against.
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

    // ---------- Multiple selection ----------

    isChecked(id) {
      return this.checked.includes(this.pathOf(id));
    },

    toggleChecked(id) {
      let path = this.pathOf(id);
      if (this.checked.includes(path)) {
        this.checked = this.checked.filter((checked) => checked !== path);
      } else {
        this.checked = [...this.checked, path];
      }
    },

    selectAll() {
      this.checked = this.getVisibleSamples().map((sample) => sample.path);
    },

    // ---------- Listening ----------

    isPreviewing(id) {
      return this.audio_playing && this.previewing === this.pathOf(id);
    },

    togglePreview(id) {
      if (this.isPreviewing(id)) {
        this.audio_player.pause();
        return;
      }
      this.stopPlayback();
      let path = this.pathOf(id);
      this.previewing = path;
      this.audio_player.src = getBaseHTTPAddress() + "files/samples/" + encodeURIComponent(this.nameOf(path));
      this.audio_player.play();
    },

    stopPlayback() {
      if (this.audio_playing) {
        this.audio_player.pause();
      }
    },

    // ---------- Drag and drop ----------

    onSampleDragStart(event, id) {
      let path = this.pathOf(id);
      // Dragging a checked sample moves all the checked ones.
      this.dragging = (this.multi && this.checked.includes(path)) ? [...this.checked] : [path];
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("text/plain", this.dragging.join('\n'));
    },

    onSampleDragEnd() {
      this.dragging = [];
      this.dropTarget = undefined;
    },

    isFileDrag(event) {
      return event.dataTransfer !== null && [...event.dataTransfer.types].includes("Files");
    },

    onFolderDragOver(event, folder) {
      if (this.dragging.length === 0 && !this.isFileDrag(event)) {
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      event.dataTransfer.dropEffect = this.dragging.length > 0 ? "move" : "copy";
      this.dropTarget = folder;
      this.importOver = false;
    },

    onFolderDragLeave(folder) {
      if (this.dropTarget === folder) {
        this.dropTarget = undefined;
      }
    },

    onFolderDrop(event, folder) {
      if (this.dragging.length === 0 && !this.isFileDrag(event)) {
        return;
      }
      event.preventDefault();
      event.stopPropagation();

      if (this.isFileDrag(event) && this.dragging.length === 0) {
        this.importOver = false;
        this.dropTarget = undefined;
        this.$emit('import-files', [...event.dataTransfer.files], folder);
        return;
      }

      let paths = this.dragging;
      this.onSampleDragEnd();
      for (let path of paths) {
        let name = this.nameOf(path);
        let to = folder.length > 0 ? `${folder}/${name}` : name;
        if (to !== path) {
          this.$emit('move-sample', path, to);
        }
      }
    },

    // Files from the computer dropped anywhere on the list go into the current folder.
    onListDragOver(event) {
      if (!this.isFileDrag(event)) {
        return;
      }
      event.preventDefault();
      event.dataTransfer.dropEffect = "copy";
      this.importOver = true;
    },

    onListDragLeave(event) {
      if (!this.$el.contains(event.relatedTarget)) {
        this.importOver = false;
      }
    },

    onListDrop(event) {
      if (!this.isFileDrag(event)) {
        return;
      }
      event.preventDefault();
      this.importOver = false;
      this.$emit('import-files', [...event.dataTransfer.files], this.getCurrentFolder());
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
    };
    this.audio_player.onended = () => {
      this.audio_playing = false;
      this.audio_player.currentTime = 0;
    };
  },

  beforeUnmount() {
    this.stopPlayback();
  },
}
</script>

<style scoped>
.browser {
  min-height: 100%;
  box-sizing: border-box;
  border: 1px dashed transparent;
}

.browser.importing {
  border-color: #59b1b6;
  background-color: rgba(89, 177, 182, 0.08);
}

.topRow {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 6px 8px 6px;
}

.breadcrumb {
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 2px;
}

.breadcrumb button {
  background: transparent;
  border: 0;
  color: #a5a7a6;
  padding: 2px 4px;
  cursor: pointer;
  font-family: LeagueMonoCondensed, sans-serif;
}

.breadcrumb button:hover, .breadcrumb button:focus, .breadcrumb button.current {
  color: #fff;
}

.separator {
  color: #6c706f;
}

.search {
  width: 140px;
  background-color: #2B2F2D;
  border: 1px solid #3b413f;
  padding: 4px 6px;
  color: #fff;
}

.multiBar {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
  padding: 6px;
  margin: 0 6px 8px 6px;
  background-color: #3b413f;
  color: #fff;
}

.multiBar span {
  margin-right: auto;
}

.multiBar button {
  background-color: #2B2F2D;
  border: 1px solid #49514e;
  color: #fff;
  padding: 3px 8px;
  cursor: pointer;
}

.multiBar button:disabled {
  color: #6c706f;
  cursor: default;
}

.folders {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 8px;
}

.folderRow {
  display: flex;
  align-items: stretch;
  gap: 4px;
  margin: 0 6px;
}

.folderRow.dropTarget, .breadcrumb button.dropTarget {
  outline: 1px dashed #59b1b6;
}

.folderButton {
  flex: 1;
  min-width: 0;
  text-align: left;
  font-family: LeagueMonoCondensed, sans-serif;
  background-color: transparent;
  border: 0;
  color: #fff;
  padding: 6px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
}

.folderButton:hover, .folderButton:focus {
  background-color: #49514e;
}

.folderAction, .itemPlay {
  background-color: transparent;
  border: 0;
  padding: 0 8px;
  color: #a5a7a6;
  cursor: pointer;
}

.itemPlay {
  padding: 6px;
  color: inherit;
}

.folderAction:hover, .folderAction:focus {
  color: #fff;
}

.itemCheck {
  margin: 0 4px;
}

.empty, .dropHint {
  margin: 8px;
  color: #a5a7a6;
  font-size: 0.85em;
}
</style>
