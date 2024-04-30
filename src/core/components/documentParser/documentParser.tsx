import { Image } from '@tiptap/extension-image';
import TipTapLink from '@tiptap/extension-link';
import { EditorContent, useEditor } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';
import classNames from 'classnames';
import { useEffect, type ComponentProps } from 'react';
import sanitizeHtml from 'sanitize-html';
import { Markdown } from 'tiptap-markdown';

export interface IDocumentParserProps extends Omit<ComponentProps<'div'>, 'ref'> {
    stringDocument: string;
}

export const DocumentParser: React.FC<IDocumentParserProps> = (props) => {
    const { children, className, stringDocument, ...otherProps } = props;
    const parser = useEditor({
        editable: false,
        extensions: [
            StarterKit.configure({
                codeBlock: {
                    HTMLAttributes: {
                        class: 'language-html',
                    },
                },
            }),
            Image,
            Markdown,
            TipTapLink.configure({
                openOnClick: 'whenNotEditable',
            }),
        ],
    });

    useEffect(() => {
        if (parser) {
            const safeHTML = sanitizeHtml(stringDocument, {
                allowedTags: sanitizeHtml.defaults.allowedTags.concat([
                    'img',
                    'del',
                    'video',
                    'audio',
                    'svg',
                    'code',
                    'pre',
                ]),
                allowedClasses: {
                    code: ['language-*', 'lang-*'],
                },
                allowedAttributes: {
                    ...sanitizeHtml.defaults.allowedAttributes,
                    img: ['src', 'alt'],
                    a: ['href', 'title'],
                },

                disallowedTagsMode: 'recursiveEscape',
            });
            parser.commands.setContent(safeHTML, true);
        }
    }, [parser, stringDocument]);

    const proseClassnames = classNames('prose', className);

    return <EditorContent editor={parser} className={proseClassnames} data-testid="doc-parser" {...otherProps} />;
};
