import { Link } from '@tiptap/extension-link';
import { Placeholder } from '@tiptap/extension-placeholder';
import { EditorContent, useEditor } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';
import classNames from 'classnames';
import { useCallback, useEffect, useMemo } from 'react';
import { Button } from '../../button';
import { IconType } from '../../icon';
import { InputContainer, type IInputContainerProps } from '../../input';

export interface ITextAreaRichTextProps extends Omit<IInputContainerProps, 'maxLength' | 'inputLength'> {
    /**
     * Current value of the input.
     */
    value?: string;
    /**
     * Callback called on value change.
     */
    onChange?: (value: string) => void;
    /**
     * Placeholder of the input.
     */
    placeholder?: string;
}

interface ITextAreaRichTextAction {
    /**
     * Icon of the action.
     */
    icon: IconType;
    /**
     * TipTap command or callback called on action click.
     */
    action?: () => unknown;
    /**
     * Hides the action when set to true.
     */
    hidden?: boolean;
}

const placeholderClasses = classNames(
    'first:before:pointer-events-none first:before:absolute first:before:top-5', // General
    'first:before:text-base/tight first:before:font-normal first:before:text-neutral-300', // Typography
    'first:before:content-[attr(data-placeholder)]', // Content
);

export const TextAreaRichText: React.FC<ITextAreaRichTextProps> = (props) => {
    const { value, onChange, placeholder, isDisabled, ...containerProps } = props;

    const editor = useEditor({
        extensions: [
            StarterKit,
            Placeholder.configure({ placeholder, emptyNodeClass: placeholderClasses, showOnlyWhenEditable: false }),
            Link,
        ],
        content: value,
        editable: !isDisabled,
        editorProps: {
            attributes: { class: 'outline-none p-4 prose prose-neutral min-h-[144px] max-w-auto' },
        },
        onUpdate: ({ editor }) => onChange?.(editor.getHTML()),
    });

    const unsetLink = useCallback(() => editor?.chain().focus().extendMarkRange('link').unsetLink().run(), [editor]);

    const setLink = useCallback(() => {
        const previousUrl = editor?.getAttributes('link').href;
        const url = window.prompt('URL', previousUrl);

        if (url == null || url === '') {
            unsetLink();

            return;
        }

        editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }, [editor, unsetLink]);

    const richTextActions = useMemo(() => {
        const actions: ITextAreaRichTextAction[] = [
            { icon: IconType.WYSIWYG_BOLD, action: () => editor?.chain().focus().toggleBold().run() },
            { icon: IconType.WYSIWYG_ITALIC, action: () => editor?.chain().focus().toggleItalic().run() },
            { icon: IconType.WYSIWYG_LINK_SET, action: setLink, hidden: editor?.isActive('link') },
            { icon: IconType.WYSIWYG_LINK_UNSET, action: unsetLink, hidden: !editor?.isActive('link') },
            { icon: IconType.WYSIWYG_LIST_UNORDERED, action: () => editor?.chain().focus().toggleBulletList().run() },
            { icon: IconType.WYSIWYG_LIST_ORDERED, action: () => editor?.chain().focus().toggleOrderedList().run() },
        ];

        return actions.filter((action) => !action.hidden);
    }, [editor, setLink, unsetLink]);

    // Update editable setting on Tiptap editor on isDisabled property change
    useEffect(() => {
        editor?.setEditable(!isDisabled);
    }, [editor, isDisabled]);

    return (
        <InputContainer isDisabled={isDisabled} {...containerProps}>
            <div className="flex grow flex-col">
                <div
                    className={classNames('flex flex-row justify-between rounded-xl px-4 py-3', {
                        'bg-gradient-to-b from-neutral-50': !isDisabled,
                    })}
                >
                    <div className="flex flex-row gap-3">
                        {richTextActions.map(({ icon, action }) => (
                            <Button
                                key={icon}
                                variant="tertiary"
                                size="md"
                                iconLeft={icon}
                                onClick={action}
                                state={isDisabled ? 'disabled' : undefined}
                            />
                        ))}
                    </div>
                    <Button
                        variant="tertiary"
                        size="md"
                        iconLeft={IconType.EXPAND}
                        onClick={() => null}
                        state={isDisabled ? 'disabled' : undefined}
                    />
                </div>
                <EditorContent editor={editor} />
            </div>
        </InputContainer>
    );
};
