import { AccordionContent as RadixAccordionContent } from '@radix-ui/react-accordion';
import classNames from 'classnames';
import { forwardRef, type ComponentPropsWithRef } from 'react';

export const AccordionItemContent = forwardRef<HTMLDivElement, ComponentPropsWithRef<typeof RadixAccordionContent>>(
    ({ children, className, ...otherProps }, forwardedRef) => (
        <RadixAccordionContent
            className={classNames(
                'overflow-hidden px-4 pb-4 pt-1 data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown md:px-6 md:pb-6',
                className,
            )}
            ref={forwardedRef}
            {...otherProps}
        >
            {children}
        </RadixAccordionContent>
    ),
);

AccordionItemContent.displayName = 'Accordion.Content';
