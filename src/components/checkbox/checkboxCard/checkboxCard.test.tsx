import { render, screen } from '@testing-library/react';
import { CheckboxCard, type ICheckboxCardProps } from './checkboxCard';

describe('<CheckboxCard /> component', () => {
    const createTestComponent = (props?: Partial<ICheckboxCardProps>) => {
        const completeProps = {
            label: 'label',
            description: 'description',
            ...props,
        };

        return <CheckboxCard {...completeProps} />;
    };

    it('renders a checkbox with the specified label', () => {
        const label = 'checkbox';
        render(createTestComponent({ label }));
        expect(screen.getByRole('checkbox')).toBeInTheDocument();
        expect(screen.getByText(label)).toBeInTheDocument();
    });

    it('sets a random id when id property is not set', () => {
        render(createTestComponent());
        expect(screen.getByRole('checkbox').id).toBeDefined();
    });
});
