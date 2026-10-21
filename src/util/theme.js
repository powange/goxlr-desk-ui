// The colour theme: "dark", "light" or "system" (follows the operating system), remembered in
// local storage and applied as data-theme on <html> (see assets/theme.css).
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
