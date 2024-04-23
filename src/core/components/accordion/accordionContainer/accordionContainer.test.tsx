import { render, screen } from '@testing-library/react';
import { AccordionContainer, type IAccordionContainerProps } from './accordionContainer';

describe('<AccordionContainer /> component', () => {
    const createTestComponent = (props?: Partial<IAccordionContainerProps>) => {
        const defaultProps = {
            type: 'multiple' as const,
            ...props,
        };

        return <AccordionContainer {...defaultProps} />;
    };

    it('renders without crashing', () => {
        const children = 'Children OK';
        render(createTestComponent({ children }));
        const childrenOK = screen.getByText('Children OK');
        expect(childrenOK).toBeInTheDocument();
    });

    it('renders correctly with `single` type', () => {
        const type = 'single';
        const children = 'Children OK';
        render(createTestComponent({ type, children }));
        const childrenOK = screen.getByText('Children OK');
        expect(childrenOK).toBeInTheDocument();
    });
});
