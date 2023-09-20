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
        'enabled:hover:bg-primary-500 enabled:hover:border-primary-500 enabled:hover:shadow-primary-md', // Hover
        'enabled:active:bg-primary-800 enabled:active:border-primary-800', // Active
        'disabled:bg-primary-100 disabled:text-primary-300 disabled:border-primary-100', // Disabled
    ],
    secondary: [
        'bg-neutral-0 text-primary-400 border-neutral-100', // Default
        'enabled:hover:border-neutral-200 enabled:hover:shadow-neutral-md', // Hover
        'enabled:active:border-primary-400', // Active
        'disabled:bg-neutral-100 disabled:text-neutral-300 disabled:border-neutral-100', // Disabled
    ],
    tertiary: [
        'bg-neutral-0 text-neutral-600 border-neutral-100', // Default
        'enabled:hover:border-neutral-200 enabled:hover:shadow-neutral-md', // Hover
        'enabled:active:border-neutral-300', // Active
        'disabled:bg-neutral-100 disabled:text-neutral-300 disabled:border-neutral-100', // Disabled
    ],
    success: [
        'bg-success-100 text-success-800 border-success-300', // Default
        'enabled:hover:border-success-400 enabled:hover:shadow-success-md', // Hover
        'enabled:active:border-success-500', // Active
        'disabled:bg-success-100 disabled:text-success-400 disabled:border-success-200', // Disabled
    ],
    warning: [
        'bg-warning-100 text-warning-800 border-warning-300', // Default
        'enabled:hover:border-warning-400 enabled:hover:shadow-warning-md', // Hover
        'enabled:active:border-warning-500', // Active
        'disabled:bg-warning-100 disabled:text-warning-400 disabled:border-warning-200', // Disabled
    ],
    critical: [
        'bg-critical-100 text-critical-800 border-critical-300', // Defalt
        'enabled:hover:border-critical-400 enabled:hover:shadow-critical-md', // Hover
        'enabled:active:border-critical-500', // Active
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

const sizeToClassNames: Record<ButtonSize, Record<'onlyIcon' | 'default' | 'common', string>> = {
    lg: {
        common: 'h-[48px] text-base rounded-xl gap-1',
        default: 'min-w-[112px] px-4',
        onlyIcon: 'w-[48px]',
    },
    md: {
        common: 'h-[40px] text-base rounded-xl gap-1',
        default: 'min-w-[96px] px-3',
        onlyIcon: 'w-[40px]',
    },
    sm: {
        common: 'h-[32px] text-sm rounded-lg gap-0.5',
        default: 'min-w-[80px] px-2',
        onlyIcon: 'w-[32px]',
    },
};

const sizeToIconSize: Record<ButtonSize, Record<'onlyIcon' | 'default', IconSize>> = {
    lg: {
        default: 'md',
        onlyIcon: 'lg',
    },
    md: {
        default: 'md',
        onlyIcon: 'md',
    },
    sm: {
        default: 'sm',
        onlyIcon: 'sm',
    },
};

const sizeToSpinnerSize: Record<ButtonSize, SpinnerSize> = {
    lg: 'md',
    md: 'md',
    sm: 'sm',
};

export const Button: React.FC<IButtonProps> = (props) => {
    const { variant, size, iconRight, iconLeft, className, children, state, ...otherProps } = props;

    const isOnlyIcon = children == null || children === '';
    const isDisabled = state === 'disabled' || state === 'loading';

    const commonClasses = [
        'flex flex-row items-center justify-center', // Layout
        'leading-tight font-semibold font-default', // Typography
        'border cursor:pointer', // Commons
        'focus:outline disabled:cursor-not-allowed', // States
    ].join(' ');

    // Filter out `disabled:` classes to avoid applying disabled styles when button is loading
    const variantClasses = variantToClassNames[variant]
        .filter((classes) => state !== 'loading' || !classes.includes('disabled'))
        .join(' ');

    const sizeClasses = sizeToClassNames[size];

    const classes = classNames(
        commonClasses,
        variantClasses,
        sizeClasses.common,
        className,
        { [sizeClasses.default]: !isOnlyIcon },
        { [sizeClasses.onlyIcon]: isOnlyIcon },
        { 'cursor-progress': state === 'loading' },
    );

    const iconSize = sizeToIconSize[size][isOnlyIcon ? 'onlyIcon' : 'default'];
    const displayIconLeft = state !== 'loading' && iconLeft != null;
    const displayIconRight = state !== 'loading' && iconRight != null && !isOnlyIcon;

    return (
        <button className={classes} disabled={isDisabled} {...otherProps}>
            {displayIconLeft && <Icon icon={iconLeft} size={iconSize} />}
            {state === 'loading' && (
                <Spinner size={sizeToSpinnerSize[size]} variant={variantToSpinnerVariant[variant]} />
            )}
            {!isOnlyIcon && <div className="px-1">{children}</div>}
            {displayIconRight && <Icon icon={iconRight} size={iconSize} />}
        </button>
    );
};
