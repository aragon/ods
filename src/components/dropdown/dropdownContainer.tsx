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
     * Label of the dropdown trigger.
     */
    label: string;
}

export const DropdownContainer: React.FC<IDropdownContainerProps> = (props) => {
    const { children, size = 'lg', label, defaultOpen, open, onOpenChange, ...otherProps } = props;

    const [isOpen, setIsOpen] = useState(open ?? defaultOpen);

    const handleOpenChange = (open: boolean) => {
        setIsOpen(open);
        onOpenChange?.(open);
    };

    return (
        <RadixDropdown.Root open={open} defaultOpen={defaultOpen} onOpenChange={handleOpenChange} {...otherProps}>
            <RadixDropdown.Trigger className="group" asChild={true}>
                <Button
                    className="group-[state=open]:hidden"
                    variant="tertiary"
                    size={size}
                    iconRight={isOpen ? IconType.CHEVRON_UP : IconType.CHEVRON_DOWN}
                >
                    {label}
                </Button>
            </RadixDropdown.Trigger>
            <RadixDropdown.Portal>
                <RadixDropdown.Content>{children}</RadixDropdown.Content>
            </RadixDropdown.Portal>
        </RadixDropdown.Root>
    );
};
