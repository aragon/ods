import { getIsKeyboardModality } from './keyboardModality';

describe('keyboardModality', () => {
    const pressKey = (init?: KeyboardEventInit) =>
        document.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'Tab', ...init }));

    // jsdom does not implement PointerEvent, and the listener reads nothing off the event.
    const pressPointer = () => document.dispatchEvent(new Event('pointerdown', { bubbles: true }));

    it('reports no keyboard modality before any interaction', () => {
        expect(getIsKeyboardModality()).toBe(false);
    });

    it('reports keyboard modality after a key press', () => {
        pressKey();
        expect(getIsKeyboardModality()).toBe(true);
    });

    it('reports no keyboard modality after a pointer interaction', () => {
        pressKey();
        pressPointer();
        expect(getIsKeyboardModality()).toBe(false);
    });

    it.each([{ modifier: 'metaKey' }, { modifier: 'altKey' }, { modifier: 'ctrlKey' }])(
        'ignores a key press held with $modifier, which moves focus without being a focus-visible interaction',
        ({ modifier }) => {
            pressPointer();
            pressKey({ [modifier]: true });

            expect(getIsKeyboardModality()).toBe(false);
        },
    );

    it('tracks the modality with no tooltip mounted, so it never goes stale behind one', () => {
        // The listeners are installed for the page lifetime rather than by a mounted tooltip: a dialog that owns the
        // only tooltips on the page opens while none is mounted, and that pointer interaction has to be observed.
        pressKey();
        expect(getIsKeyboardModality()).toBe(true);

        pressPointer();
        expect(getIsKeyboardModality()).toBe(false);
    });
});
