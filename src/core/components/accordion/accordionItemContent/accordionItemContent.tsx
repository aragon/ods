import { AccordionContent as RadixAccordionContent } from '@radix-ui/react-accordion';
import classNames from 'classnames';
import { forwardRef, type ComponentPropsWithRef } from 'react';
import './index.css';

export interface IAccordionItemContentProps extends ComponentPropsWithRef<typeof RadixAccordionContent> {}

export const AccordionItemContent = forwardRef<HTMLDivElement, IAccordionItemContentProps>((props, ref) => {
    const { children, className, ...otherProps } = props;

    return (
        <RadixAccordionContent
            className={classNames(
                'overflow-hidden px-4 pb-4 pt-1 md:px-6 md:pb-6', // default styles
                'data-[state=open]:animate-[accordionExpand_0.3s_cubic-bezier(0.87,_0,_0.13,_1)_forwards]', // expanding animation
                'data-[state=closed]:animate-[accordionCollapse_0.3s_cubic-bezier(0.87,_0,_0.13,_1)_forwards]', // collapsing animation
                className,
            )}
            ref={ref}
            {...otherProps}
        >
            {children}
        </RadixAccordionContent>
    );
});

AccordionItemContent.displayName = 'Accordion.Content';
