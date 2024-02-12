import * as RadixDropdown from '@radix-ui/react-dropdown-menu';
import { useState } from 'react';
import { Button, type IButtonProps } from '../button';
import { IconType } from '../icon';

export interface IDropdownContainerProps extends RadixDropdown.DropdownMenuProps {
    /**
     * Size of the dropdown trigger.
     * @default lg
     */
    size?: IButtonProps['size'];
    /**
     * Size of the dropdown trigger depending on the current breakpoint.
     */
    responsiveSize?: IButtonProps['responsiveSize'];
    /**
     * Label of the dropdown trigger.
     */
    label?: string;
    /**
     * Hides the dropdown trigger icon when set to true. This property has no effect when the label property
     * is not set or is empty.
     */
    hideIcon?: boolean;
    /**
     * Disabled the dropdown when set to true.
     */
    disabled?: boolean;
}

export const DropdownContainer: React.FC<IDropdownContainerProps> = (props) => {
    const {
        children,
        size = 'lg',
        responsiveSize,
        label,
        defaultOpen,
        hideIcon,
        open,
        onOpenChange,
        disabled,
        ...otherProps
    } = props;

    const [isOpen, setIsOpen] = useState(open ?? defaultOpen);

    const handleOpenChange = (open: boolean) => {
        setIsOpen(open);
        onOpenChange?.(open);
    };

    const triggerIcon = isOpen ? IconType.CHEVRON_UP : IconType.CHEVRON_DOWN;
    const hasLabel = label != null && label.length > 0;

    return (
        <RadixDropdown.Root open={open} defaultOpen={defaultOpen} onOpenChange={handleOpenChange} {...otherProps}>
            <RadixDropdown.Trigger className="group" asChild={true} disabled={disabled}>
                <Button
                    variant="tertiary"
                    size={size}
                    responsiveSize={responsiveSize}
                    iconLeft={!hasLabel ? triggerIcon : undefined}
                    iconRight={hideIcon ? undefined : triggerIcon}
                    state={disabled ? 'disabled' : undefined}
                    className={isOpen ? 'border-neutral-300' : undefined}
                >
                    {label}
                </Button>
            </RadixDropdown.Trigger>
            <RadixDropdown.Portal>
                <RadixDropdown.Content
                    className="flex min-w-60 flex-col gap-1.5 rounded-xl border border-neutral-100 bg-neutral-0 p-2 shadow-neutral-sm"
                    align="start"
                    sideOffset={hasLabel ? 0 : 4}
                >
                    {children}
                </RadixDropdown.Content>
            </RadixDropdown.Portal>
        </RadixDropdown.Root>
    );
};
