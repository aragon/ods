import { MDXProvider, useMDXComponents } from '@mdx-js/react';
import classNames from 'classnames';
import DOMPurify from 'dompurify';
import { marked } from 'marked';
import { useEffect, useState, type ComponentProps } from 'react';

interface ICopyParserProps extends ComponentProps<'div'> {
    content?: string;
}

export const CopyParser: React.FC<ICopyParserProps> = ({ content, children, ...divProps }) => {
    const [renderContent, setRenderContent] = useState<string | null>(null);
    const components = useMDXComponents();

    useEffect(() => {
        const processContent = async () => {
            if (content) {
                let html: string;

                if (content.includes('<') && content.includes('>')) {
                    html = DOMPurify.sanitize(content);
                } else {
                    const markdownHtml = await marked(content);
                    html = DOMPurify.sanitize(markdownHtml);
                }

                setRenderContent(html);
            }
        };

        processContent();
    }, [content]);

    const proseClassnames = classNames(
        'prose',
        'prose-h1:text-success-800', // h1 styling
        'prose-h2:text-success-700', // h2 styling
        'prose-h3:text-success-600', // h3 styling
        'prose-h4:text-success-500', // h4 styling
        'prose-h5:text-success-400', // h5 styling
        'prose-h6:text-success-300', // h6 styling
        'prose-ol:text-primary-600', // ol styling
        'prose-ul:text-primary-600', // ul styling
        'prose-li:text-primary-600', // li styling
        'prose-p:text-primary-600', // p styling
        'prose-a:text-primary-600', // a styling
        'prose-strong:text-primary-600', // strong styling
        'prose-em:text-primary-600', // em styling
        divProps.className,
    );

    if (content && renderContent) {
        return (
            <MDXProvider components={components}>
                <div className={proseClassnames} dangerouslySetInnerHTML={{ __html: renderContent }} {...divProps} />
            </MDXProvider>
        );
    } else {
        return (
            <MDXProvider components={components}>
                <div className={proseClassnames} {...divProps}>
                    {children}
                </div>
            </MDXProvider>
        );
    }
};
