import { type ComponentProps } from 'react';
import { ButtonVariant } from '../button';

export type CollapsedSize = 'sm' | 'md' | 'lg';

export interface ICollapsibleProps extends ComponentProps<'div'> {
    /**
     * The initial height of the collapsible container while closed. @default md
     */
    collapsedSize?: CollapsedSize;
    /**
     * Custom size for the collapsible container that will override collapsedSize prop. See 'Spacing' docs for valid input values.
     */
    customCollapsedSize?: number;
    /**
     * Default state of the collapsible container. @default false
     */
    defaultOpen?: boolean;
    /**
     * The label to display on the trigger button when the collapsible container is closed.
     */
    buttonLabelClosed?: string;
    /**
     * The label to display on the trigger button when the collapsible container is open.
     */
    buttonLabelOpened?: string;
    /**
     * Override the generic trigger button with an ODS Button component by passing a variant.
     */
    buttonVariant?: ButtonVariant;
    /**
     * Additional class names to apply to the blinder container (area that wraps the trigger).
     */
    blinderClassName?: string;
    /**
     * Callback function that is called when the collapsible container is toggled.
     */
    onToggle?: (isOpen: boolean) => void;
}
