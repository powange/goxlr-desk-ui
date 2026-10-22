<template>
  <div v-if="hasVersion()" class="version">
    GoXLR Utility v{{ getVersion() }}
    <span v-if="outdated()"> - <a :href="release_path" target="_blank">{{ $t('message.versionCheck.updateAvailable') }}</a></span>
    <span v-if="firmware_different()"> - <span class="click" @click="$emit('firmware-click')">{{ $t('message.versionCheck.firmwareDirectionAvailable', { direction: getFirmwareDirectionLabel() }) }}</span></span>
  </div>
  <div v-if="incompatibleDriver()" class="warning-wrap">
      <a class="warning" href="https://utility.frostycoolslug.com/update-site/drivers/TC-Helicon_GoXLR_Driver_5.68.zip" target="_blank">
        {{ $t('message.versionCheck.incompatibleDriver') }}
      </a>
  </div>
</template>

<script>
import {store} from "@/store";
import {driverPreVOD, firmwareSupportsMix2, hasDriverVersion, isDeviceMini, versionEqualTo, versionNewerOrEqualTo} from "@/util/util";
import AccessibleModal from "@/components/design/modal/AccessibleModal.vue";

export default {
  name: "VersionCheck",
  components: {AccessibleModal},

  data: function () {
    return {
      version: undefined,
      release_path: "#",
    }
  },

  methods: {
    getLatest() {
      fetch(this.getPath())
          .then(response => {
            if (response.status !== 200) {
              return undefined;
            }
            return response.json()
          })
          .then(data => {
            if (data === undefined) {
              return;
            }
            fetch(data[0].url)
                .then(response => response.json())
                .then(data => {
                  this.version = data.tag_name.substring(1);
                  this.release_path = data.html_url;
                })
          });
    },

    hasVersion() {
      return (store.daemonVersion() !== undefined);
    },

    getVersion() {
      return store.daemonVersion();
    },

    getFirmwareVersion() {
      if (store.getActiveDevice() === undefined) {
        return false;
      }

      if (store.getConfig() === undefined) {
        return false;
      }

      if (store.getConfig().latest_firmware !== undefined && store.getConfig().latest_firmware !== null) {
        let latest = isDeviceMini() ? store.getConfig().latest_firmware.Mini : store.getConfig().latest_firmware.Full;
        if (latest === undefined || latest === null) {
          return false;
        }

        return latest.version.join(".");
      }
      return true;
    },

    outdated() {
      if (store.daemonVersion() === undefined) {
        return false;
      }
      return this.isOutdated(store.daemonVersion(), this.version);
    },

    firmware_different() {
      if (store.getActiveDevice() === undefined) {
        return false;
      }

      if (store.getConfig() === null || store.getConfig() === undefined) {
        return false;
      }

      if (store.getConfig().latest_firmware !== undefined && store.getConfig().latest_firmware !== null) {
        let latest = isDeviceMini() ? store.getConfig().latest_firmware.Mini : store.getConfig().latest_firmware.Full;
        if (latest === undefined || latest === null) {
          return false;
        }
        latest = latest.version;

        let current = store.getActiveDevice().hardware.versions.firmware;
        return !versionEqualTo(latest, current);
      }

      // Fail Safe if versions are missing..
      return false;
    },

    firmware_direction() {
      if (store.getActiveDevice() === undefined) {
        return false;
      }

      if (store.getConfig() === null || store.getConfig() === undefined) {
        return false;
      }

      if (store.getConfig().latest_firmware !== undefined && store.getConfig().latest_firmware !== null) {
        let latest = isDeviceMini() ? store.getConfig().latest_firmware.Mini : store.getConfig().latest_firmware.Full;
        if (latest === undefined || latest === null) {
          return false;
        }
        latest = latest.version;

        let current = store.getActiveDevice().hardware.versions.firmware;
        if (versionNewerOrEqualTo(latest, current)) {
          return "update"
        } else {
          return "downgrade"
        }
      }

      return "unknown";
    },

    getFirmwareDirectionLabel() {
      const direction = this.firmware_direction();
      if (!direction) {
        return "";
      }

      return this.$t(`message.versionCheck.firmwareDirections.${direction}`);
    },

    incompatibleDriver() {
      return driverPreVOD() && firmwareSupportsMix2() && hasDriverVersion();
    },

    getPath() {
      return "https://api.github.com/repos/GoXLR-on-Linux/goxlr-utility/releases";
    },

    isOutdated(base_version, match_version) {
      if (match_version === undefined) {
        // If we can't map the current version, assume they match to avoid bugging the user.
        return false;
      }

      let base = base_version.split(".");
      let match = match_version.split(".");

      // This isn't perfect, but it doesn't need to be. If the util is reporting a different version from github, there
      // has likely been an update, we'll deal with edge cases separately..
      if (base[0] !== match[0]) {
        return true;
      }

      if (base[1] !== match[1]) {
        return true;
      }

      if (base[2] !== undefined) {
        if (match[2] !== undefined) {
          if (base[2] !== match[2]) {
            return true;
          }
        } else {
          return true;
        }
      }

      if (base[3] !== undefined) {
        if (match[3] !== undefined) {
          if (base[3] !== match[3]) {
            return true;
          }
        } else {
          return true;
        }
      }
      return false;
    }
  },

  mounted() {
    this.getLatest();
  }
}
</script>

<style scoped>
/* In the side menu, under the connected device */
.version {
  margin-top: 6px;
  font-size: 11px;
  color: var(--c-muted);
}

.version a,
.version span.click {
  color: var(--c-accent);
  cursor: pointer;
  text-decoration: underline;
}

.warning-wrap {
  margin-top: 8px;
}

.warning {
  display: block;
  padding: 6px 8px;
  border: 1px solid var(--c-danger);
  border-radius: 6px;
  background-color: var(--c-danger-bg);
  color: var(--c-text);
  font-size: 11px;
  font-weight: 600;
  text-decoration: none;
}
</style>
