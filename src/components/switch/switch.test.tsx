import { fireEvent, render, screen } from '@testing-library/react';
import { Switch, type ISwitchProps } from './switch';

describe('<Switch /> component', () => {
    const createTestComponent = (props?: Partial<ISwitchProps>) => {
        const completeProps: ISwitchProps = { ...props };

        return <Switch {...completeProps} />;
    };

    it('renders with default props', () => {
        render(createTestComponent());
        expect(screen.getByRole('switch')).toBeInTheDocument();
    });

    it('renders with custom props', () => {
        const customProps = { checked: true, id: 'customId', disabled: true, label: 'customLabel', name: 'customName' };

        render(createTestComponent(customProps));

        const switchElement = screen.getByRole('switch');
        expect(switchElement).toBeInTheDocument();
        expect(switchElement).toHaveAttribute('data-state', 'checked');
        expect(switchElement).toHaveAttribute('aria-checked', customProps.checked.toString());
        expect(switchElement).toHaveAttribute('id', customProps.id);
    });

    it('associates label correctly', () => {
        const label = 'customLabel';
        render(createTestComponent({ label }));

        expect(screen.getByLabelText(label)).toBeInTheDocument();
    });

    it('generates unique ID when no ID is provided', () => {
        render(createTestComponent());
        expect(screen.getByRole('switch')).toHaveAttribute('id');
    });

    it('invokes callback on state change and toggles state value', () => {
        const mockCallback = jest.fn();
        render(createTestComponent({ checked: true, onCheckedChanged: mockCallback }));

        const switchElement = screen.getByRole('switch');
        fireEvent.click(switchElement);

        expect(mockCallback).toHaveBeenCalledWith(false);
    });

    it('renders as disabled when disabled prop is true', () => {
        const mockCallback = jest.fn();
        render(createTestComponent({ disabled: true, onCheckedChanged: mockCallback }));

        const switchElement = screen.getByRole('switch');
        fireEvent.click(switchElement);

        expect(switchElement).toBeDisabled();
        expect(switchElement).toHaveClass('disabled:cursor-not-allowed');
        expect(mockCallback).not.toHaveBeenCalled();
    });
});
