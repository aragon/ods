import { render } from '@testing-library/react';
import { Toggle, type IToggleProps } from './toggle';

describe('<Toggle /> component', () => {
    const createTestComponent = (props?: Partial<IToggleProps>) => {
        const completeProps: IToggleProps = {
            label: 'label',
            value: 'value',
            ...props,
        };

        return <Toggle {...completeProps} />;
    };

    it('TODO', () => {
        render(createTestComponent());
    });
});
