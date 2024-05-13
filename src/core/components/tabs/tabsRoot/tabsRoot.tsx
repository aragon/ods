import { Tabs as RadixTabsRoot, type TabsProps as RadixTabsProps } from '@radix-ui/react-tabs';
import { useMemo } from 'react';
import { TabsProvider } from './tabsContext';

export interface ITabsRootProps extends Omit<RadixTabsProps, 'orientation' | 'asChild'> {
    /**
     * The value of the tab that should be selected by default.
     */
    defaultValue?: string;
    /**
     * Whether or not the Tabs.List should use an underlined style. @default false
     */
    isUnderlined?: boolean;
}

export const TabsRoot: React.FC<ITabsRootProps> = (props) => {
    const { className, children, defaultValue, isUnderlined = false, ...otherProps } = props;
    const tabsContext = useMemo(() => ({ isUnderlined }), [isUnderlined]);
    return (
        <RadixTabsRoot defaultValue={defaultValue} orientation="horizontal" className={className} {...otherProps}>
            <TabsProvider isUnderlined={tabsContext.isUnderlined}>{children}</TabsProvider>
        </RadixTabsRoot>
    );
};
