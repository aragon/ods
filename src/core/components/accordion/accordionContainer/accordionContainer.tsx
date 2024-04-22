import {
    Accordion as RadixAccordionRoot,
    type AccordionMultipleProps,
    type AccordionSingleProps,
} from '@radix-ui/react-accordion';
import classNames from 'classnames';
import { forwardRef, type ComponentPropsWithRef } from 'react';

export interface IAccordionContainerProps extends ComponentPropsWithRef<'div'> {
    /**
     * Determines whether one or multiple items can be opened at the same time.
     */
    type?: 'single' | 'multiple';
    /**
     * When `type` is "single", allows closing content when clicking trigger for an open item.
     */
    collapsible?: boolean;
    /**
     * The default value of the accordion items that are open on mount.
     */
    defaultValue?: string[];
}

export const AccordionContainer = forwardRef<HTMLDivElement, IAccordionContainerProps>(
    ({ children, className, dir, type = 'multiple', collapsible, defaultValue, ...otherProps }, forwardedRef) => {
        const commonProps = {
            defaultValue,
            dir,
            className: classNames('grow bg-neutral-0', className),
            type,
            ...otherProps,
            ref: forwardedRef,
        };
        return (
            <>
                {type === 'single' ? (
                    <RadixAccordionRoot
                        {...(commonProps as AccordionSingleProps)}
                        type="single"
                        collapsible={collapsible}
                    >
                        {children}
                    </RadixAccordionRoot>
                ) : (
                    <RadixAccordionRoot {...(commonProps as AccordionMultipleProps)} type="multiple">
                        {children}
                    </RadixAccordionRoot>
                )}
            </>
        );
    },
);

AccordionContainer.displayName = 'Accordion.Container';
