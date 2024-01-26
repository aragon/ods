import type { Editor } from '@tiptap/react';
import classNames from 'classnames';
import { useCallback, useMemo } from 'react';
import { Button } from '../../button';
import { IconType } from '../../icon';

export interface ITextAreaRichTextAction {
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

export interface ITextAreaRichTextActionsProps {
    /**
     * Instance of the TipTap editor.
     */
    editor: Editor | null;
    /**
     * Renders the actions as disabled when set to true.
     */
    isDisabled?: boolean;
    /**
     * Callback called on expand action click.
     */
    onExpandClick?: () => void;
}

export const TextAreaRichTextActions: React.FC<ITextAreaRichTextActionsProps> = (props) => {
    const { editor, isDisabled, onExpandClick } = props;

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

    return (
        <div
            className={classNames('flex flex-row justify-between gap-3 px-4 py-3', {
                'bg-gradient-to-b from-neutral-50': !isDisabled,
            })}
        >
            <div className="flex flex-row flex-wrap gap-3">
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
                onClick={onExpandClick}
                state={isDisabled ? 'disabled' : undefined}
            />
        </div>
    );
};
