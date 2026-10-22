<template>
  <div style="height: 30px; text-align: right">
    <div style="height: 14px; display: inline-block; width: calc(100% - 90px)">
      <hr style="border: 1px solid var(--c-line)" />
    </div>
    <!-- Profile files from this computer (the daemon's folder may be on another one) -->
    <input ref="importInput" type="file" accept=".goxlr" multiple hidden @change="onImport"/>
    <button :aria-label="$t('message.profileManager.import')" :title="$t('message.profileManager.import')"
            class="openButton" @click="$refs.importInput.click()">
      <font-awesome-icon icon="fa-solid fa-file-import" />
    </button>
    <button
      :aria-label="$t('message.profileManager.accessibilityOpenProfileDirectory')"
      class="openButton"
      @click="openProfiles"
    >
      <font-awesome-icon icon="fa-solid fa-folder" />
    </button>
  </div>
  <div style="height: 340px">
    <ProfileManager
      ref="manager"
      :profile-list="getProfileList()"
      :active-profile="getActiveProfile()"
      :menu-list="getMenuList()"
      @new-profile="newProfile"
      @load-profile="loadProfile"
      @save-profile="saveProfile"
      @save-profile-as="saveProfileAs"
      @menu-item-pressed="menuItemPressed"
    />
  </div>

  <NameDialog ref="nameDialog" :id="'profileNameDialog'" :taken="getProfileList()"
              :title="nameAction.slug === 'rename' ? $t('message.profileManager.renameTitle', {name: nameAction.from}) : $t('message.profileManager.duplicateTitle', {name: nameAction.from})"
              :ok-label="nameAction.slug === 'rename' ? $t('message.profileManager.menuRename') : $t('message.profileManager.menuDuplicate')"
              @submit="applyName"/>

  <AccessibleModal ref="deleteModal" id="delProfile">
    <template v-slot:title>{{$t('message.profileManager.deleteTitle')}}</template>
    <template v-slot:default>{{$t('message.profileManager.deleteQuestion', { profileName: selectedProfile })}}</template>
    <template v-slot:footer>
      <ModalButton @click="$refs.deleteModal.closeModal(); deleteProfile(this.selectedProfile);">{{$t('message.profileManager.deleteYes')}}</ModalButton>
      <ModalButton ref="focusDelDefault" @click="$refs.deleteModal.closeModal()">{{$t('message.profileManager.deleteNo')}}</ModalButton>
    </template>
  </AccessibleModal>

  <AccessibleModal ref="noDelete" id="delProfile">
    <template v-slot:title>{{$t('message.profileManager.deleteCurrentErrorTitle')}}</template>
    <template v-slot:default>{{$t('message.profileManager.deleteCurrentErrorMessage')}}</template>
  </AccessibleModal>
</template>

<script>
import { store } from "@/store";
import { runCommand, websocket } from "@/util/sockets";
import { exportProfile, importProfiles } from "@/util/profileFiles";
import ProfileManager from "@/components/profiles/ProfileManager.vue";
import AccessibleModal from "@/components/design/modal/AccessibleModal.vue";
import ModalButton from "@/components/design/modal/ModalButton.vue";
import NameDialog from "@/components/profiles/NameDialog.vue";
import {guardProfileChange} from "@/util/profileGuard";

export default {
  name: "ProfileHandler",
  components: { NameDialog, ModalButton, AccessibleModal, ProfileManager },

  data() {
    return {
      selectedProfile: "",
      // The rename / duplicate waiting for a name
      nameAction: {slug: "", from: ""},
    };
  },

  methods: {
    getMenuList() {
      return [
        { name: this.$t('message.profileManager.menuLoadProfile'), slug: "load" },
        { name: this.$t('message.profileManager.menuLoadProfileColours'), slug: "colours" },
        { name: this.$t('message.profileManager.menuRename'), slug: "rename" },
        { name: this.$t('message.profileManager.menuDuplicate'), slug: "duplicate" },
        { name: this.$t('message.profileManager.export'), slug: "export" },
        { name: this.$t('message.profileManager.menuDeleteProfile'), slug: "delete" },
      ];
    },

    applyName(name) {
      const {slug, from} = this.nameAction;
      const command = slug === "rename" ? {RenameProfile: [from, name]} : {DuplicateProfile: [from, name]};
      const done = slug === "rename" ? 'message.profileManager.renamed' : 'message.profileManager.duplicated';
      runCommand(store.getActiveSerial(), command, {ok: this.$t(done, {name: from, newName: name})});
    },

    getProfileList() {
      return store.getProfileFiles().sort(Intl.Collator().compare);
    },

    getActiveProfile() {
      return store.getActiveDevice().profile_name;
    },

    onImport(event) {
      const files = [...event.target.files];
      event.target.value = "";
      if (files.length > 0) importProfiles(files, false, this.$t('message.profileManager.imported', {count: files.length}));
    },

    menuItemPressed(event) {
      if (event.option.slug === "export") {
        exportProfile(event.item, false);
        return;
      }
      if (event.option.slug === "rename" || event.option.slug === "duplicate") {
        this.nameAction = {slug: event.option.slug, from: event.item};
        const button = this.$refs.manager.$refs[this.$refs.manager.getButtonId(event.item)][0];
        const name = event.option.slug === "rename" ? event.item : this.$t('message.profileManager.copyName', {name: event.item});
        this.$refs.nameDialog.open(name, button);
        return;
      }

      if (event.option.slug === "colours") {
        this.loadProfileColours(event.item);
      }

      if (event.option.slug === "load") {
        this.loadProfile(event.item);
      }

      if (event.option.slug === "delete") {
        if (event.item === this.getActiveProfile()) {
          this.$refs.noDelete.openModal(
            this.$refs.focusDelDefault,
            this.$refs.manager.$refs[
              this.$refs.manager.getButtonId(event.item)
            ][0]
          );
        } else {
          this.selectedProfile = event.item;
          this.$refs.deleteModal.openModal(
            this.$refs.focusDelDefault,
            this.$refs.manager.$refs[
              this.$refs.manager.getButtonId(event.item)
            ][0]
          );
        }
      }
    },

    loadProfile: function (label) {
      guardProfileChange("load", false, label, () => runCommand(store.getActiveSerial(), {LoadProfile: [label, true]},
          {a11y: this.$t('message.profileManager.accessibilityLoadedProfile', { profileName: label })}));
    },

    loadProfileColours: function (label) {
      runCommand(store.getActiveSerial(), {LoadProfileColours: label},
          {ok: this.$t('message.profileManager.accessibilityLoadedColours', { profileName: label })});
    },

    newProfile(name) {
      guardProfileChange("create", false, name, () => runCommand(store.getActiveSerial(), { NewProfile: name },
          {ok: this.$t('message.profileManager.accessibilityCreatedProfile', { profileName: name })}));
    },

    saveProfile() {
      runCommand(store.getActiveSerial(), { SaveProfile: [] },
          {ok: this.$t('message.profileManager.accessibilitySavedProfile', { profileName: this.getActiveProfile() })});
    },

    saveProfileAs(name) {
      let command = {
        SaveProfileAs: name,
      };
      runCommand(store.getActiveSerial(), command,
          {ok: this.$t('message.profileManager.accessibilitySavedProfileAs', { profileName: name })});
    },

    deleteProfile(name) {
      runCommand(store.getActiveSerial(), { DeleteProfile: name },
          {ok: this.$t('message.profileManager.accessibilityProfileDeleted', { profileName: name })});
    },

    openProfiles() {
      websocket.open_path("Profiles");
    },
  },
};
</script>

<style scoped>
.openButton {
  display: inline-block;
  color: var(--c-muted);
  padding: 10px;
  font-size: 14px;

  border: 0;
  margin: 0;
  background-color: transparent;
}

.openButton:hover {
  color: var(--c-text);
}
</style>
