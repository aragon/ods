import { TabsTrigger as RadixTabsTrigger, type TabsTriggerProps as RadixTabsTriggerProps } from '@radix-ui/react-tabs';
import classNames from 'classnames';
import { useContext } from 'react';
import { Icon, type IconType } from '../../icon';
import { TabsContext } from '../tabsRoot/tabsRoot';
export interface ITabsTriggerProps extends RadixTabsTriggerProps {
    /**
     * The label of the tab.
     */
    label: string;
    /**
     * Value of the tab is meant to pair with the Tabs.Content value prop.
     */
    value: string;
    /**
     * The icon to display on the right side of the tab label.
     */
    iconRight?: IconType;
}

export const TabsTrigger: React.FC<ITabsTriggerProps> = (props) => {
    const { label, iconRight, className, ...otherProps } = props;
    const { isUnderlined } = useContext(TabsContext);

    const triggerClassNames = classNames(
        'group flex cursor-pointer items-center gap-x-4 border-primary-400 py-3 text-base font-normal leading-tight text-neutral-500', // base
        'hover:text-neutral-600', // hover
        'active:data-[state=active]:text-neutral-800 active:data-[state=active]:shadow-[inset_0_0_0_0,0_1px_0_0] active:data-[state=active]:shadow-primary-400', // active click
        'focus:outline-none focus-visible:ring focus-visible:ring-primary focus-visible:ring-offset', // focus
        { 'hover:shadow-[inset_0_0_0_0,0_1px_0_0] hover:shadow-neutral-800': isUnderlined }, //  isUnderlined variant
        'data-[state=active]:text-neutral-800 data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-primary-400', // active selection
        className,
    );

    const iconClassNames = classNames(
        'text-neutral-300',
        'group-hover:text-neutral-300',
        'group-active:text-neutral-600',
        'group-focus:text-neutral-500',
    );

    return (
        <RadixTabsTrigger className={triggerClassNames} {...otherProps}>
            {label}
            {iconRight && <Icon icon={iconRight} size="sm" className={iconClassNames} />}
        </RadixTabsTrigger>
    );
};
