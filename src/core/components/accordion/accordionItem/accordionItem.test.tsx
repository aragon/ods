import { render, screen } from '@testing-library/react';
import { forwardRef, type ReactNode } from 'react';
import { AccordionContainer, type IAccordionContainerProps } from '../accordionContainer/accordionContainer';
import { AccordionItem } from './accordionItem';

describe('<AccordionItem /> component', () => {
    const MockChildren = forwardRef<HTMLButtonElement, { children?: ReactNode }>((props, ref) => (
        <button ref={ref}>{props.children}</button>
    ));
    MockChildren.displayName = 'MockHeader';

    const createTestComponent = (values?: Partial<IAccordionContainerProps>) => {
        const defaultProps: IAccordionContainerProps = {
            ...values,
        };
        return (
            <AccordionContainer {...defaultProps}>
                <AccordionItem value="item-1">
                    <MockChildren>Mock Children 1</MockChildren>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <MockChildren>Mock Children 2</MockChildren>
                </AccordionItem>
            </AccordionContainer>
        );
    };

    it('renders without crashing', () => {
        render(createTestComponent());
    });

    it('renders data-state of first item `open` and second item `closed` on mount', () => {
        render(createTestComponent());
        // eslint-disable-next-line testing-library/no-node-access
        expect(screen.getByText('Mock Children 1').parentNode).toHaveAttribute('data-state', 'open');
        // eslint-disable-next-line testing-library/no-node-access
        expect(screen.getByText('Mock Children 2').parentNode).toHaveAttribute('data-state', 'closed');
    });
});
