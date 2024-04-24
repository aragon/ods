import { render, screen } from '@testing-library/react';
import { AccordionContainer } from '../accordionContainer/accordionContainer';
import { AccordionItem, type IAccordionItemProps } from './accordionItem';

describe('<Accordion.Item /> component', () => {
    const createTestComponent = (props?: Partial<IAccordionItemProps>) => {
        const defaultProps: IAccordionItemProps = {
            value: 'value-key',
            ...props,
        };
        return (
            <AccordionContainer isMulti={true}>
                <AccordionItem {...defaultProps} />
            </AccordionContainer>
        );
    };

    it('renders the children property', () => {
        const children = 'Children OK';
        render(createTestComponent({ children }));
        const childrenOK = screen.getByText('Children OK');
        expect(childrenOK).toBeInTheDocument();
    });
});
