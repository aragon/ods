import { AccordionContainer } from './accordionContainer/accordionContainer';
import { AccordionItem } from './accordionItem/accordionItem';
import { AccordionItemContent } from './accordionItemContent/accordionItemContent';
import { AccordionItemHeader } from './accordionItemHeader/accordionItemHeader';

export const Accordion = {
    Container: AccordionContainer,
    Item: AccordionItem,
    ItemHeader: AccordionItemHeader,
    ItemContent: AccordionItemContent,
};

export * from './accordionContainer';
export * from './accordionItem';
export * from './accordionItemContent';
export * from './accordionItemHeader';
