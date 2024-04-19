import { fireEvent, render, screen } from '@testing-library/react';
import { forwardRef, type ReactNode } from 'react';
import { AccordionContainer, type IAccordionContainerProps } from '../accordionContainer/accordionContainer';
import { AccordionItem } from '../accordionItem/accordionItem';
import { AccordionItemHeader } from '../accordionItemHeader/accordionItemHeader';
import { AccordionItemContent } from './accordionItemContent';

describe('<AccordionItemContent /> component', () => {
    const MockHeader = forwardRef<HTMLButtonElement, { children?: ReactNode }>((props, ref) => (
        <button ref={ref}>{props.children}</button>
    ));
    MockHeader.displayName = 'MockHeader';

    const MockContent = forwardRef<HTMLDivElement, { children?: ReactNode }>((props, ref) => (
        <div ref={ref}>{props.children}</div>
    ));
    MockContent.displayName = 'MockContent';

    const createTestComponent = (values?: Partial<IAccordionContainerProps>) => {
        const defaultProps: IAccordionContainerProps = {
            ...values,
        };
        return (
            <AccordionContainer {...defaultProps}>
                <AccordionItem value="item-1">
                    <AccordionItemHeader>Mock Header 1</AccordionItemHeader>
                    <AccordionItemContent>Mock Content 1</AccordionItemContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionItemHeader>Mock Header 2</AccordionItemHeader>
                    <AccordionItemContent>Mock Content 2</AccordionItemContent>
                </AccordionItem>
            </AccordionContainer>
        );
    };

    it('renders without crashing', () => {
        render(createTestComponent());
    });

    it('renders data-state of header of first item `open` and header second item `closed` on mount', () => {
        render(createTestComponent());

        expect(screen.getByText('Mock Content 1')).toBeInTheDocument();
        expect(screen.queryByText('Mock Content 2')).not.toBeInTheDocument();
    });

    it('toggles data-state of headers on opposing click', () => {
        render(createTestComponent());
        const header1 = screen.getByText('Mock Header 1');
        const header2 = screen.getByText('Mock Header 2');

        fireEvent.click(header2);
        expect(screen.queryByText('Mock Content 1')).not.toBeInTheDocument();
        expect(screen.getByText('Mock Content 2')).toBeInTheDocument();

        fireEvent.click(header1);
        expect(screen.getByText('Mock Content 1')).toBeInTheDocument();
        expect(screen.queryByText('Mock Content 2')).not.toBeInTheDocument();
    });

    it('allows both headers to be closed with collapsible prop set true', () => {
        const collapsible = true;
        render(createTestComponent({ collapsible }));
        const header1 = screen.getByText('Mock Header 1');

        fireEvent.click(header1);
        expect(screen.queryByText('Mock Content 1')).not.toBeInTheDocument();
        expect(screen.queryByText('Mock Content 2')).not.toBeInTheDocument();
    });
});
