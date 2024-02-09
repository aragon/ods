import * as RadixDropdown from '@radix-ui/react-dropdown-menu';

export interface IDropdownItemProps {}

export const DropdownItem: React.FC<IDropdownItemProps> = () => {
    return (
        <RadixDropdown.Item>
            New Tab <div>⌘+T</div>
        </RadixDropdown.Item>
    );
};
