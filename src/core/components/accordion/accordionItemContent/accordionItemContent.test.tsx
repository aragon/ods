import { render, screen } from '@testing-library/react';
import { type ComponentPropsWithRef } from 'react';
import { AccordionContainer } from '../accordionContainer/accordionContainer';
import { AccordionItem } from '../accordionItem/accordionItem';
import { AccordionItemContent } from './accordionItemContent';

describe('<AccordionItemContent /> component', () => {
    const createTestComponent = (props?: ComponentPropsWithRef<typeof AccordionItemContent>) => {
        const completeProps = { ...props };
        return (
            <AccordionContainer type="multiple" defaultValue={['value-key']}>
                <AccordionItem value="value-key">
                    <AccordionItemContent {...completeProps} />
                </AccordionItem>
            </AccordionContainer>
        );
    };

    it('renders without crashing', () => {
        const children = 'Children OK';
        render(createTestComponent({ children }));
        const childrenOK = screen.getByText('Children OK');
        expect(childrenOK).toBeInTheDocument();
    });
});
