import * as RadixDropdown from '@radix-ui/react-dropdown-menu';
import classNames from 'classnames';
import { Icon, IconType } from '../icon';

export interface IDropdownItemProps extends Omit<RadixDropdown.DropdownMenuItemProps, 'asChild'> {
    /**
     * Renders the dropdown item as active when set to true.
     */
    active?: boolean;
    /**
     * Icon displayed beside the item label. Defaults to Checkmark icon when active property is set to true.
     */
    icon?: IconType;
    /**
     * Position of the icon.
     * @default right
     */
    iconPosition?: 'right' | 'left';
}

export const DropdownItem: React.FC<IDropdownItemProps> = (props) => {
    const { className, icon, active, iconPosition = 'right', children, disabled, ...otherProps } = props;

    return (
        <RadixDropdown.Item
            disabled={disabled}
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
            {children}
            {(icon != null || active) && (
                <Icon icon={icon ?? IconType.CHECKMARK} size="md" className="text-neutral-300" />
            )}
        </RadixDropdown.Item>
    );
};
