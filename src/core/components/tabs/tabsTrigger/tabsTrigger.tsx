import { TabsTrigger as RadixTabsTrigger } from '@radix-ui/react-tabs';
import classNames from 'classnames';
import { useContext, type ComponentProps } from 'react';
import { Icon, type IconType } from '../../icon';
import { TabsContext } from '../tabsRoot/tabsRoot';

export interface ITabsTriggerProps extends ComponentProps<'button'> {
    /**
     * The label of the tab.
     */
    label: string;
    /**
     * Value linking Tabs.Trigger to its corresponding Tabs.Content
     */
    value: string;
    /**
     * The icon to display on the right side of the tab label.
     */
    iconRight?: IconType;
}

export const TabsTrigger: React.FC<ITabsTriggerProps> = (props) => {
    const { label, iconRight, className, value, ...otherProps } = props;
    const { isUnderlined } = useContext(TabsContext);

    const triggerClassNames = classNames(
        'group line-clamp-1 flex cursor-pointer items-center gap-x-4 rounded-t border-primary-400 py-3 text-base font-normal leading-tight text-neutral-500', // base
        'hover:text-neutral-800', // hover
        'active:data-[state=active]:text-neutral-800 active:data-[state=active]:shadow-[inset_0_0_0_0,0_1px_0_0] active:data-[state=active]:shadow-primary-400', // active click
        'focus:outline-none', // focus -- might need style updates pending conversation
        { 'hover:shadow-[inset_0_0_0_0,0_1px_0_0] hover:shadow-neutral-800': isUnderlined }, //  isUnderlined variant
        'data-[state=active]:text-neutral-800 data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-primary-400', // active selection
        className,
    );

    const iconClassNames = classNames(
        'group-data-[state=active]:text-neutral-800',
        'text-neutral-500',
        'group-hover:text-neutral-300',
        'group-active:text-neutral-600',
        'group-focus:text-neutral-500',
    );

    return (
        <RadixTabsTrigger className={triggerClassNames} value={value} {...otherProps}>
            {label}
            {iconRight && <Icon icon={iconRight} size="sm" className={iconClassNames} />}
        </RadixTabsTrigger>
    );
};
