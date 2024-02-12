import { fireEvent, render, screen } from '@testing-library/react';
import ReactDOM from 'react-dom';
import { IconType } from '../../icon';
import { TextAreaRichText, type ITextAreaRichTextProps } from './textAreaRichText';

describe('<TextAreaRichText /> component', () => {
    (global.ClipboardEvent as unknown) = class ClipboardEventMock {};
    (global.DragEvent as unknown) = class DragEventMock {};

    const createPortalMock = jest.spyOn(ReactDOM, 'createPortal');

    afterEach(() => {
        createPortalMock.mockReset();
    });

    const createTestComponent = (props?: Partial<ITextAreaRichTextProps>) => {
        const completeProps: ITextAreaRichTextProps = { ...props };

        return <TextAreaRichText {...completeProps} />;
    };

    it('renders a textbox with the specified id', async () => {
        const id = 'testid';
        render(createTestComponent({ id }));
        const component = await screen.findByRole('textbox');
        expect(component).toBeInTheDocument();
        expect(component.getAttribute('contenteditable')).toEqual('true');
        expect(component.getAttribute('aria-labelledby')).toEqual(id);
    });

    it('renders the rich text actions', () => {
        render(createTestComponent());
        expect(screen.getAllByRole('button').length).toBeGreaterThan(0);
    });

    it('disables the textbox when the isDisabled property is set to true', async () => {
        const isDisabled = true;
        render(createTestComponent({ isDisabled }));
        expect((await screen.findByRole('textbox')).getAttribute('contenteditable')).toEqual('false');
    });

    it('generates a random id for the textbox when the id property is not set', async () => {
        render(createTestComponent());
        expect((await screen.findByRole('textbox')).getAttribute('aria-labelledby')).toBeDefined();
    });

    it('calls the onChange property on input change', async () => {
        const onChange = jest.fn();
        render(createTestComponent({ onChange }));
        fireEvent.input(await screen.findByRole('textbox'), 'test');
        expect(onChange).toHaveBeenCalled();
    });

    it('renders the textarea as a React portal on expand action click', () => {
        render(createTestComponent());
        fireEvent.click(screen.getByTestId(IconType.EXPAND));
        expect(createPortalMock).toHaveBeenCalled();
        expect(document.body.style.overflow).toEqual('hidden');
    });

    it('reset the expanded state on ESC key down', () => {
        render(createTestComponent());
        fireEvent.click(screen.getByTestId(IconType.EXPAND));
        fireEvent.keyDown(window, { key: 'Escape' });
        expect(document.body.style.overflow).toEqual('auto');
    });
});
