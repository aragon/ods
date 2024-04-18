import { AccordionItem as RadixAccordionItem } from '@radix-ui/react-accordion';
import classNames from 'classnames';
import { forwardRef, type ReactNode } from 'react';

export const AccordionItem = forwardRef<HTMLDivElement, { children: ReactNode; className?: string; value: string }>(
    ({ children, className, value, ...props }, forwardedRef) => (
        <RadixAccordionItem
            value={value}
            className={classNames(
                'border-t border-neutral-100 hover:border-neutral-200 active:border-neutral-400',
                className,
            )}
            {...props}
            ref={forwardedRef}
        >
            {children}
        </RadixAccordionItem>
    ),
);

AccordionItem.displayName = 'Accordion.Item';
