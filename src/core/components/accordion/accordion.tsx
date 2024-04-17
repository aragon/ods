import { Accordion as RadixAccordion } from '@radix-ui/react-accordion';
import classNames from 'classnames';
import { type ReactNode } from 'react';
import { AccordionContent } from './accordionContent/accordionContent';
import { AccordionItem } from './accordionItem/accordionItem';
import { AccordionTrigger } from './accordionTrigger/accordionTrigger';

export interface IAccordionItem {
    /**
     * The heading of the accordion item, always visible be seen in the trigger of the item.
     */
    itemHeader?: ReactNode;
    /**
     * The content of the accordion item, seen in the triggered content section of the item.
     */
    itemContent: ReactNode;
}

export interface IAccordionProps {
    items: IAccordionItem[];
    collapsible?: boolean;
    className?: string;
}

export const Accordion: React.FC<IAccordionProps> = (props) => {
    const { className, collapsible, items } = props;

    return (
        <RadixAccordion
            className={classNames('grow bg-neutral-0', className)}
            type="single"
            defaultValue="item-1"
            collapsible={collapsible}
        >
            {items.map((item, index) => (
                <AccordionItem key={index} value={`item-${index + 1}`}>
                    <AccordionTrigger>{item.itemHeader}</AccordionTrigger>
                    <AccordionContent>{item.itemContent}</AccordionContent>
                </AccordionItem>
            ))}
        </RadixAccordion>
    );
};
