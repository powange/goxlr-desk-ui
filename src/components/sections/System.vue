<template>
  <div class="system-page">
    <!-- A menu of pages: the current one is marked with aria-current -->
    <nav class="system-menu" :aria-label="$t('message.system.title')">
      <template v-for="item in getItems()" :key="item.id">
        <a v-if="item.href" class="menu-item" :href="item.href" target="_blank" rel="noopener">
          <font-awesome-icon :icon="item.icon" fixed-width/>
          <span>{{ item.label }}</span>
          <font-awesome-icon icon="fa-solid fa-up-right-from-square" class="external"/>
        </a>
        <button v-else type="button" class="menu-item" :class="{ active: item.id === selected }"
                :id="item.action ? undefined : `system-menu-${item.id}`"
                :aria-current="!item.action && item.id === selected ? 'page' : undefined"
                @click="choose(item)">
          <font-awesome-icon :icon="item.icon" fixed-width/>
          <span>{{ item.label }}</span>
        </button>
      </template>
    </nav>

    <div class="system-content" role="region" :aria-labelledby="`system-menu-${selected}`">
      <component :is="getSelected().component" :key="selected" inline/>
    </div>
  </div>
</template>

<script>
import LicenseButton from "@/components/sections/system/modals/LicenseButton.vue";
import AboutButton from "@/components/sections/system/modals/AboutButton.vue";
import SettingsButton from "@/components/sections/system/modals/SettingsButton.vue";
import PowerButton from "@/components/sections/system/modals/PowerButton.vue";
import DeviceSettingsButton from "@/components/sections/system/modals/DeviceSettingsButton.vue";
import FirmwareUpdateButton from "@/components/sections/system/modals/FirmwareUpdateButton.vue";
import SwitchDeviceButton from "@/components/sections/system/modals/SwitchDeviceButton.vue";
import IntegrationsPage from "@/components/sections/system/pages/IntegrationsPage.vue";
import {store} from "@/store";
import {markRaw} from "vue";

// The System section: a menu on the left, the chosen page shown on the right (the content of the
// former dialogs, shown in place).
export default {
  name: "SystemComponent",

  data() {
    return {
      selected: "device",
    }
  },

  methods: {
    getItems() {
      const items = [
        {id: "device", icon: "fa-solid fa-headphones", label: this.$t('message.system.deviceButton'), component: markRaw(DeviceSettingsButton)},
        {id: "settings", icon: "fa-solid fa-gear", label: this.$t('message.system.settingsButton'), component: markRaw(SettingsButton)},
        {id: "power", icon: "fa-solid fa-power-off", label: this.$t('message.system.powerButton'), component: markRaw(PowerButton)},
        {id: "firmware", icon: "fa-solid fa-download", label: this.$t('message.system.menu.firmware'), component: markRaw(FirmwareUpdateButton)},
        {id: "integrations", icon: "fa-solid fa-link", label: this.$t('message.integrations.title'), component: markRaw(IntegrationsPage)},
        {id: "about", icon: "fa-solid fa-circle-info", label: this.$t('message.system.aboutButton'), component: markRaw(AboutButton)},
        {id: "licenses", icon: "fa-solid fa-book-open", label: this.$t('message.system.licenses'), component: markRaw(LicenseButton)},
        {id: "wizard", icon: "fa-solid fa-wand-magic-sparkles", label: this.$t('message.setupWizard.menu'), action: () => window.dispatchEvent(new Event("open-setup-wizard"))},
        {id: "help", icon: "fa-solid fa-circle-question", label: this.$t('message.system.help'), href: "https://discord.gg/BRBjkkbvmZ"},
      ];
      if (store.getDeviceCount() > 1) {
        items.splice(0, 0, {id: "switch", icon: "fa-solid fa-repeat", label: this.$t('message.common.switchDevice'), action: () => SwitchDeviceButton.methods.switchDevice()});
      }
      return items;
    },

    getSelected() {
      return this.getItems().find(item => item.id === this.selected) || this.getItems()[0];
    },

    choose(item) {
      if (item.action) {
        item.action();
        return;
      }
      this.selected = item.id;
    },
  },
}
</script>

<style scoped>
.system-page {
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  gap: 24px;
  align-items: start;
}

.system-menu {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 8px;
  background-color: var(--c-panel);
  border: 1px solid var(--c-line);
  border-radius: 8px;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 10px;
  border: none;
  border-radius: 6px;
  background: transparent;
  color: var(--c-muted);
  font-size: 13px;
  font-weight: 500;
  text-align: left;
  text-decoration: none;
  cursor: pointer;
}

.menu-item:hover:not(.active) {
  background-color: var(--c-raised);
  color: var(--c-text);
}

.menu-item.active {
  background-color: var(--c-raised-2);
  color: var(--c-text);
  box-shadow: inset 3px 0 0 var(--c-accent);
}

.menu-item:focus-visible {
  outline: 2px solid var(--c-accent);
  outline-offset: -2px;
}

.external {
  margin-left: auto;
  font-size: 10px;
}

.system-content {
  min-width: 0;
  padding: 18px 22px;
  background-color: var(--c-panel);
  border: 1px solid var(--c-line);
  border-radius: 8px;
}
</style>
