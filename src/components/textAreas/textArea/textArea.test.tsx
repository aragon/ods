import { render, screen } from '@testing-library/react';
import { TextArea, type ITextAreaProps } from './textArea';

describe('<TextArea /> component', () => {
    const createTestComponent = (props?: Partial<ITextAreaProps>) => {
        const completeProps: ITextAreaProps = {
            ...props,
        };

        return <TextArea {...completeProps} />;
    };

    it('renders a textarea element', () => {
        render(createTestComponent());
        expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('disables the textarea when the isDisabled property is set to true', () => {
        const isDisabled = true;
        render(createTestComponent({ isDisabled }));
        expect(screen.getByRole<HTMLTextAreaElement>('textbox').disabled).toBeTruthy();
    });
});
