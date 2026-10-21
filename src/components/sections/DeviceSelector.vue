<template>
  <div class="wrapper">
  <div class="buttonList">
    <div>
      <div class="label">{{ $t('message.deviceSelector.title') }}</div>

      <!-- If we've never connected before, and we're not connected now.. -->
      <div v-if="!hasConnected() && !isConnected()">
        <div class="no-device">{{ $t('message.deviceSelector.connecting') }}</div>
      </div>

      <!-- We *HAVE* connected before, but we're not connected now.. -->
      <div v-else-if="hasConnected() && !isConnected()">
        <div class="no-device disconnected">{{ $t('message.deviceSelector.disconnected') }}</div>
      </div>

      <!-- We should be connected here! -->
      <div v-else>
        <div class="buttonHolder" v-if="deviceCount > 0">
          <Button v-for="(device, key) in getMixers()" :key=key :button-id=key :is-active=false
                  :label="getLabel2(key, device)" @button-pressed="setDevice(key)"/>
        </div>
        <div v-else class="no-device">
          {{ $t('message.deviceSelector.noDevices') }}
          <!-- What usually keeps a GoXLR from being found, for this system -->
          <ul class="help">
            <li>{{ $t('message.deviceSelector.helpCable') }}</li>
            <li v-if="platform() === 'linux'">{{ $t('message.deviceSelector.helpLinux') }}</li>
            <li v-if="platform() === 'windows'">{{ $t('message.deviceSelector.helpWindows') }}</li>
            <li v-if="platform() === 'macos'">{{ $t('message.deviceSelector.helpMacos') }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <div v-if="isConnected() && hasConfig()" class="buttonList" style="width: 170px">
    <div class="buttonHolder" style="width: 170px; padding-top: 25px; overflow-y: initial">
      <SettingsButton />
    </div>
  </div>
  </div>
</template>

<script>

import Button from "@/components/buttons/Button.vue";
import {store} from "@/store";
import SettingsButton from "@/components/sections/system/modals/SettingsButton.vue";

export default {
  name: "DeviceSelector",
  components: {SettingsButton, Button},
  data() {
    return {
      devices: [],
    }
  },

  computed: {
    deviceCount() {
      return store.getDeviceCount();
    }
  },

  watch: {
    // This code probably isn't needed, but is for when a GoXLR suddenly appears in the data.
    deviceCount(newCount, oldCount) {
      if (newCount === 1 && oldCount === 0) {
        store.setActiveSerial(Object.keys(this.getMixers())[0]);
      }
    }
  },

  methods: {
    hasConnected() {
      return store.hasConnected();
    },

    isConnected() {
      return store.isConnected();
    },

    hasConfig() {
      return store.getConfig() !== undefined;
    },

    getMixers() {
      return store.status.mixers;
    },

    setDevice(serial) {
      store.setActiveSerial(serial);
    },

    getLabel2(serial, device) {
      const model = device.hardware.device_type === "Mini" ? "GoXLR Mini" : "GoXLR";
      return this.$t('message.deviceSelector.deviceLabel', {model, serial});
    },

    platform() {
      const config = store.getConfig();
      return config ? config.platform : "";
    },
  },

  created() {
    if (this.deviceCount === 1) {
      store.setActiveSerial(Object.keys(this.getMixers())[0]);
    }
  }
}
</script>

<style scoped>
.wrapper {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.buttonList {
  height: 220px;
  width: 700px;
  margin: 3px;
  background-color: var(--c-raised);
}

.buttonList:not(:last-child) {
  margin-right: 20px;
}

.buttonHolder {
  height: 170px;
  width: 700px;

  box-sizing: border-box;

  overflow-y: auto;

}

.buttonHolder::-webkit-scrollbar {
  width: 3px;
}

.buttonHolder::-webkit-scrollbar-track {
  background-color: transparent;
}

.buttonHolder::-webkit-scrollbar-thumb {
  background-color: var(--c-line-strong);
  border-radius: 3px;
}

.label {
  width: 680px;
  padding: 10px;
  color: var(--c-text);
  background-color: var(--c-raised-2);

  text-transform: uppercase;

  margin-bottom: 8px;
}

.no-device {
  color: var(--c-text);
}

.help {
  margin: 12px 0 0;
  padding-left: 18px;
  text-align: left;
  font-size: 13px;
  font-weight: normal;
  color: var(--c-text-soft);
  user-select: text;
}

.help li + li {
  margin-top: 6px;
}

.no-device.disconnected {
  white-space: pre-line;
}

</style>
