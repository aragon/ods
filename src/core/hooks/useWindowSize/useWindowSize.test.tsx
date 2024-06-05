import { act, renderHook } from '@testing-library/react';
import { useWindowSize } from './useWindowSize';

describe('useWindowSize', () => {
    const originalInnerWidth = window.innerWidth;
    const originalInnerHeight = window.innerHeight;

    beforeEach(() => {
        Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: originalInnerWidth });
        Object.defineProperty(window, 'innerHeight', {
            writable: true,
            configurable: true,
            value: originalInnerHeight,
        });
    });

    test('should return initial window size and breakpoints', () => {
        const { result } = renderHook(() => useWindowSize());

        expect(result.current.width).toBe(originalInnerWidth);
        expect(result.current.height).toBe(originalInnerHeight);
        expect(result.current.breakpoints).toBeDefined();
        expect(result.current.breakpoints.md).toBe(786);
    });

    test('should update window size on resize', () => {
        const { result } = renderHook(() => useWindowSize());

        act(() => {
            Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 1280 });
            Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: 720 });
            window.dispatchEvent(new Event('resize'));
        });

        expect(result.current.width).toBe(1280);
        expect(result.current.height).toBe(720);
    });

    test('should clean up event listener on unmount', () => {
        const { unmount } = renderHook(() => useWindowSize());

        const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');

        unmount();

        expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
    });
});
