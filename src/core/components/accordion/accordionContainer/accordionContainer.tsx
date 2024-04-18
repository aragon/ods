import { Accordion as RadixAccordionRoot } from '@radix-ui/react-accordion';
import classNames from 'classnames';
import { type ComponentProps } from 'react';

export interface IAccordionContainerProps extends ComponentProps<'div'> {
    /**
     * If `true`, all items can be collapsed at the same time. @default false
     */
    collapsible?: boolean;
    /**
     * Custom classes to be passed to the container
     */
    className?: string;
}

export const AccordionContainer: React.FC<IAccordionContainerProps> = (props) => {
    const { className, collapsible, children } = props;

    return (
        <RadixAccordionRoot
            className={classNames('grow bg-neutral-0', className)}
            type="single"
            defaultValue="item-1"
            collapsible={collapsible}
        >
            {children}
        </RadixAccordionRoot>
    );
};

AccordionContainer.displayName = 'Accordion.Container';
