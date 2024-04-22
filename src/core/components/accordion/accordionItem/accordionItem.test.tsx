import { render, screen } from '@testing-library/react';
import { AccordionContainer } from '../accordionContainer/accordionContainer';
import { AccordionItem, type IAccordionItemProps } from './accordionItem';

describe('<AccordionItem /> component', () => {
    const createTestComponent = (props?: Partial<IAccordionItemProps>) => {
        const defaultProps: IAccordionItemProps = {
            value: 'value-key',
            ...props,
        };
        return (
            <AccordionContainer>
                <AccordionItem {...defaultProps} />
            </AccordionContainer>
        );
    };

    it('renders without crashing', () => {
        const children = 'Children OK';
        render(createTestComponent({ children }));
        const childrenOK = screen.getByText('Children OK');
        expect(childrenOK).toBeInTheDocument();
    });

    it('renders with a different value', () => {
        const children = 'Children OK';
        const value = 'value-key-2';
        render(createTestComponent({ children, value }));
        const childrenOK = screen.getByText('Children OK');
        expect(childrenOK).toBeInTheDocument();
    });
});
