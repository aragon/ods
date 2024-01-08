import { render } from '@testing-library/react';
import { ToggleContextProvider, type IToggleContext } from '../toggleContext';
import { Toggle, type IToggleProps } from './toggle';

describe('<Toggle /> component', () => {
    const createTestComponent = (values?: { props?: Partial<IToggleProps>; context?: Partial<IToggleContext> }) => {
        const completeProps: IToggleProps = {
            label: 'label',
            value: 'value',
            ...values?.props,
        };

        const completeContext: IToggleContext = {
            value: undefined,
            onChange: jest.fn(),
            ...values?.context,
        };

        return (
            <ToggleContextProvider value={completeContext}>
                <Toggle {...completeProps} />
            </ToggleContextProvider>
        );
    };

    it('TODO', () => {
        render(createTestComponent());
    });
});
