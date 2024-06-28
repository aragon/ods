import { render, renderHook, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { coreCopy, type CoreCopy } from '../../assets';
import {
    OdsCoreProvider,
    useOdsCoreContext,
    type IOdsCoreContext,
    type IOdsCoreProviderProps,
} from './odsCoreProvider';

describe('<OdsCoreProvider /> component', () => {
    const createTestComponent = (props?: IOdsCoreProviderProps) => {
        const completeProps: IOdsCoreProviderProps = { ...props };

        return <OdsCoreProvider {...completeProps} />;
    };

    const createHookWrapper = (context?: Partial<IOdsCoreContext>) =>
        function hookWrapper(props: { children: ReactNode }) {
            return <OdsCoreProvider values={context}>{props.children}</OdsCoreProvider>;
        };

    it('renders the children property', () => {
        const children = 'test-children';
        render(createTestComponent({ children }));
        expect(screen.getByText(children)).toBeInTheDocument();
    });

    it('correctly sets the context values', () => {
        const customCopy: CoreCopy = {
            ...coreCopy,
            inputContainer: {
                ...coreCopy.inputContainer,
                optionalLabel: 'Not required',
            },
        };
        const context = { Img: () => 'img', Link: () => 'link', copy: customCopy };
        const { result } = renderHook(() => useOdsCoreContext(), { wrapper: createHookWrapper(context) });
        expect(result.current).toEqual(context);
    });

    it('fallbacks to the default values when some context values are not set', () => {
        const context = { Link: () => 'link' };
        const { result } = renderHook(() => useOdsCoreContext(), { wrapper: createHookWrapper(context) });
        expect(result.current.Link).toEqual(context.Link);
        expect(result.current.Img).toEqual('img');
    });

    describe('useOdsCoreContext', () => {
        it('returns default values when not used inside a OdsCoreProvider', () => {
            const { result } = renderHook(() => useOdsCoreContext());
            expect(result.current.Img).toEqual('img');
            expect(result.current.Link).toEqual('a');
        });
    });
});
