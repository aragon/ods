import { render, screen } from '@testing-library/react';
import type { IInputTextProps } from '.';
import { InputText } from './inputText';

describe('<InputText /> component', () => {
    const createTestComponent = (props?: Partial<IInputTextProps>) => {
        const completeProps = { ...props };

        return <InputText {...completeProps} />;
    };

    it('renders a text input element', () => {
        render(createTestComponent());
        expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('disables the text input when isDisabled is set to true', () => {
        const isDisabled = true;
        render(createTestComponent({ isDisabled }));
        expect(screen.getByRole<HTMLInputElement>('textbox').disabled).toBeTruthy();
    });

    it('applies the input class names when defined', () => {
        const inputClassName = 'class-test';
        render(createTestComponent({ inputClassName }));
        expect(screen.getByRole('textbox').className).toContain(inputClassName);
    });

    it('renders with a left addon when addonPos is left and addon is a valid string', () => {
        const addon = 'Left Addon';
        render(createTestComponent({ addon, addonPos: 'left' }));
        expect(screen.getByText(addon)).toBeInTheDocument();
    });

    it('renders with a right addon when addonPos is right and addon is a valid string', () => {
        const addon = 'Right Addon';
        render(createTestComponent({ addon, addonPos: 'right' }));
        expect(screen.getByText(addon)).toBeInTheDocument();
    });

    it('does not render an addon when the addon string is empty', () => {
        render(createTestComponent({ addon: '', addonPos: 'left' }));
        expect(screen.queryByTestId('addon')).not.toBeInTheDocument();
    });

    it('does not render an addon when the addon string contains only whitespace', () => {
        render(createTestComponent({ addon: '   ', addonPos: 'right' }));
        expect(screen.queryByTestId('addon')).not.toBeInTheDocument();
    });
});
