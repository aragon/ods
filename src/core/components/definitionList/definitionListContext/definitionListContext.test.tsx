import { renderHook } from '@testing-library/react';
import type { ReactNode } from 'react';
import { testLogger } from '../../../test';
import { DefinitionListContext, useDefinitionListContext } from './definitionListContext';

describe('useDefinitionListContext hook', () => {
    const createTestWrapper = (contextValue: boolean) =>
        function TestWrapper(props: { children: ReactNode }) {
            return (
                <DefinitionListContext.Provider value={contextValue}>{props.children}</DefinitionListContext.Provider>
            );
        };

    it('throws error when used outside the definition list context provider', () => {
        testLogger.suppressErrors();
        expect(() => renderHook(() => useDefinitionListContext())).toThrow(
            'DefinitionList.Item must be used within a DefinitionList.Container',
        );
    });

    it('returns the current value of the definition list context', () => {
        const { result } = renderHook(() => useDefinitionListContext(), { wrapper: createTestWrapper(true) });
        expect(result.current).toBe(true);
    });
});
