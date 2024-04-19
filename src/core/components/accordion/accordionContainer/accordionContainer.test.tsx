import { render, screen } from '@testing-library/react';
import { forwardRef, type ReactNode } from 'react';
import { AccordionContainer, type IAccordionContainerProps } from './accordionContainer';

describe('<AccordionContainer /> component', () => {
    const MockChildren = forwardRef<HTMLDivElement, { children?: ReactNode }>((props, ref) => (
        <div ref={ref}>{props.children}</div>
    ));
    MockChildren.displayName = 'MockChild';

    const createTestComponent = (props?: Partial<IAccordionContainerProps>) => {
        const defaultProps: IAccordionContainerProps = {
            children: <MockChildren>Mock Children</MockChildren>,
            ...props,
        };

        return <AccordionContainer {...defaultProps} />;
    };

    it('renders without crashing', () => {
        render(createTestComponent());
    });

    it('renders with custom class name', () => {
        const className = 'custom-class';
        render(createTestComponent({ className }));
        // eslint-disable-next-line testing-library/no-node-access
        expect(screen.getByText('Mock Children').parentNode).toHaveClass('custom-class');
    });

    it('honors the collapsible prop', () => {
        const collapsible = true;
        render(createTestComponent({ collapsible }));
    });
});
