import classNames from 'classnames';
import type { ButtonHTMLAttributes } from 'react';
import { Icon, type IconType } from '../icon';
import type { IconSize } from '../icon/icon';
import { Spinner } from '../spinner';
import type { SpinnerSize, SpinnerVariant } from '../spinner/spinner';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'critical';
export type ButtonSize = 'lg' | 'md' | 'sm';

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
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
    state?: 'disabled' | 'loading';
    /**
     * Icon displayed on the right side of the button.
     */
    iconRight?: IconType;
    /**
     * Icon displayed on the left side of the button.
     */
    iconLeft?: IconType;
}

const variantToClassNames: Record<ButtonVariant, string[]> = {
    primary: [
        'bg-primary-400 text-neutral-0 border-primary-400', // Default
        'hover:bg-primary-500 hover:border-primary-500', // Hover
        'active:bg-primary-800 active:border-primary-800', // Active
        'disabled:bg-primary-100 disabled:text-primary-300 disabled:border-primary-100', // Disabled
    ],
    secondary: [
        'bg-neutral-0 text-primary-400 border-neutral-100', // Default
        'hover:border-neutral-200', // Hover
        'hover:border-primary-400', // Active
        'disabled:bg-neutral-100 disabled:text-neutral-300 disabled:border-neutral-100', // Disabled
    ],
    tertiary: [
        'bg-neutral-0 text-neutral-600 border-neutral-100', // Default
        'hover:border-neutral-200', // Hover
        'hover:border-neutral-300', // Active
        'disabled:bg-neutral-100 disabled:text-neutral-300 disabled:border-neutral-100', // Disabled
    ],
    success: [
        'bg-success-100 text-success-800 border-success-300', // Default
        'hover:border-success-400', // Hover
        'hover:border-success-500', // Active
        'disabled:bg-success-100 disabled:text-success-400 disabled:border-success-200', // Disabled
    ],
    warning: [
        'bg-warning-100 text-warning-800 border-warning-300', // Default
        'hover:border-warning-400', // Hover
        'hover:border-warning-500', // Active
        'disabled:bg-warning-100 disabled:text-warning-400 disabled:border-warning-200', // Disabled
    ],
    critical: [
        'bg-critical-100 text-critical-800 border-critical-300', // Defalt
        'hover:border-critical-400', // Hover
        'hover:border-critical-500', // Active
        'disabled:bg-critical-100 disabled:text-critical-400 disabled:border-critical-200', // Disabled
    ],
};

const variantToSpinnerVariant: Record<ButtonVariant, SpinnerVariant> = {
    primary: 'primary',
    secondary: 'neutral',
    tertiary: 'neutral',
    success: 'success',
    warning: 'warning',
    critical: 'critical',
};

const sizeToClassNames: Record<ButtonSize, string> = {
    lg: 'h-[48px] rounded-xl px-4 gap-2',
    md: 'h-[40px] rounded-xl px-3 gap-2',
    sm: 'h-[32px] rounded-lg px-2 gap-1.5',
};

const sizeToIconSize: Record<ButtonSize, IconSize> = {
    lg: 'md',
    md: 'md',
    sm: 'sm',
};

const sizeToSpinnerSize: Record<ButtonSize, SpinnerSize> = {
    lg: 'md',
    md: 'md',
    sm: 'sm',
};

export const Button: React.FC<IButtonProps> = (props) => {
    const { variant, size, iconRight, iconLeft, className, children, state, ...otherProps } = props;

    const commonClasses = 'flex flex-row border items-center focus:outline';
    const variantClasses = variantToClassNames[variant].join(' ');
    const classes = classNames(commonClasses, variantClasses, sizeToClassNames[size], className, {
        'hover:shadow-md': state !== 'disabled' && state != 'loading',
        'cursor-progress': state === 'loading',
    });

    return (
        <button className={classes} disabled={state === 'disabled'} {...otherProps}>
            {iconLeft && <Icon icon={iconLeft} size={sizeToIconSize[size]} />}
            {state === 'loading' && (
                <Spinner size={sizeToSpinnerSize[size]} variant={variantToSpinnerVariant[variant]} />
            )}
            {children}
            {iconRight && <Icon icon={iconRight} size={sizeToIconSize[size]} />}
        </button>
    );
};
