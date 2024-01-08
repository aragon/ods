import { renderHook } from '@testing-library/react';
import type { ReactNode } from 'react';
import { testLogger } from '../../../test';
import { ToggleContextProvider, useToggleContext, type IToggleContext } from './toggleContext';

describe('useToggleContext hook', () => {
    const createHookWrapper = (values?: Partial<IToggleContext>) =>
        function toggleContextWrapper(props: { children?: ReactNode }) {
            const completeValues: IToggleContext = {
                value: undefined,
                onChange: jest.fn(),
                ...values,
            };

            return <ToggleContextProvider value={completeValues}>{props.children}</ToggleContextProvider>;
        };

    it('throws error when not used with a ToggleContext provider ', () => {
        testLogger.suppressErrors();
        expect(() => renderHook(() => useToggleContext())).toThrowError();
    });

    it('returns the ToggleContext values', () => {
        const values: IToggleContext = {
            value: 'selected-toggle',
            onChange: jest.fn(),
            isMultiSelect: true,
        };
        const { result } = renderHook(() => useToggleContext(), { wrapper: createHookWrapper(values) });
        expect(result.current).toEqual(values);
    });
});
