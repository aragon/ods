import classNames from 'classnames';
import React from 'react';
import { iconList } from '../icon/iconList';
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
            disabled = false,
            external = true,
            variant = 'primary',
            iconHeight = 12,
            description,
            label,
            href,
            iconRight,
            onClick,
            ...props
        },
        ref,
    ) => {
        // disabling eslint rule to throw in custom class for focus ring test on tab selection
        // eslint-disable-next-line tailwindcss/no-custom-classname
        const linkClassName = classNames(
            'inline-flex max-w-fit flex-col gap-y-1 truncate rounded text-sm focus:outline-none focus-visible:ring focus-visible:ring-primary focus-visible:ring-offset md:text-base',
            disabled ? disabledStyle : variantToLabelClassNames[variant],
            'test-focus',
        );
        const IconComponent = iconRight ? iconList[iconRight] : null;
        const iconSize: React.CSSProperties = { height: iconHeight ? `${iconHeight}px` : 'auto', width: 'auto' };
        const descriptionClassName = classNames('truncate', disabled ? disabledStyle : 'text-neutral-500');

        return (
            <a
                ref={ref}
                onClick={!disabled ? onClick : undefined}
                href={disabled ? undefined : href}
                className={linkClassName}
                {...(disabled && { tabIndex: -1, 'aria-disabled': 'true' })}
                {...(external && !disabled && { target: '_blank', rel: 'noopener noreferrer' })}
                {...props}
                data-testid="link"
            >
                <div className="flex items-center gap-x-2 truncate">
                    {label}
                    {IconComponent && <IconComponent style={iconSize} />}
                </div>
                {description && <p className={descriptionClassName}>{description}</p>}
            </a>
        );
    },
);

Link.displayName = 'Link';
