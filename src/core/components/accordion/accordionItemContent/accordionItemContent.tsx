import { AccordionContent as RadixAccordionContent } from '@radix-ui/react-accordion';
import classNames from 'classnames';
import { forwardRef, type ReactNode } from 'react';

export const AccordionItemContent = forwardRef<HTMLDivElement, { children: ReactNode; className?: string }>(
    ({ children, className }: { children: ReactNode; className?: string }, forwardedRef) => (
        <RadixAccordionContent
            className={classNames('overflow-hidden px-4 pb-4 pt-1 md:px-6 md:pb-6 ', className)}
            ref={forwardedRef}
        >
            {children}
        </RadixAccordionContent>
    ),
);

AccordionItemContent.displayName = 'Accordion.Content';
