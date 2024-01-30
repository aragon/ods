import { render, screen } from '@testing-library/react';
import { InputText, type IInputTextProps } from './inputText';

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

    it('renders with a left addon when addonLeft is provided', () => {
        const addonLeft = 'Left Addon';
        render(createTestComponent({ addonLeft }));
        expect(screen.getByText(addonLeft)).toBeInTheDocument();
    });

    it('renders with a right addon when addonRight is provided', () => {
        const addonRight = 'Right Addon';
        render(createTestComponent({ addonRight }));
        expect(screen.getByText(addonRight)).toBeInTheDocument();
    });

    it('does not render both addonLeft and addonRight when both are provided', () => {
        const addonLeft = 'Left Addon';
        const addonRight = 'Right Addon';
        // using unknown as Partial<IInputTextProps> to avoid TS error when forcing both addonLeft and addonRight
        render(createTestComponent({ addonLeft, addonRight } as unknown as Partial<IInputTextProps>));
        const leftAddonElement = screen.queryByText(addonLeft);
        const rightAddonElement = screen.queryByText(addonRight);
        expect(leftAddonElement).not.toBeInTheDocument();
        expect(rightAddonElement).not.toBeInTheDocument();
    });
});
