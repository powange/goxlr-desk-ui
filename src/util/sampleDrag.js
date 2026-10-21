// Drag data type for samples dragged out of the Samples browser. The value is a JSON array of
// sample paths, relative to the samples directory.
export const SAMPLE_DRAG_TYPE = "application/x-goxlr-samples";

export function isSampleDrag(event) {
    return event.dataTransfer !== null && [...event.dataTransfer.types].includes(SAMPLE_DRAG_TYPE);
}

export function getDraggedSamples(event) {
    try {
        let paths = JSON.parse(event.dataTransfer.getData(SAMPLE_DRAG_TYPE));
        return Array.isArray(paths) ? paths : [];
    } catch {
        return [];
    }
}
