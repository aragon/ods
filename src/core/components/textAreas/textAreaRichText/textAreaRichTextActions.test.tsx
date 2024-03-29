import { fireEvent, render, screen } from '@testing-library/react';
import type { ChainedCommands, Editor } from '@tiptap/react';
import { IconType } from '../../icon';
import { TextAreaRichTextActions, type ITextAreaRichTextActionsProps } from './textAreaRichTextActions';

describe('<TextAreaRichTextActions /> component', () => {
    const windowPromptMock = jest.spyOn(window, 'prompt');

    afterEach(() => {
        windowPromptMock.mockReset();
    });

    const createTestComponent = (props?: Partial<ITextAreaRichTextActionsProps>) => {
        const completeProps: ITextAreaRichTextActionsProps = {
            editor: null,
            ...props,
        };

        return <TextAreaRichTextActions {...completeProps} />;
    };

    it('renders the text-area actions', () => {
        render(createTestComponent());
        expect(screen.getAllByRole('button')).toHaveLength(6);
    });

    it('renders the actions as disabled when the disabled property is set to true', () => {
        const disabled = true;
        render(createTestComponent({ disabled }));
        screen.getAllByRole<HTMLButtonElement>('button').forEach((button) => expect(button.disabled).toBeTruthy());
    });

    it('renders the set link action instead of the unset one when current active node is not a link', () => {
        const editor = { isActive: () => false } as unknown as Editor;
        render(createTestComponent({ editor }));
        expect(screen.getByTestId(IconType.RICHTEXT_LINK_ADD)).toBeInTheDocument();
        expect(screen.queryByTestId(IconType.RICHTEXT_LINK_REMOVE)).not.toBeInTheDocument();
    });

    it('renders the unset link action instead of the set one when current active node is not a link', () => {
        const editor = { isActive: () => true } as unknown as Editor;
        render(createTestComponent({ editor }));
        expect(screen.getByTestId(IconType.RICHTEXT_LINK_REMOVE)).toBeInTheDocument();
        expect(screen.queryByTestId(IconType.RICHTEXT_LINK_ADD)).not.toBeInTheDocument();
    });

    it('correctly handles the italic, bold and unordered / ordered actions', () => {
        const actions: Array<{ method: keyof ChainedCommands; icon: IconType }> = [
            { method: 'toggleBold', icon: IconType.RICHTEXT_BOLD },
            { method: 'toggleItalic', icon: IconType.RICHTEXT_ITALIC },
            { method: 'toggleBulletList', icon: IconType.RICHTEXT_LIST_UNORDERED },
            { method: 'toggleOrderedList', icon: IconType.RICHTEXT_LIST_ORDERED },
        ];

        const editorActions = actions.reduce<Partial<Record<keyof ChainedCommands, () => void>>>(
            (current, action) => ({
                ...current,
                [action.method]: jest.fn(() => ({ run: jest.fn() })),
            }),
            {},
        );

        const editor = { isActive: jest.fn(), chain: () => ({ focus: () => editorActions }) } as unknown as Editor;
        render(createTestComponent({ editor }));

        actions.forEach(({ method, icon }) => {
            expect(screen.getByTestId(icon)).toBeInTheDocument();
            fireEvent.click(screen.getByTestId(icon));
            expect(editorActions[method]).toHaveBeenCalled();
        });
    });

    it('correctly handles the expand action', () => {
        const onExpandClick = jest.fn();
        render(createTestComponent({ onExpandClick }));
        fireEvent.click(screen.getByTestId(IconType.EXPAND));
        expect(onExpandClick).toHaveBeenCalled();
    });

    it('correctly handles the unset link action', () => {
        const action = { unsetLink: jest.fn(() => ({ run: jest.fn() })) };
        const editor = {
            isActive: () => true,
            chain: () => ({ focus: () => ({ extendMarkRange: () => action }) }),
        } as unknown as Editor;
        render(createTestComponent({ editor }));
        fireEvent.click(screen.getByTestId(IconType.RICHTEXT_LINK_REMOVE));
        expect(action.unsetLink).toHaveBeenCalled();
    });

    it('correctly handles the set link action', () => {
        const newUrl = 'https://aragon.org';
        const previousUrl = 'https://test.com';
        windowPromptMock.mockReturnValue(newUrl);

        const action = { setLink: jest.fn(() => ({ run: jest.fn() })) };
        const editor = {
            isActive: () => false,
            getAttributes: () => ({ href: previousUrl }),
            chain: () => ({ focus: () => ({ extendMarkRange: () => action }) }),
        } as unknown as Editor;
        render(createTestComponent({ editor }));

        fireEvent.click(screen.getByTestId(IconType.RICHTEXT_LINK_ADD));
        expect(windowPromptMock).toHaveBeenCalledWith('URL', previousUrl);
        expect(action.setLink).toHaveBeenCalledWith({ href: newUrl });
    });

    it('unsets the current link when new url is empty', () => {
        const newUrl = '';
        windowPromptMock.mockReturnValue(newUrl);

        const action = { unsetLink: jest.fn(() => ({ run: jest.fn() })) };
        const editor = {
            isActive: () => false,
            getAttributes: () => ({}),
            chain: () => ({ focus: () => ({ extendMarkRange: () => action }) }),
        } as unknown as Editor;
        render(createTestComponent({ editor }));

        fireEvent.click(screen.getByTestId(IconType.RICHTEXT_LINK_ADD));
        expect(action.unsetLink).toHaveBeenCalled();
    });
});
