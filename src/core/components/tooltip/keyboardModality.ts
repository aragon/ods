/**
 * Whether the most recent user interaction came from the keyboard. Document-level state on purpose: the interaction
 * modality belongs to the page, not to any single tooltip, so every tooltip reads the same value. It starts out
 * `false` so a focus that no key press preceded — a dialog autofocusing its content, a component calling `focus()` —
 * never counts as keyboard-driven.
 */
let isKeyboardModality = false;

const handleKeyDown = (event: KeyboardEvent) => {
    // Meta/Alt/Control shortcuts move focus without being a focus-visible interaction, e.g. tabbing between windows.
    if (event.metaKey || event.altKey || event.ctrlKey) {
        return;
    }

    isKeyboardModality = true;
};

const handlePointerDown = () => {
    isKeyboardModality = false;
};

// Installed once for the page lifetime and deliberately never torn down. The listeners have to observe the
// interaction that *precedes* a focus, which happens while no tooltip is mounted yet whenever a dialog owns the only
// tooltips on the page: tying them to a mounted tooltip would leave the modality stale for exactly that case. The
// guard keeps importing the kit on a server free of side effects.
if (typeof document !== 'undefined') {
    document.addEventListener('keydown', handleKeyDown, true);
    document.addEventListener('pointerdown', handlePointerDown, true);
}

/**
 * Reproduces the part of the `:focus-visible` heuristic a tooltip needs: it reports whether the focus that just
 * happened was driven by the keyboard. The CSS pseudo-class itself cannot be used here, because browsers only expose
 * it as a style and jsdom aliases it to `:focus`, which would make the distinction untestable.
 */
export const getIsKeyboardModality = () => isKeyboardModality;
