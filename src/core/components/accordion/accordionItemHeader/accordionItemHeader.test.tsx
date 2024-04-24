import { render, screen } from '@testing-library/react';
import { AccordionContainer } from '../accordionContainer/accordionContainer';
import { AccordionItem } from '../accordionItem/accordionItem';
import { AccordionItemHeader, type IAccordionItemHeaderProps } from './accordionItemHeader';

describe('<Accordion.ItemHeader /> component', () => {
    const createTestComponent = (props?: Partial<IAccordionItemHeaderProps>) => {
        return (
            <AccordionContainer isMulti={true}>
                <AccordionItem value="value-key">
                    <AccordionItemHeader {...props} />
                </AccordionItem>
            </AccordionContainer>
        );
    };

    it('renders the children property', () => {
        const children = 'Children OK';
        render(createTestComponent({ children }));
        const childrenOK = screen.getByText('Children OK');
        expect(childrenOK).toBeInTheDocument();
    });

    it('renders with a button element', () => {
        const children = 'Children OK';
        render(createTestComponent({ children }));
        const buttonElement = screen.getByRole('button');
        expect(buttonElement).toBeInTheDocument();
    });

    it('renders with the correct AvatarIcon', () => {
        const children = 'Children OK';
        render(createTestComponent({ children }));
        const avatarIcon = screen.getByTestId('CHEVRON_DOWN');
        expect(avatarIcon).toBeInTheDocument();
    });
});
