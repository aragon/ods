import { render, screen } from '@testing-library/react';
import { Checkbox } from '../checkbox';
import { CheckboxGroup, type ICheckboxGroupProps } from './checkboxGroup';

describe('<CheckboxGroup /> component', () => {
    const createTestComponent = (props?: Partial<ICheckboxGroupProps>) => {
        const completeProps = { ...props };

        return <CheckboxGroup {...completeProps} />;
    };

    it('renders the checkboxes', () => {
        const children = [<Checkbox key="first" label="first" />, <Checkbox key="second" label="second" />];
        render(createTestComponent({ children }));
        expect(screen.getAllByRole('checkbox')).toHaveLength(children.length);
    });
});
