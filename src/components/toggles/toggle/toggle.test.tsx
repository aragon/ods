import { fireEvent, render, screen } from '@testing-library/react';
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

    it('renders a button with the specified label', () => {
        const label = 'Toggle Label';
        const props = { label };
        render(createTestComponent({ props }));
        expect(screen.getByRole('button', { name: label })).toBeInTheDocument();
    });

    it('renders the toggle as active when active value matches toggle value', () => {
        const activeValue = 'active-value';
        const toggleValue = activeValue;
        const props = { value: toggleValue };
        const context = { value: activeValue };
        render(createTestComponent({ props, context }));
        expect(screen.getByRole('button').className).toContain('text-neutral-800');
    });

    it('renders the toggle as active when active value includes toggle value on multi-select variant', () => {
        const activeValues = ['first', 'second'];
        const toggleValue = activeValues[0];
        const props = { value: toggleValue };
        const context = { isMultiSelect: true, value: activeValues };
        render(createTestComponent({ props, context }));
        expect(screen.getByRole('button').className).toContain('text-neutral-800');
    });

    it('renders the button as disabled when the disabled prop is set to true', () => {
        const disabled = true;
        const props = { disabled };
        render(createTestComponent({ props }));
        expect(screen.getByRole('button')).toBeDisabled();
    });

    it('correctly updates the active value on toggle click', () => {
        const onChange = jest.fn();
        const toggleValue = 'test';
        const context = { onChange };
        const props = { value: toggleValue };
        const { rerender } = render(createTestComponent({ props, context }));

        fireEvent.click(screen.getByRole('button'));
        expect(onChange).toHaveBeenCalledWith(toggleValue);

        const newContext = { onChange, value: toggleValue };
        rerender(createTestComponent({ props, context: newContext }));

        fireEvent.click(screen.getByRole('button'));
        expect(onChange).toHaveBeenCalledWith(undefined);
    });

    it('correctly updates the active values on toggle click on multi-select variant', () => {
        const onChange = jest.fn();
        const activeValues = ['first', 'second'];
        const toggleValue = 'third';
        const context = { isMultiSelect: true, onChange, value: activeValues };
        const props = { value: toggleValue };
        const { rerender } = render(createTestComponent({ props, context }));

        fireEvent.click(screen.getByRole('button'));
        const expectedNewValues = [...activeValues, toggleValue];
        expect(onChange).toHaveBeenCalledWith(expectedNewValues);

        const newContext = { ...context, value: expectedNewValues };
        rerender(createTestComponent({ props, context: newContext }));

        fireEvent.click(screen.getByRole('button'));
        expect(onChange).toHaveBeenCalledWith(activeValues);
    });

    it('correclty updates the active values when initial value is undefined on multi-select variant', () => {
        const onChange = jest.fn();
        const toggleValue = 'first';
        const context = { isMultiSelect: true, onChange };
        const props = { value: toggleValue };
        render(createTestComponent({ props, context }));

        fireEvent.click(screen.getByRole('button'));
        expect(onChange).toHaveBeenCalledWith([toggleValue]);
    });
});
