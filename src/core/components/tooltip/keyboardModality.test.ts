import { getIsKeyboardModality } from './keyboardModality';

describe('keyboardModality', () => {
    const pressKey = (init?: KeyboardEventInit) =>
        document.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'Tab', ...init }));

    // jsdom does not implement PointerEvent, and the listener reads nothing off the event.
    const pressPointer = () => document.dispatchEvent(new Event('pointerdown', { bubbles: true }));

    it('reports no keyboard modality before any interaction', async () => {
        // The initial value only exists on a freshly imported module, so this asserts it against one rather than
        // relying on running before the tests that drive the modality.
        await jest.isolateModulesAsync(async () => {
            const { getIsKeyboardModality: getFreshModality } = await import('./keyboardModality');

            expect(getFreshModality()).toBe(false);
        });
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

    it.each([{ key: 'Enter' }, { key: ' ' }, { key: 'Escape' }, { key: 'a' }])(
        'reports no keyboard modality after $key, which presses a control instead of moving focus',
        ({ key }) => {
            pressKey();
            expect(getIsKeyboardModality()).toBe(true);

            pressKey({ key });

            expect(getIsKeyboardModality()).toBe(false);
        },
    );

    it.each([
        { key: 'Tab' },
        { key: 'ArrowDown' },
        { key: 'ArrowUp' },
        { key: 'ArrowLeft' },
        { key: 'ArrowRight' },
        { key: 'Home' },
        { key: 'End' },
    ])('reports keyboard modality after $key, which moves focus', ({ key }) => {
        pressPointer();
        pressKey({ key });

        expect(getIsKeyboardModality()).toBe(true);
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
