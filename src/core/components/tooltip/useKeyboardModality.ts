import { useCallback, useEffect } from 'react';

/**
 * Whether the most recent user interaction came from the keyboard. Document-level state on purpose: the interaction
 * modality belongs to the page, not to any single tooltip, so every tooltip reads the same value. It starts out
 * `false` so a focus that no key press preceded — a dialog autofocusing its content, a component calling `focus()` —
 * never counts as keyboard-driven.
 */
let isKeyboardModality = false;

let subscriberCount = 0;

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

/**
 * Reproduces the part of the `:focus-visible` heuristic a tooltip needs: it reports whether the focus that just
 * happened was driven by the keyboard. The CSS pseudo-class itself cannot be used here, because browsers only expose
 * it as a style and jsdom aliases it to `:focus`, which would make the distinction untestable.
 *
 * Returns a getter rather than a value so that reading it never re-renders the tooltip: the modality is only ever
 * read from inside an event handler, and the tooltip's own open state drives the render.
 */
export const useKeyboardModality = () => {
    useEffect(() => {
        subscriberCount += 1;

        // The listeners are shared by every mounted tooltip and capture the interaction before it reaches the trigger.
        if (subscriberCount === 1) {
            document.addEventListener('keydown', handleKeyDown, true);
            document.addEventListener('pointerdown', handlePointerDown, true);
        }

        return () => {
            subscriberCount -= 1;

            if (subscriberCount === 0) {
                document.removeEventListener('keydown', handleKeyDown, true);
                document.removeEventListener('pointerdown', handlePointerDown, true);
            }
        };
    }, []);

    return useCallback(() => isKeyboardModality, []);
};
