import { render, screen } from '@testing-library/react';
import { Toggle } from '../toggle';
import { ToggleGroup } from './toggleGroup';
import type { IToggleGroupProps } from './toggleGroup.api';

describe('<ToggleGroup /> component', () => {
    const createTestComponent = (props?: Partial<IToggleGroupProps>) => {
        const completeProps: IToggleGroupProps = {
            value: undefined,
            onChange: jest.fn(),
            ...props,
        };

        return <ToggleGroup {...completeProps} />;
    };

    it('renders the children components', () => {
        const children = [
            <Toggle key="first" value="first" label="First" />,
            <Toggle key="second" value="second" label="Second" />,
        ];
        render(createTestComponent({ children }));
        expect(screen.getAllByRole('button')).toHaveLength(children.length);
    });
});
