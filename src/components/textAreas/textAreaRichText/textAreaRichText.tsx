import { Link } from '@tiptap/extension-link';
import { Placeholder } from '@tiptap/extension-placeholder';
import { EditorContent, useEditor } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { InputContainer, type IInputContainerProps } from '../../input';
import { TextAreaRichTextActions } from './textAreaRichTextActions';

export interface ITextAreaRichTextProps
    extends Omit<IInputContainerProps, 'maxLength' | 'inputLength' | 'value' | 'onChange'> {
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

// Classes to properly style the TipTap placeholder
// (see https://tiptap.dev/docs/editor/api/extensions/placeholder#additional-setup)
const placeholderClasses = classNames(
    'first:before:pointer-events-none first:before:absolute first:before:top-5', // General
    'first:before:text-base/tight first:before:font-normal first:before:text-neutral-300', // Typography
    'first:before:content-[attr(data-placeholder)]', // Content
);

export const TextAreaRichText: React.FC<ITextAreaRichTextProps> = (props) => {
    const { value, onChange, placeholder, isDisabled, ref, className, ...containerProps } = props;

    const [isExpanded, setIsExpanded] = useState(false);

    const extensions = [
        StarterKit,
        Placeholder.configure({ placeholder, emptyNodeClass: placeholderClasses, showOnlyWhenEditable: false }),
        Link,
    ];

    const editor = useEditor({
        extensions,
        content: value,
        editable: !isDisabled,
        editorProps: {
            attributes: { class: 'outline-none p-4 prose prose-neutral min-h-[144px] h-full max-w-none' },
        },
        onUpdate: ({ editor }) => onChange?.(editor.getHTML()),
    });

    const toggleExpanded = () => setIsExpanded((current) => !current);

    // Update editable setting on Tiptap editor on isDisabled property change
    useEffect(() => {
        editor?.setEditable(!isDisabled);
    }, [editor, isDisabled]);

    // Add keydown listener to reset expanded state on ESC key down
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsExpanded(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const textAreaRichText = (
        <InputContainer
            isDisabled={isDisabled}
            className={classNames(className, { 'fixed left-0 top-0 z-10 size-full': isExpanded })}
            wrapperClassName={classNames('overflow-hidden', { 'rounded-none': isExpanded })}
            {...containerProps}
        >
            <div className="flex h-full grow flex-col self-start">
                <TextAreaRichTextActions editor={editor} isDisabled={isDisabled} onExpandClick={toggleExpanded} />
                <EditorContent editor={editor} className="h-full" />
            </div>
        </InputContainer>
    );

    if (isExpanded) {
        return createPortal(textAreaRichText, document.body);
    }

    return textAreaRichText;
};
