import classNames from 'classnames';
import React from 'react';
import IconRightSVG from './iconRightSVG';

const variantToClassNames: Record<LinkType, string[]> = {
    primary: [
        'text-primary-400 hover:text-primary-600 active:text-primary-800 focus-visible:ring focus-visible:ring-primary-200',
    ],
    neutral: [
        'text-neutral-600 hover:text-neutral-800 active:text-neutral-800 focus-visible:ring focus-visible:ring-primary-200',
    ],
    inverted: ['text-white hover:text-gray-100 active:text-gray-200 focus-visible:ring focus-visible:ring-primary-200'],
};

export type IconProps = React.SVGProps<SVGSVGElement> & {
    height?: number;
    width?: number;
};

export type IconType = React.FunctionComponent<IconProps>;

export type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    disabled?: boolean;
    external?: boolean;
    label: string;
    description?: string;
    type?: LinkType;
};

export const LINK_VARIANTS = ['primary', 'neutral', 'inverted'] as const;
export type LinkType = (typeof LINK_VARIANTS)[number];

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
    ({ disabled = false, external = true, type = 'primary', description, label, href, ...props }, ref) => {
        const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
            if (disabled) {
                e.preventDefault();
            }
        };

        const className = classNames(
            'inline-flex max-w-full cursor-pointer flex-col gap-y-1 rounded',
            disabled ? disabledStyle : variantToClassNames[type],
        );

        return (
            <a
                ref={ref}
                onClick={handleClick}
                href={disabled ? undefined : href}
                rel="noopener noreferrer"
                className={className}
                {...(external && { target: '_blank' })}
                {...props}
                data-testid="link"
            >
                <div className="flex items-center gap-x-2">
                    <span className="truncate font-semibold">{label}</span>
                    {external && <IconRightSVG />}
                </div>
                {description && <p className="truncate text-sm text-neutral-600">{description}</p>}
            </a>
        );
    },
);

Link.displayName = 'Link';

const disabledStyle = 'text-neutral-300 cursor-not-allowed';
