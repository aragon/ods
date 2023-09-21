import classNames from 'classnames';
import type { ButtonHTMLAttributes, MouseEvent } from 'react';
import { Icon, type IconSize } from '../icon';
import { Spinner } from '../spinner';
import type { SpinnerSize, SpinnerVariant } from '../spinner/spinner';
import type { ButtonSize, ButtonVariant, IButtonProps } from './button.api';

// Using aria-disabled: instead of disabled: modifier in order to make the modifier work for buttons and links
const variantToClassNames: Record<ButtonVariant, string[]> = {
    primary: [
        'bg-primary-400 text-neutral-0 border-primary-400', // Default
        'hover:bg-primary-500 hover:border-primary-500 hover:shadow-primary-md', // Hover
        'active:bg-primary-800 active:border-primary-800', // Active
        'focus-visible:ring-primary', // Focus
        'aria-disabled:bg-primary-100 aria-disabled:text-primary-300 aria-disabled:border-primary-100', // Disabled
    ],
    secondary: [
        'bg-neutral-0 text-primary-400 border-neutral-100', // Default
        'hover:border-neutral-200 hover:shadow-neutral-md', // Hover
        'active:border-primary-400', // Active
        'focus-visible:ring-primary', // Focus
        'aria-disabled:bg-neutral-100 aria-disabled:text-neutral-300 aria-disabled:border-neutral-100', // Disabled
    ],
    tertiary: [
        'bg-neutral-0 text-neutral-600 border-neutral-100', // Default
        'hover:border-neutral-200 hover:shadow-neutral-md', // Hover
        'active:border-neutral-300', // Active
        'focus-visible:ring-primary', // Focus
        'aria-disabled:bg-neutral-100 aria-disabled:text-neutral-300 aria-disabled:border-neutral-100', // Disabled
    ],
    success: [
        'bg-success-100 text-success-800 border-success-300', // Default
        'hover:border-success-400 hover:shadow-success-md', // Hover
        'active:border-success-500', // Active
        'focus-visible:ring-success', // Focus
        'aria-disabled:bg-success-100 aria-disabled:text-success-400 aria-disabled:border-success-200', // Disabled
    ],
    warning: [
        'bg-warning-100 text-warning-800 border-warning-300', // Default
        'hover:border-warning-400 hover:shadow-warning-md', // Hover
        'active:border-warning-500', // Active
        'focus-visible:ring-warning', // Focus
        'aria-disabled:bg-warning-100 aria-disabled:text-warning-400 aria-disabled:border-warning-200', // Disabled
    ],
    critical: [
        'bg-critical-100 text-critical-800 border-critical-300', // Defalt
        'hover:border-critical-400 hover:shadow-critical-md', // Hover
        'active:border-critical-500', // Active
        'focus-visible:ring-critical', // Focus
        'aria-disabled:bg-critical-100 aria-disabled:text-critical-400 aria-disabled:border-critical-200', // Disabled
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
        'focus:outline-none focus-visible:ring focus-visible:ring-offset aria-disabled:cursor-not-allowed', // States
    ].join(' ');

    const variantClasses = variantToClassNames[variant]
        .filter((classes) => {
            // Do not apply specific state classes when button is on a disabled or loading state. Even though this
            // might be done through the tailwind enabled: modifier, it won't work when the button is a link.
            if (state === 'disabled') {
                return !classes.includes('hover');
            } else if (state === 'loading') {
                return !classes.includes('disabled') && !classes.includes('hover') && !classes.includes('active');
            }

            return true;
        })
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

    const commonProps = { className: classes, 'aria-disabled': isDisabled };

    const buttonContent = (
        <>
            {displayIconLeft && <Icon icon={iconLeft} size={iconSize} />}
            {state === 'loading' && (
                <Spinner size={sizeToSpinnerSize[size]} variant={variantToSpinnerVariant[variant]} />
            )}
            {!isOnlyIcon && <div className="px-1">{children}</div>}
            {displayIconRight && <Icon icon={iconRight} size={iconSize} />}
        </>
    );

    const handleLinkClick =
        (onClick?: (event: MouseEvent<HTMLAnchorElement>) => void) => (event: MouseEvent<HTMLAnchorElement>) => {
            if (isDisabled) {
                event.preventDefault();
            } else {
                onClick?.(event);
            }
        };

    if ('href' in otherProps && otherProps.href !== '') {
        const { onClick, href, ...linkProps } = otherProps;

        return (
            <a href={href} onClick={handleLinkClick(onClick)} {...commonProps} {...linkProps}>
                {buttonContent}
            </a>
        );
    }

    const buttonProps = otherProps as ButtonHTMLAttributes<HTMLButtonElement>;

    return (
        <button disabled={isDisabled} {...commonProps} {...buttonProps}>
            {buttonContent}
        </button>
    );
};
