// Undo (Ctrl+Z) for the most common changes. Before a command is sent, its previous value is read
// from the status, so the inverse command can be sent later. Changes made in a row on the same
// setting (a slider being dragged) make one step.
import {store} from "@/store";

const LIMIT = 50;
// Changes to the same setting closer than this make one step
const MERGE_WINDOW = 1500;

const eq = device => device.mic_status.equaliser;
const eqMini = device => device.mic_status.equaliser_mini;

// For each command: the setting it changes (to merge steps), and the command putting it back.
const HANDLERS = {
    SetVolume: (d, [channel]) => [`volume:${channel}`, {SetVolume: [channel, d.levels.volumes[channel]]}],
    SetFaderMuteState: (d, [fader]) => [`mute:${fader}`, {SetFaderMuteState: [fader, d.fader_status[fader].mute_state]}],
    SetCoughMuteState: d => ["cough", {SetCoughMuteState: d.cough_button.state}],
    SetRouter: (d, [input, output]) => [`route:${input}:${output}`, {SetRouter: [input, output, d.router[input][output]]}],
    SetEqGain: (d, [band]) => [`eq:${band}`, {SetEqGain: [band, eq(d).gain[band]]}],
    SetEqFreq: (d, [band]) => [`eqf:${band}`, {SetEqFreq: [band, parseFloat(eq(d).frequency[band])]}],
    SetEqMiniGain: (d, [band]) => [`eqm:${band}`, {SetEqMiniGain: [band, eqMini(d).gain[band]]}],
    SetEqMiniFreq: (d, [band]) => [`eqmf:${band}`, {SetEqMiniFreq: [band, parseFloat(eqMini(d).frequency[band])]}],
    SetGateThreshold: d => ["gate", {SetGateThreshold: d.mic_status.noise_gate.threshold}],
    SetCompressorThreshold: d => ["compressor", {SetCompressorThreshold: d.mic_status.compressor.threshold}],
    SetSimpleColour: (d, [target]) => [`simple:${target}`, {SetSimpleColour: [target, d.lighting.simple[target].colour_one]}],
};

const steps = [];
let undoing = false;
// The device and profiles the steps were made on: when any of them changes (a profile loaded
// from anywhere, a scene, another device selected), the steps don't apply any more.
let context = undefined;

function currentContext() {
    const device = store.getActiveDevice();
    if (device === undefined) return undefined;
    return `${store.getActiveSerial()}\u0000${device.profile_name}\u0000${device.mic_profile_name}`;
}

function checkContext() {
    const now = currentContext();
    if (now !== context) {
        steps.length = 0;
        context = now;
    }
}

// Called with every command about to be sent to the active device
export function recordForUndo(serial, command) {
    if (undoing || serial !== store.getActiveSerial()) return;
    const name = Object.keys(command)[0];
    const handler = HANDLERS[name];
    const device = store.getActiveDevice();
    if (handler === undefined || device === undefined) return;
    checkContext();

    let args = command[name];
    if (!Array.isArray(args)) args = [args];
    let entry;
    try {
        const [key, inverse] = handler(device, args);
        entry = {key, inverse, serial, time: Date.now()};
    } catch (e) {
        return;
    }

    const last = steps[steps.length - 1];
    if (last && last.key === entry.key && entry.time - last.time < MERGE_WINDOW) {
        // Same setting still moving: keep the value from before the first change
        last.time = entry.time;
        return;
    }
    steps.push(entry);
    if (steps.length > LIMIT) steps.shift();
}

export function canUndo() {
    checkContext();
    return steps.length > 0;
}

// Sends the inverse of the last change; `send` is websocket.send_command.
export function undoLast(send) {
    checkContext();
    const step = steps.pop();
    if (step === undefined) return false;
    undoing = true;
    try {
        // To the device it was made on
        send(step.serial, step.inverse);
    } finally {
        undoing = false;
    }
    return true;
}

// A new device or profile makes the steps meaningless
export function clearUndo() {
    steps.length = 0;
}
