import {
    AccordionHeader as RadixAccordionHeader,
    AccordionTrigger as RadixAccordionTrigger,
} from '@radix-ui/react-accordion';
import classNames from 'classnames';
import { forwardRef, type ComponentPropsWithRef } from 'react';
import { AvatarIcon } from '../../avatars';
import { IconType } from '../../icon';

export const AccordionItemHeader = forwardRef<HTMLButtonElement, ComponentPropsWithRef<typeof RadixAccordionTrigger>>(
    ({ children, className, ...props }, forwardedRef) => (
        <RadixAccordionHeader className="flex">
            <RadixAccordionTrigger
                className={classNames(
                    'group flex flex-1 cursor-default items-center justify-between gap-x-4 px-4 py-3 outline-none md:gap-x-6 md:px-6 md:py-5 ',
                    className,
                )}
                {...props}
                ref={forwardedRef}
            >
                {children}
                <AvatarIcon
                    icon={IconType.CHEVRON_DOWN}
                    className="transition-transform group-data-[state=open]:rotate-180"
                />
            </RadixAccordionTrigger>
        </RadixAccordionHeader>
    ),
);

AccordionItemHeader.displayName = 'Accordion.ItemHeader';
