import { AccordionContent as RadixAccordionContent } from '@radix-ui/react-accordion';
import classNames from 'classnames';
import { forwardRef, type ComponentPropsWithRef } from 'react';

export interface IAccordionItemContentProps extends ComponentPropsWithRef<'div'> {
    /**
     * Forces the content to be mounted when set to true.
     */
    forceMount?: true;
}

export const AccordionItemContent = forwardRef<HTMLDivElement, IAccordionItemContentProps>((props, ref) => {
    const { children, className, forceMount, ...otherProps } = props;

    const contentClassNames = classNames(
        'overflow-hidden', // Default
        { 'data-[state=closed]:hidden': forceMount }, // Force mount variant
        'data-[state=open]:animate-[accordionExpand_0.3s_cubic-bezier(0.87,_0,_0.13,_1)_forwards]', // Expanding animation
        'data-[state=closed]:animate-[accordionCollapse_0.3s_cubic-bezier(0.87,_0,_0.13,_1)_forwards]', // Collapsing animation
        className,
    );

    return (
        <RadixAccordionContent forceMount={forceMount} className={contentClassNames} ref={ref} {...otherProps}>
            <div className="px-4 pb-4 pt-1 md:px-6 md:pb-6">{children}</div>
        </RadixAccordionContent>
    );
});

AccordionItemContent.displayName = 'Accordion.Content';
