// The colour theme: "dark", "light" or "system" (follows the operating system), remembered in
// local storage and applied as data-theme on <html> (see assets/theme.css).
import {clearThemeColours} from "@/util/util";

// A "themechange" event is sent on window after each change, for drawings that can't use CSS
// variables (see themeColour).
const KEY = "theme";
const media = window.matchMedia("(prefers-color-scheme: light)");

export function getThemeMode() {
    try {
        return localStorage.getItem(KEY) || "dark";
    } catch (e) {
        return "dark";
    }
}

function apply(mode) {
    const light = mode === "light" || (mode === "system" && media.matches);
    document.documentElement.dataset.theme = light ? "light" : "dark";
    clearThemeColours();
    window.dispatchEvent(new Event("themechange"));
}

export function setThemeMode(mode) {
    try {
        localStorage.setItem(KEY, mode);
    } catch (e) {
        // Not remembered, still applied for this session.
    }
    apply(mode);
}

export function initTheme() {
    apply(getThemeMode());
    media.addEventListener("change", () => apply(getThemeMode()));
}
