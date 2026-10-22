// While on, every command this interface sends is kept here, so the Integrations page can show
// it as an API command ready to copy (for Stream Deck, OBS or a script): move a control, copy
// what it sent.
import {reactive} from "vue";

const LIMIT = 30;

export const apiRecorder = reactive({
    enabled: false,
    commands: [],
});

export function recordApiCommand(serial, command) {
    if (!apiRecorder.enabled) return;
    const name = typeof command === "string" ? command : Object.keys(command)[0];
    const entry = {serial, name, command, json: JSON.stringify({Command: [serial, command]})};

    // A slider sends a stream of the same command: keep only its last value
    const last = apiRecorder.commands[0];
    if (last && last.name === name && last.serial === serial && sameTarget(last.command, command)) {
        apiRecorder.commands[0] = entry;
        return;
    }
    apiRecorder.commands.unshift(entry);
    if (apiRecorder.commands.length > LIMIT) apiRecorder.commands.pop();
}

export function clearApiCommands() {
    apiRecorder.commands.splice(0);
}

// Same command on the same thing (a volume on the same channel): everything but the last value
function sameTarget(a, b) {
    const args = (command) => {
        if (typeof command === "string") return [];
        const value = Object.values(command)[0];
        return Array.isArray(value) ? value.slice(0, -1) : [];
    };
    return JSON.stringify(args(a)) === JSON.stringify(args(b));
}
