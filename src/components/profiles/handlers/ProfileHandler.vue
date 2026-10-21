<template>
  <div style="height: 30px; text-align: right">
    <div style="height: 14px; display: inline-block; width: calc(100% - 50px)">
      <hr style="border: 1px solid var(--c-line)" />
    </div>
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
import ProfileManager from "@/components/profiles/ProfileManager.vue";
import AccessibleModal from "@/components/design/modal/AccessibleModal.vue";
import ModalButton from "@/components/design/modal/ModalButton.vue";

export default {
  name: "ProfileHandler",
  components: { ModalButton, AccessibleModal, ProfileManager },

  data() {
    return {
      selectedProfile: "",
    };
  },

  methods: {
    getMenuList() {
      return [
        { name: this.$t('message.profileManager.menuLoadProfile'), slug: "load" },
        { name: this.$t('message.profileManager.menuLoadProfileColours'), slug: "colours" },
        { name: this.$t('message.profileManager.menuDeleteProfile'), slug: "delete" },
      ];
    },

    getProfileList() {
      return store.getProfileFiles().sort(Intl.Collator().compare);
    },

    getActiveProfile() {
      return store.getActiveDevice().profile_name;
    },

    menuItemPressed(event) {
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
      let command = {
        LoadProfile: [label, true],
      };

      runCommand(store.getActiveSerial(), command,
          {a11y: this.$t('message.profileManager.accessibilityLoadedProfile', { profileName: label })});
    },

    loadProfileColours: function (label) {
      runCommand(store.getActiveSerial(), {LoadProfileColours: label},
          {ok: this.$t('message.profileManager.accessibilityLoadedColours', { profileName: label })});
    },

    newProfile(name) {
      runCommand(store.getActiveSerial(), { NewProfile: name },
          {ok: this.$t('message.profileManager.accessibilityCreatedProfile', { profileName: name })});
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
