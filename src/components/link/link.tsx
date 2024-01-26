import classNames from 'classnames';
import React from 'react';
import { Icon } from '../icon';
import type { ILinkProps, LinkVariant } from './link.api';

export const variantToLabelClassNames: Record<LinkVariant, string[]> = {
    primary: [
        'text-primary-400 cursor-pointer', // Default
        'hover:text-primary-600', // Hover state
        'active:text-primary-800', // Active state
    ],
    neutral: [
        'text-neutral-500 cursor-pointer', // Default
        'hover:text-neutral-800', // Hover state
        'active:text-neutral-800', // Active state
    ],
};

const disabledStyle = 'truncate text-neutral-300 cursor-not-allowed';

export const Link = React.forwardRef<HTMLAnchorElement, ILinkProps>(
    (
        {
            children,
            disabled = false,
            variant = 'primary',
            description,
            href,
            iconRight,
            onClick,
            className,
            target,
            ...props
        },
        ref,
    ) => {
        const linkClassName = classNames(
            'inline-flex max-w-fit flex-col gap-y-0.5 truncate rounded text-sm leading-tight focus:outline-none focus-visible:ring focus-visible:ring-primary focus-visible:ring-offset md:gap-y-1 md:text-base',
            className,
            disabled ? disabledStyle : variantToLabelClassNames[variant],
        );
        const descriptionClassName = classNames('truncate', disabled ? disabledStyle : 'text-neutral-500');
        const linkRel = target === '_blank' ? 'noopener noreferrer' : '';

        return (
            <a
                ref={ref}
                onClick={!disabled ? onClick : undefined}
                href={disabled ? undefined : href}
                className={linkClassName}
                {...(disabled && { tabIndex: -1, 'aria-disabled': 'true' })}
                target={target}
                rel={linkRel}
                aria-label={children}
                {...props}
            >
                <div className="flex items-center gap-x-2 truncate">
                    {children}
                    {iconRight && <Icon icon={iconRight} size="sm" />}
                </div>
                {description && <p className={descriptionClassName}>{description}</p>}
            </a>
        );
    },
);

Link.displayName = 'Link';
