import * as RadixDropdown from '@radix-ui/react-dropdown-menu';
import classNames from 'classnames';

export interface IDropdownItemProps extends RadixDropdown.DropdownMenuItemProps {
    /**
     * Renders the dropdown item as active when set to true.
     */
    active?: boolean;
}

export const DropdownItem: React.FC<IDropdownItemProps> = (props) => {
    const { className, ...otherProps } = props;

    return (
        <RadixDropdown.Item
            className={classNames(
                'rounded-xl px-4 py-3 text-base leading-tight text-neutral-500 hover:bg-neutral-50',
                className,
            )}
            {...otherProps}
        />
    );
};
