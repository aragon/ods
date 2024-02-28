import { render, screen } from '@testing-library/react';
import { IconType } from '../../icon';
import { Checkbox, type ICheckboxProps } from './checkbox';

describe('<Checkbox /> component', () => {
    const createTestComponent = (props?: Partial<ICheckboxProps>) => {
        const completeProps = {
            label: 'test-label',
            ...props,
        };

        return <Checkbox {...completeProps} />;
    };

    it('renders a checkbox with the specified label', () => {
        const label = 'check';
        render(createTestComponent({ label }));
        expect(screen.getByRole('checkbox', { name: label })).toBeInTheDocument();
    });

    it('sets a random id to the form field when the id property is not set', () => {
        render(createTestComponent());
        expect(screen.getByRole('checkbox').id).toBeDefined();
    });

    it('renders the unchecked state when the checkbox is not checked', () => {
        const checked = false;
        render(createTestComponent({ checked }));
        expect(screen.getByTestId(IconType.CHECKBOX)).toBeVisible();
        expect(screen.queryByTestId(IconType.CHECKBOX_INDETERMINATE)).not.toBeInTheDocument();
        expect(screen.queryByTestId(IconType.CHECKBOX_SELECTED)).not.toBeInTheDocument();
    });

    it('renders the checked state when the checkbox is checked', () => {
        const checked = true;
        render(createTestComponent({ checked }));
        expect(screen.getByTestId(IconType.CHECKBOX_SELECTED)).toBeVisible();
    });

    it('renders the indeterminate state when the checked property is set to indeterminate', () => {
        const checked = 'indeterminate';
        render(createTestComponent({ checked }));
        expect(screen.getByTestId(IconType.CHECKBOX_INDETERMINATE)).toBeVisible();
    });
});
