import {
    Accordion as RadixAccordionRoot,
    type AccordionMultipleProps,
    type AccordionSingleProps,
} from '@radix-ui/react-accordion';
import classNames from 'classnames';
import { forwardRef, type ComponentPropsWithRef, type Ref } from 'react';

export interface IAccordionContainerProps extends ComponentPropsWithRef<'div'> {
    /**
     * Determines whether one or multiple items can be opened at the same time.
     */
    type: 'single' | 'multiple';
    /**
     * The value of the item to expand when initially rendered and type is "single". Use when you do not need to control the state of the items.
     */
    defaultValue?: string | string[];
}

export const AccordionContainer = forwardRef<HTMLDivElement, IAccordionContainerProps>(
    ({ children, className, type, defaultValue, ...otherProps }, forwardedRef: Ref<HTMLDivElement>) => {
        const commonProps = {
            defaultValue,
            className: classNames('grow bg-neutral-0', className),
            ref: forwardedRef,
            ...otherProps,
        };

        const accordionProps =
            type === 'multiple'
                ? ({ ...commonProps, type: 'multiple' as const } as AccordionMultipleProps)
                : ({ ...commonProps, type: 'single' as const, collapsible: true } as AccordionSingleProps);

        return <RadixAccordionRoot {...accordionProps}>{children}</RadixAccordionRoot>;
    },
);

AccordionContainer.displayName = 'Accordion.Container';
