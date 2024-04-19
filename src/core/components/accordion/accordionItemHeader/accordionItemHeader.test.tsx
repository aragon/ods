import { fireEvent, render, screen } from '@testing-library/react';
import { forwardRef, type ReactNode } from 'react';
import { AccordionContainer, type IAccordionContainerProps } from '../accordionContainer/accordionContainer';
import { AccordionItem } from '../accordionItem/accordionItem';
import { AccordionItemHeader } from './accordionItemHeader';

describe('<AccordionItemHeader /> component', () => {
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
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionItemHeader>Mock Header 2</AccordionItemHeader>
                </AccordionItem>
            </AccordionContainer>
        );
    };

    it('renders without crashing', () => {
        render(createTestComponent());
    });

    it('renders data-state of header of first item `open` and header second item `closed` on mount', () => {
        render(createTestComponent());
        const header1 = screen.getByText('Mock Header 1');
        const header2 = screen.getByText('Mock Header 2');

        expect(header1).toHaveAttribute('data-state', 'open');
        expect(header1).toHaveAttribute('aria-expanded', 'true');

        expect(header2).toHaveAttribute('data-state', 'closed');
        expect(header2).toHaveAttribute('aria-expanded', 'false');
    });

    it('toggles data-state of headers on opposing click with default props', () => {
        render(createTestComponent());
        const header1 = screen.getByText('Mock Header 1');
        const header2 = screen.getByText('Mock Header 2');

        fireEvent.click(header2);
        expect(header2).toHaveAttribute('data-state', 'open');
        expect(header2).toHaveAttribute('aria-expanded', 'true');

        expect(header1).toHaveAttribute('data-state', 'closed');
        expect(header1).toHaveAttribute('aria-expanded', 'false');

        fireEvent.click(header1);
        expect(header1).toHaveAttribute('data-state', 'open');
        expect(header1).toHaveAttribute('aria-expanded', 'true');

        expect(header2).toHaveAttribute('data-state', 'closed');
        expect(header2).toHaveAttribute('aria-expanded', 'false');
    });

    it('allows both headers to be closed with collapsible prop set true', () => {
        const collapsible = true;
        render(createTestComponent({ collapsible }));
        const header1 = screen.getByText('Mock Header 1');
        const header2 = screen.getByText('Mock Header 2');

        fireEvent.click(header1);
        expect(header1).toHaveAttribute('data-state', 'closed');
        expect(header1).toHaveAttribute('aria-expanded', 'false');

        expect(header2).toHaveAttribute('data-state', 'closed');
        expect(header2).toHaveAttribute('aria-expanded', 'false');
    });
});
