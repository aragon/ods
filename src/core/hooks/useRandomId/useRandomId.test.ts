import { renderHook } from '@testing-library/react';
import { useRandomId } from './useRandomId';

describe('useRandomId hook', () => {
    it('generates and return a random id', () => {
        const { result } = renderHook(() => useRandomId());
        expect(result.current).toBeDefined();
        expect(result.current.length).toBeGreaterThan(0);
    });

    it('returns the ID specified as param when set', () => {
        const id = 'test-id';
        const { result } = renderHook(() => useRandomId(id));
        expect(result.current).toEqual(id);
    });
});
