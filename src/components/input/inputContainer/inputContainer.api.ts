import type { InputHTMLAttributes, ReactNode } from 'react';
import type { AlertVariant } from '../../alerts/utils';

export type InputVariant = 'default' | 'warning' | 'critical';

export interface IInputContainerAlert {
    /**
     * Message to be displayed.
     */
    message: string;
    /**
     * Variant of the alert.
     */
    variant: Exclude<AlertVariant, 'info' | 'success'>;
}

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
     * Alert displayed below the input.
     */
    alert?: IInputContainerAlert;
    /**
     * Id of the input field.
     */
    id: string;
    /**
     * Children of the component.
     */
    children?: ReactNode;
    /**
     * Classes for the component.
     */
    className?: string;
}

export interface IInputComponentProps
    extends Omit<IInputContainerProps, 'children' | 'id'>,
        Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
    /**
     * Classes for the input element.
     */
    inputClassName?: string;
}
