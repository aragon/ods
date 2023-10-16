import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';
import type { IconType } from '../icon';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'critical';
export type ButtonSize = 'lg' | 'md' | 'sm';
export type ButtonState = 'disabled' | 'loading';

export interface IButtonBaseProps {
    /**
     * Variant of the button.
     */
    variant: ButtonVariant;
    /**
     * Size of the button.
     */
    size: ButtonSize;
    /**
     * State of the button.
     */
    state?: ButtonState;
    /**
     * Icon displayed on the right side of the button.
     */
    iconRight?: IconType;
    /**
     * Icon displayed on the left side of the button.
     */
    iconLeft?: IconType;
}

export type IButtonProps = IButtonBaseProps &
    (ButtonHTMLAttributes<HTMLButtonElement> | AnchorHTMLAttributes<HTMLAnchorElement>);
