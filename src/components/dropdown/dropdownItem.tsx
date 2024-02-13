import * as RadixDropdown from '@radix-ui/react-dropdown-menu';
import classNames from 'classnames';
import React from 'react';
import { Icon, IconType } from '../icon';

export interface IDropdownItemProps extends Omit<RadixDropdown.DropdownMenuItemProps, 'asChild'> {
    /**
     * Renders the dropdown item as active when set to true.
     */
    active?: boolean;
    /**
     * Icon displayed beside the item label. Defaults to LinkExternal when the item is a link or to Checkmark when the
     * active property is set to true.
     */
    icon?: IconType;
    /**
     * Position of the icon.
     * @default right
     */
    iconPosition?: 'right' | 'left';
    /**
     * Link of the dropdown item.
     */
    href?: string;
    /**
     * Target of the dropdown link.
     */
    target?: string;
    /**
     * Rel attribute of the dropdown link.
     */
    rel?: string;
}

export const DropdownItem: React.FC<IDropdownItemProps> = (props) => {
    const {
        className,
        icon,
        active,
        iconPosition = 'right',
        children,
        disabled,
        href,
        target,
        rel,
        ...otherProps
    } = props;

    const renderLink = href != null && href.length > 0;
    const linkRel = target === '_blank' ? `noopener noreferrer ${rel ?? ''}` : rel;

    const ItemWrapper = renderLink ? 'a' : React.Fragment;
    const itemWrapperProps = renderLink ? { href, target, rel: linkRel } : {};

    const defaultIcon = renderLink ? IconType.LINK_EXTERNAL : active ? IconType.CHECKMARK : undefined;
    const processedIcon = icon ?? defaultIcon;

    return (
        <RadixDropdown.Item
            disabled={disabled}
            asChild={renderLink}
            className={classNames(
                'flex items-center justify-between px-4 py-3', // Layout
                'cursor-pointer rounded-xl text-base leading-tight focus-visible:outline-none', // Style
                'data-[disabled]:cursor-default data-[disabled]:bg-neutral-0 data-[disabled]:text-neutral-300', // Disabled
                { 'bg-neutral-0 text-neutral-500': !active && !disabled }, // Inactive
                { 'bg-neutral-50 text-neutral-800': active && !disabled }, // Active
                { 'hover:bg-neutral-50 hover:text-neutral-800': !disabled }, // Hover
                { 'data-[highlighted]:bg-neutral-50 data-[highlighted]:text-neutral-800': !disabled }, // Highlighted
                { 'flex-row': iconPosition === 'right' },
                { 'flex-row-reverse': iconPosition === 'left' && icon != null },
                className,
            )}
            {...otherProps}
        >
            <ItemWrapper {...itemWrapperProps}>
                {children}
                {processedIcon != null && <Icon icon={processedIcon} size="md" className="text-neutral-300" />}
            </ItemWrapper>
        </RadixDropdown.Item>
    );
};
