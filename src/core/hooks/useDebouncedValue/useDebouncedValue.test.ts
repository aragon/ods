import { act, renderHook } from '@testing-library/react';
import { useDebouncedValue } from './useDebouncedValue';

describe('useDebouncedValue hook', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    it('returns the value initialised to the value property and a function to update the debounced value', () => {
        const value = 'test-value';
        const { result } = renderHook(() => useDebouncedValue(value));
        expect(result.current).toEqual([value, expect.any(Function)]);
    });

    it('debounces the value updates', () => {
        const newValue = 'test';
        const { result, rerender } = renderHook((value) => useDebouncedValue(value));
        expect(result.current[0]).toBeUndefined();

        rerender(newValue);
        expect(result.current[0]).toBeUndefined();

        act(() => jest.runAllTimers());
        expect(result.current[0]).toEqual(newValue);
    });

    it('the returned setter updates the debounced value', () => {
        const newValue = 'my-value';
        const { result } = renderHook((value) => useDebouncedValue(value));
        expect(result.current[0]).toBeUndefined();
        act(() => result.current[1](newValue));
        expect(result.current[0]).toEqual(newValue);
    });
});
