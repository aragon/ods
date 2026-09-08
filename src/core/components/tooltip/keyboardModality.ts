/**
 * Whether the most recent user interaction was the keyboard *moving focus*. Document-level state on purpose: the
 * interaction modality belongs to the page, not to any single tooltip, so every tooltip reads the same value. It
 * starts out `false` so a focus that no key press preceded — a dialog autofocusing its content, a component calling
 * `focus()` — never counts as keyboard-driven.
 */
let isKeyboardModality = false;

/**
 * Keys whose default action moves focus: `Tab` through the tab order, and the rest within a composite widget such as
 * a menu, a tab list or a radio group. Activation keys are deliberately absent — `Enter` and `Space` press a control
 * rather than moving focus, so any focus that follows one of them was placed by script, which is exactly what a
 * dialog does to its first tabbable element when it opens.
 */
const focusMovingKeys = new Set([
    'Tab',
    'ArrowUp',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'Home',
    'End',
    'PageUp',
    'PageDown',
]);

const handleKeyDown = (event: KeyboardEvent) => {
    // Meta/Alt/Control shortcuts move focus without being a focus-visible interaction, e.g. tabbing between windows.
    if (event.metaKey || event.altKey || event.ctrlKey) {
        return;
    }

    // An activation key clears the modality rather than leaving the previous `Tab` standing: pressing Enter on a
    // button that opens a dialog must not make the dialog's own autofocus look like keyboard navigation.
    isKeyboardModality = focusMovingKeys.has(event.key);
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
