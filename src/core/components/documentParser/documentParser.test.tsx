import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { DocumentParser, type IDocumentParserProps } from './documentParser';

describe('<DocumentParser /> component', () => {
    const createTestComponent = (props?: Partial<IDocumentParserProps>) => {
        const completeProps: IDocumentParserProps = {
            stringDocument: '<p>Hello World</p>',
            ...props,
        };

        return <DocumentParser {...completeProps} />;
    };

    it('renders without crashing', () => {
        const stringDocument = '<p>Hello World</p>';
        render(createTestComponent({ stringDocument }));
        expect(screen.getByTestId('doc-parser')).toBeInTheDocument();
    });

    it('correctly sanitizes and sets content', async () => {
        const stringDocument = '<script>alert("xss");</script><p>Valid Content</p>';
        render(createTestComponent({ stringDocument }));
        const content = await screen.findByText('Valid Content');
        expect(content).toBeInTheDocument();
        expect(screen.queryByText('alert("xss");')).not.toBeInTheDocument();
    });

    it('renders images when included in stringDocument', async () => {
        const stringDocument = '<img src="test.jpg" alt="test image">';
        render(createTestComponent({ stringDocument }));
        const image = await screen.findByAltText('test image');
        expect(image).toBeInTheDocument();
    });

    it('applies passed className to root element', () => {
        const className = 'test-class';
        render(createTestComponent({ className }));
        const rootElement = screen.getByTestId('doc-parser');
        expect(rootElement).toHaveClass('test-class');
    });
});
