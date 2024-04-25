import classNames from 'classnames';
import React from 'react';
import { Icon } from '../icon';
import type { ILinkProps, LinkVariant } from './link.api';

const variantToLabelClassNames: Record<LinkVariant, string[]> = {
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

const disabledStyle = 'truncate text-neutral-300';

export const Link = React.forwardRef<HTMLAnchorElement, ILinkProps>((props, ref) => {
    const {
        children,
        disabled = false,
        variant = 'primary',
        description,
        href,
        iconRight,
        onClick,
        className,
        target,
        rel,
        ...otherProps
    } = props;

    const linkClassName = classNames(
        'inline-flex max-w-fit flex-col gap-y-0.5 truncate rounded text-sm leading-tight',
        'focus:outline-none focus-visible:ring focus-visible:ring-primary focus-visible:ring-offset',
        'md:gap-y-1 md:text-base',
        disabled ? disabledStyle : variantToLabelClassNames[variant],
        className,
    );

    const descriptionClassName = classNames('truncate', disabled ? disabledStyle : 'text-neutral-500');
    const linkRel = target === '_blank' ? `noopener noreferrer ${rel}` : rel;

    return (
        <a
            ref={ref}
            onClick={!disabled ? onClick : undefined}
            href={!disabled ? href : undefined}
            className={linkClassName}
            target={target}
            rel={linkRel}
            {...(disabled && { tabIndex: -1, 'aria-disabled': 'true' })}
            {...otherProps}
        >
            <div className="flex items-center gap-x-2">
                <span className="truncate">{children}</span>
                {iconRight && <Icon icon={iconRight} size="sm" />}
            </div>
            {description && <p className={descriptionClassName}>{description}</p>}
        </a>
    );
});

Link.displayName = 'Link';
