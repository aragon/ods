import type { InputHTMLAttributes, ReactNode } from 'react';

export type InputVariant = 'default' | 'warning' | 'critical';

export interface IInputContainerProps {
    /**
     * Label of the input.
     */
    label?: string;
    /**
     * Variant of the input.
     * @default default
     */
    variant?: InputVariant;
    /**
     * Help text displayed above the input.
     */
    helpText?: string;
    /**
     * Displays the optional tag when set to true.
     */
    isOptional?: boolean;
    /**
     * Displays the input as disabled when set to true.
     */
    isDisabled?: boolean;
    /**
     * Additional information displayed below the input.
     */
    infoText?: string;
    /**
     * Alert message displayed below the input.
     */
    alertMessage?: string;
    /**
     * Children of the component.
     */
    children?: ReactNode;
    /**
     * Classes for the component.
     */
    className?: string;
}

export interface IInputContainerInputProps
    extends Omit<IInputContainerProps, 'children'>,
        InputHTMLAttributes<HTMLInputElement> {
    /**
     * Classes for the input element.
     */
    inputClassName?: string;
}
