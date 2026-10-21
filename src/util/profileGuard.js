// Loading a profile, or creating one from the default settings, replaces the current one,
// including what wasn't saved. Every place doing it goes through here, and the top bar asks
// before anything is lost (load, save then load, cancel).
import {reactive} from "vue";
import {store} from "@/store";

export const profileGuard = reactive({
    // {kind: "load" | "create", mic, name, current, action}
    request: null,
});

export function guardProfileChange(kind, mic, name, action) {
    const device = store.getActiveDevice();
    const modified = mic ? device.mic_profile_modified === true : device.profile_modified === true;
    if (!modified) {
        action();
        return;
    }
    const current = mic ? device.mic_profile_name : device.profile_name;
    profileGuard.request = {kind, mic, name, current, action};
}
