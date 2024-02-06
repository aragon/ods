import { fireEvent, render, screen } from '@testing-library/react';
import { Radio } from './radio';
import { RadioGroup, type IRadioGroupProps } from './radioGroup';

describe('RadioGroup', () => {
    const createTestComponent = (props?: Partial<IRadioGroupProps>) => {
        return <RadioGroup {...props} />;
    };

    it('should render the radio group correctly', () => {
        const children = [<Radio value="1" label="1" key={1} />, <Radio value="2" label="2" key={2} />];

        render(createTestComponent({ children }));

        const inputRadioElements = screen.getAllByRole('radio');

        expect(screen.getByRole('radiogroup')).toBeInTheDocument();
        expect(inputRadioElements.length).toEqual(children.length);
        inputRadioElements.forEach((radio) => {
            expect(radio).toBeEnabled();
        });
    });

    it('should disable all radio buttons when disabled prop is true', () => {
        const children = [<Radio value="1" label="1" key={1} />, <Radio value="2" label="2" key={2} />];

        render(createTestComponent({ children, disabled: true }));

        screen.getAllByRole('radio').forEach((radio) => {
            expect(radio).toBeDisabled();
        });
    });

    it('should set the radio group value correctly', () => {
        const name = '1';
        const value = '1';
        const children = [<Radio value={value} label="1" key={1} name={name} />, <Radio value="2" label="2" key={2} />];

        render(createTestComponent({ children, value }));
        const inputRadioElement = screen.getByRole('radio', { name });

        expect(inputRadioElement).toBeChecked();
    });

    it('should call `onValueChange` when a radio button is clicked', () => {
        const handleValueChange = jest.fn();
        const name = '1';
        const value = '1';
        const children = [<Radio value={value} label="1" key={1} name={name} />, <Radio value="2" label="2" key={2} />];

        render(createTestComponent({ children, onValueChange: handleValueChange }));

        fireEvent.click(screen.getByRole('radio', { name }));
        expect(handleValueChange).toHaveBeenCalledWith(value);
    });
});
