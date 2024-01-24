import { Placeholder } from '@tiptap/extension-placeholder';
import { EditorContent, useEditor } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';
import classNames from 'classnames';
import { Button } from '../../button';
import { IconType } from '../../icon';
import { InputContainer, type IInputContainerProps } from '../../input';

export interface ITextAreaRichTextProps extends IInputContainerProps {
    /**
     * Current value of the input.
     */
    value?: string;
    /**
     * Placeholder of the input.
     */
    placeholder?: string;
}

const placeholderClasses = classNames(
    'first:before:pointer-events-none first:before:absolute first:before:top-5', // General
    'first:before:text-base/tight first:before:font-normal first:before:text-neutral-300', // Typography
    'first:before:content-[attr(data-placeholder)]', // Content
);

export const TextAreaRichText: React.FC<ITextAreaRichTextProps> = (props) => {
    const { value, placeholder, ...containerProps } = props;

    const editor = useEditor({
        extensions: [StarterKit, Placeholder.configure({ placeholder, emptyNodeClass: placeholderClasses })],
        content: value,
        editorProps: {
            attributes: { class: 'outline-none p-4 prose prose-neutral min-h-[144px] max-w-auto' },
        },
    });

    return (
        <InputContainer {...containerProps}>
            <div className="flex grow flex-col">
                <div className="flex flex-row gap-3 px-4 py-3">
                    <Button
                        variant="tertiary"
                        size="md"
                        iconLeft={IconType.WYSIWYG_BOLD}
                        onClick={() => editor?.chain().focus().toggleBold().run()}
                        disabled={!editor?.can().chain().focus().toggleBold().run()}
                    />
                    <Button
                        variant="tertiary"
                        size="md"
                        iconLeft={IconType.WYSIWYG_ITALIC}
                        onClick={() => editor?.chain().focus().toggleItalic().run()}
                        disabled={!editor?.can().chain().focus().toggleItalic().run()}
                    />
                    <Button
                        variant="tertiary"
                        size="md"
                        iconLeft={IconType.WYSIWYG_LIST_UNORDERED}
                        onClick={() => editor?.chain().focus().toggleBulletList().run()}
                        disabled={!editor?.can().chain().focus().toggleBulletList().run()}
                    />
                    <Button
                        variant="tertiary"
                        size="md"
                        iconLeft={IconType.WYSIWYG_LIST_ORDERED}
                        onClick={() => editor?.chain().focus().toggleOrderedList().run()}
                        disabled={!editor?.can().chain().focus().toggleOrderedList().run()}
                    />
                </div>
                <EditorContent editor={editor} />
            </div>
        </InputContainer>
    );
};
