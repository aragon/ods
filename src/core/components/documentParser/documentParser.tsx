import { MDXProvider, useMDXComponents } from '@mdx-js/react';
import classNames from 'classnames';
import DOMPurify from 'dompurify';
import { marked } from 'marked';
import { useEffect, useState, type ComponentProps } from 'react';

interface IDocumentParserProps extends ComponentProps<'div'> {}

export const DocumentParser: React.FC<IDocumentParserProps> = (props) => {
    const { children, className, ...otherProps } = props;
    const [processedContent, setProcessedContent] = useState<string | null>(null);
    const components = useMDXComponents();

    useEffect(() => {
        const processContent = async () => {
            if (children && typeof children === 'string') {
                let html: string;

                if (children.includes('<') && children.includes('>')) {
                    html = DOMPurify.sanitize(children);
                } else {
                    const markdownHtml = await marked(children);
                    html = DOMPurify.sanitize(markdownHtml);
                }

                setProcessedContent(html);
            }
        };

        processContent();
    }, [children]);

    const proseClassnames = classNames(
        'prose', // enable prose
        'prose:font-normal prose:leading-tight', // base styling
        'prose-headings:mt-2 prose-headings:text-neutral-800', // headings styling
        'prose-h1:mb-10  prose-h1:text-4xl md:prose-h1:text-5xl', // h1 styling
        'prose-h2:mb-8 prose-h2:text-3xl md:prose-h2:text-4xl', // h2 styling
        'prose-h3:mb-6 prose-h3:text-2xl md:prose-h3:text-3xl', // h3 styling
        'prose-h4:mb-4 prose-h4:text-xl md:prose-h4:text-2xl', // h4 styling
        'prose-h5:mb-2 prose-h5:text-lg md:prose-h5:text-xl', // h5 styling
        'prose-h6:mb-1 prose-h6:text-base md:prose-h6:text-lg', // h6 styling
        'prose-p:text-base prose-p:text-neutral-500 md:prose-p:text-lg', // paragraph styling
        'prose-a:text-primary-400 prose-a:no-underline hover:prose-a:text-primary-600 active:prose-a:text-primary-800', // anchor styling
        'prose-strong:text-base prose-strong:text-neutral-500 md:prose-strong:text-lg', // bold/strong styling
        'prose-em:text-base prose-em:text-neutral-500 md:prose-em:text-lg', // italic/em styling
        '', // ol styling
        '', // ul styling
        '', // li styling
        'prose-button:text-neutral-0', // strikethrough styling
        'prose-blockquote:rounded-lg prose-blockquote:border prose-blockquote:border-neutral-200 prose-blockquote:bg-neutral-50 prose-blockquote:px-10 prose-blockquote:shadow-neutral-md', // blockquote styling
        'prose-pre:rounded-lg prose-pre:bg-neutral-900 prose-pre:text-neutral-50', // code styling
        'prose-img:overflow-hidden prose-img:rounded-xl prose-img:shadow-neutral-md', // img styling
        'prose-video:overflow-hidden prose-video:rounded-xl prose-video:shadow-neutral-md', // video styling
        'prose-hr:my-10 prose-hr:border-neutral-200', // hr styling
        className,
    );

    return (
        <MDXProvider components={components}>
            {processedContent ? (
                <div
                    className={proseClassnames}
                    dangerouslySetInnerHTML={{ __html: processedContent }}
                    {...otherProps}
                />
            ) : (
                <div className={proseClassnames} {...otherProps}>
                    {children}
                </div>
            )}
        </MDXProvider>
    );
};
