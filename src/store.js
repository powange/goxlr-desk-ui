import { reactive } from "vue";
import { applyOperation } from "fast-json-patch";


export const store = reactive({
    is_connected: false,
    has_connected: false,
    have_device: false,
    active: true,
    activeSerial: "",

    pausedPaths: [],

    // True while the sample assign dialog adds samples, so the Sampler page doesn't open its own
    // progress and error dialogs for them.
    sampleAssignBusy: false,

    // Messages shown in the corner (see Toasts.vue): {id, type: "error" | "ok", message}
    toasts: [],
    toastCounter: 0,

    on_connected: [],
    on_disconnected: [],

    // Set a 'base' status struct..
    status: {
        "mixers": {},
        "files": {}
    },
    a11y: {
        notifications: {
            enabled: true,
            assertive: "",
            polite: ""
        }
    },

    onConnected(func) {
        this.on_connected.push(func);
    },

    onDisconnected(func) {
        this.on_disconnected(func);
    },

    // The interface and its data stay as they were while reconnecting (it's shown as such), so a
    // short drop doesn't send the user back to the device list.
    socketDisconnected() {
        this.is_connected = false;
        for (let func of this.on_disconnected) {
            func();
        }
    },


    socketConnected(status) {
        this.has_connected = true;
        this.replaceData(status);
        this.is_connected = true;

        for (let func of this.on_connected) {
            func();
        }
    },

    daemonVersion() {
        if (this.status !== undefined) {
            if (this.status.config !== undefined) {
                return this.status.config.daemon_version;
            }
            return undefined;
        } else {
            return undefined;
        }
    },

    isConnected() {
        return this.is_connected;
    },

    // These methods determine whether at any point in the past we've connected..
    hasConnected() {
        return this.has_connected;
    },

    getConfig() {
        return this.status.config;
    },

    getVersion() {
        return this.status.config.daemon_version;
    },

    getDeviceCount() {
        return Object.keys(this.status.mixers).length;
    },

    setActiveSerial(serial) {
        this.activeSerial = serial;
        if (serial !== "") {
            try {
                localStorage.setItem("lastSerial", serial);
            } catch (e) {
                // Only remembered for this session
            }
        }
    },

    // Selects the device used last time when it's back (after a reconnection or a restart).
    restoreSerial() {
        if (this.activeSerial !== "") return;
        let last = undefined;
        try {
            last = localStorage.getItem("lastSerial");
        } catch (e) {
            return;
        }
        if (last && this.status.mixers[last] !== undefined) this.activeSerial = last;
    },

    getActiveDevice() {
        if (this.activeSerial === "") {
            return undefined;
        }
        return this.status.mixers[this.activeSerial];
    },

    hasActiveDevice() {
        return this.activeSerial !== "";
    },

    getActiveSerial() {
        return this.activeSerial;
    },

    getProfileFiles() {
        return this.status.files.profiles;
    },

    getMicProfileFiles() {
        return this.status.files.mic_profiles;
    },

    getPresetFiles() {
        return this.status.files.presets;
    },

    getSampleFiles() {
        return this.status.files.samples;
    },

    // Every folder below the samples directory, empty ones included (older daemons don't send it).
    getSampleFolders() {
        return this.status.files.sample_folders || [];
    },

    // Deleted samples and folders that can be restored (older daemons don't send it).
    getSampleTrash() {
        return this.status.files.sample_trash || [];
    },

    getProfileTrash() {
        return this.status.files.profile_trash || [];
    },

    getIconFiles() {
        return this.status.files.icons;
    },

    replaceData(json) {
        if (this.active) {
            Object.assign(this.status, json.Status);
            this.have_device = true;
            this.validateActive();
            this.restoreSerial();
        }
    },

    pausePatchPath(path) {
        if (path === undefined) {
            console.error("Attempted to Stop Patches for Undefined!");
            return;
        }
        let paths = path.split(";");
        for (path of paths) {
            this.pausedPaths.push(path);
        }
    },

    resumePatchPath(path) {
        let paths = path.split(";");
        for (path of paths) {
            let index = this.pausedPaths.indexOf(path);
            if (index !== -1) {
                // We don't care about key organisation, just that the entry is gone!
                delete this.pausedPaths[index];
            }
        }
    },

    // eslint-disable-next-line no-unused-vars
    patchData(json) {
        if (this.have_device) {
            for (let patch of json.Patch) {
                if (this.pausedPaths.includes(patch.path)) {
                    continue;
                }

                applyOperation(this.status, patch, true, true, false);
            }
            this.validateActive();
            this.restoreSerial();
        }
    },

    validateActive() {
        if (this.status.mixers[this.activeSerial] === undefined) {
            // We've lost our device, stop being active.
            this.activeSerial = "";
        }
    },

    pause() {
        this.active = false;
    },

    resume() {
        this.active = true;
    },

    isPaused() {
        return !this.active;
    },
    getAccessibilityNotification(type) {
        if (this.a11y.notifications.enabled) {
            return this.a11y.notifications[type];
        }
        return "";
    },
    setAccessibilityNotification(type, message) {
        this.a11y.notifications[type] = message;
    },

    // Errors stay until closed, confirmations go after a few seconds. The same message isn't
    // shown twice at once.
    addToast(type, message) {
        message = String(message);
        if (this.toasts.some(toast => toast.message === message)) return;
        const id = ++this.toastCounter;
        this.toasts.push({id, type, message});
        if (type !== "error") setTimeout(() => this.removeToast(id), 4000);
        if (this.toasts.length > 4) this.toasts.shift();
    },

    removeToast(id) {
        this.toasts = this.toasts.filter(toast => toast.id !== id);
    }
});
