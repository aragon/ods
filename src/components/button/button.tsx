import classNames from 'classnames';
import type { ButtonHTMLAttributes, MouseEvent } from 'react';
import type { Breakpoint, ResponsiveAttribute, ResponsiveAttributeClassMap } from '../../types';
import { responsiveUtils } from '../../utils';
import { Icon, type IconSize } from '../icon';
import { Spinner } from '../spinner';
import type { SpinnerSize, SpinnerVariant } from '../spinner/spinner';
import type { ButtonContext, ButtonSize, ButtonVariant, IButtonProps } from './button.api';

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

const responsiveSizeClassNames: ResponsiveAttributeClassMap<ButtonSize> = {
    sm: {
        sm: 'h-[32px] text-sm rounded-lg gap-0.5',
        md: 'md:h-[32px] md:text-sm md:rounded-lg md:gap-0.5',
        lg: 'lg:h-[32px] lg:text-sm lg:rounded-lg lg:gap-0.5',
        xl: 'xl:h-[32px] xl:text-sm xl:rounded-lg xl:gap-0.5',
        '2xl': '2xl:h-[32px] 2xl:text-sm 2xl:rounded-lg 2xl:gap-0.5',
    },
    md: {
        sm: 'h-[40px] text-base rounded-xl gap-1',
        md: 'md:h-[40px] md:text-base md:rounded-xl md:gap-1',
        lg: 'lg:h-[40px] lg:text-base lg:rounded-xl lg:gap-1',
        xl: 'xl:h-[40px] xl:text-base xl:rounded-xl xl:gap-1',
        '2xl': '2xl:h-[40px] 2xl:text-base 2xl:rounded-xl 2xl:gap-1',
    },
    lg: {
        sm: 'h-[48px] text-base rounded-xl gap-1',
        md: 'md:h-[48px] md:text-base md:rounded-xl md:gap-1',
        lg: 'lg:h-[48px] lg:text-base lg:rounded-xl lg:gap-1',
        xl: 'xl:h-[48px] xl:text-base xl:rounded-xl xl:gap-1',
        '2xl': '2xl:h-[48px] 2xl:text-base 2xl:rounded-xl 2xl:gap-1',
    },
};

const responsiveDefaultContextClassNames: ResponsiveAttributeClassMap<ButtonSize> = {
    sm: {
        sm: 'min-w-[80px] px-2',
        md: 'md:min-w-[80px] md:px-2',
        lg: 'lg:min-w-[80px] lg:px-2',
        xl: 'xl:min-w-[80px] xl:px-2',
        '2xl': '2xl:min-w-[80px] 2xl:px-2',
    },
    md: {
        sm: 'min-w-[96px] px-3',
        md: 'md:min-w-[96px] md:px-3',
        lg: 'lg:min-w-[96px] lg:px-3',
        xl: 'xl:min-w-[96px] xl:px-3',
        '2xl': '2xl:min-w-[96px] 2xl:px-3',
    },
    lg: {
        sm: 'min-w-[112px] px-4',
        md: 'md:min-w-[112px] md:px-4',
        lg: 'lg:min-w-[112px] lg:px-4',
        xl: 'xl:min-w-[112px] xl:px-4',
        '2xl': '2xl:min-w-[112px] 2xl:px-4',
    },
};

const responsiveOnlyIconContextClassNames: ResponsiveAttributeClassMap<ButtonSize> = {
    sm: {
        sm: 'w-[32px]',
        md: 'md:w-[32px]',
        lg: 'lg:w-[32px]',
        xl: 'xl:w-[32px]',
        '2xl': '2xl:w-[32px]',
    },
    md: {
        sm: 'w-[40px]',
        md: 'md:w-[40px]',
        lg: 'lg:w-[40px]',
        xl: 'xl:w-[40px]',
        '2xl': '2xl:w-[40px]',
    },
    lg: {
        sm: 'w-[48px]',
        md: 'md:w-[48px]',
        lg: 'lg:w-[48px]',
        xl: 'xl:w-[48px]',
        '2xl': '2xl:w-[48px]',
    },
};

const sizeToIconSize: Record<ButtonSize, Record<ButtonContext, IconSize>> = {
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
    const {
        variant,
        size,
        responsiveSize = {},
        iconRight,
        iconLeft,
        className,
        children,
        state,
        ...otherProps
    } = props;

    const isOnlyIcon = children == null || children === '';
    const isDisabled = state === 'disabled' || state === 'loading';
    const buttonContext = isOnlyIcon ? 'onlyIcon' : 'default';

    const commonClasses = [
        'flex flex-row items-center justify-center', // Layout
        'leading-tight font-semibold', // Typography
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

    const sizeClassNames = responsiveUtils.generateClassNames(size, responsiveSize, responsiveSizeClassNames);
    const contextClassNames = responsiveUtils.generateClassNames(
        size,
        responsiveSize,
        isOnlyIcon ? responsiveOnlyIconContextClassNames : responsiveDefaultContextClassNames,
    );

    const classes = classNames(commonClasses, variantClasses, sizeClassNames, contextClassNames, className, {
        'cursor-progress': state === 'loading',
    });

    const iconSize = sizeToIconSize[size][buttonContext];
    const iconResponsiveSize = Object.keys(responsiveSize ?? {}).reduce<ResponsiveAttribute<IconSize>>(
        (current, breakpoint) => ({
            ...current,
            [breakpoint]: sizeToIconSize[responsiveSize![breakpoint as Breakpoint]!][buttonContext],
        }),
        {},
    );

    const spinnerSize = sizeToSpinnerSize[size];
    const spinnerResponsiveSize = Object.keys(responsiveSize ?? {}).reduce<ResponsiveAttribute<SpinnerSize>>(
        (current, breakpoint) => ({
            ...current,
            [breakpoint]: sizeToSpinnerSize[responsiveSize![breakpoint as Breakpoint]!],
        }),
        {},
    );

    const displayIconLeft = state !== 'loading' && iconLeft != null;
    const displayIconRight = state !== 'loading' && iconRight != null && !isOnlyIcon;

    const commonProps = { className: classes, 'aria-disabled': isDisabled };

    const buttonContent = (
        <>
            {displayIconLeft && <Icon icon={iconLeft} size={iconSize} responsiveSize={iconResponsiveSize} />}
            {state === 'loading' && (
                <Spinner
                    size={spinnerSize}
                    responsiveSize={spinnerResponsiveSize}
                    variant={variantToSpinnerVariant[variant]}
                />
            )}
            {!isOnlyIcon && <div className="px-1">{children}</div>}
            {displayIconRight && <Icon icon={iconRight} size={iconSize} responsiveSize={iconResponsiveSize} />}
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
