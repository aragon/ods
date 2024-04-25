import { MDXProvider, useMDXComponents } from '@mdx-js/react';
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

    if (content && renderContent) {
        return (
            <MDXProvider components={components}>
                <div
                    className="prose prose-em:text-primary-600"
                    dangerouslySetInnerHTML={{ __html: renderContent }}
                    {...divProps}
                />
            </MDXProvider>
        );
    } else {
        return (
            <MDXProvider components={components}>
                <div className="prose  prose-em:text-primary-600" {...divProps}>
                    {children}
                </div>
            </MDXProvider>
        );
    }
};
