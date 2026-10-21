// Profiles and mic profiles as files: downloaded to share them or keep a copy, imported from
// the browser (the daemon may run on another computer, its folder isn't reachable from here).
import {getBaseHTTPAddress} from "@/util/sockets";
import {store} from "@/store";

export function exportProfile(name, mic) {
    const link = document.createElement("a");
    link.href = `${getBaseHTTPAddress()}files/profiles/${encodeURIComponent(name)}${mic ? "?kind=mic" : ""}`;
    link.download = `${name}.${mic ? "goxlrMicProfile" : "goxlr"}`;
    document.body.appendChild(link);
    link.click();
    link.remove();
}

// Sends the chosen files, then tells the user how it went (okMessage when all were imported).
export function importProfiles(files, mic, okMessage) {
    const form = new FormData();
    for (const file of files) form.append("file", file, file.name);
    const url = `${getBaseHTTPAddress()}files/profiles-import${mic ? "?kind=mic" : ""}`;
    return fetch(url, {method: "POST", body: form})
        .then(response => response.json())
        .then(result => {
            if (result !== "Ok" && result.Error !== undefined) {
                store.addToast("error", result.Error);
            } else {
                store.addToast("ok", okMessage);
            }
        })
        .catch(error => store.addToast("error", String(error)));
}
