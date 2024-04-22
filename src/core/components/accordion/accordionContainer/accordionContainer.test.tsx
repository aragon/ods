import { render, screen } from '@testing-library/react';
import { AccordionContainer, type IAccordionContainerProps } from './accordionContainer';

describe('<Accordion.Container /> component', () => {
    const createTestComponent = (props?: Partial<IAccordionContainerProps>) => <AccordionContainer {...props} />;

    it('renders without crashing', () => {
        const children = 'Children OK';
        render(createTestComponent({ children }));
        const childrenOK = screen.getByText('Children OK');
        expect(childrenOK).toBeInTheDocument();
    });
});
