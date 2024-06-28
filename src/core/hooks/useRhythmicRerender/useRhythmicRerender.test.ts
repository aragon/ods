import { act, renderHook } from '@testing-library/react';
import { useRhythmicRerender } from './useRhythmicRerender';

jest.useFakeTimers();

describe('useRhythmicRerender', () => {
    beforeEach(() => {
        jest.clearAllTimers();
    });

    it('should rerender and update the timestamp at specified intervals', () => {
        const intervalDuration = 1000;
        const { result } = renderHook(() => useRhythmicRerender(intervalDuration));

        const initialTime = result.current;
        act(() => {
            jest.advanceTimersByTime(intervalDuration);
        });
        expect(result.current).not.toBe(initialTime); // Should have updated after the interval

        const updatedTime = result.current;
        act(() => {
            jest.advanceTimersByTime(intervalDuration);
        });
        expect(result.current).not.toBe(updatedTime); // Should have updated again after the next interval
    });

    it('should clear the interval on unmount', () => {
        const clearIntervalSpy = jest.spyOn(global, 'clearInterval');
        const { unmount } = renderHook(() => useRhythmicRerender());
        unmount();
        expect(clearIntervalSpy).toHaveBeenCalledTimes(1);
        clearIntervalSpy.mockRestore();
    });
});
