import { Tabs as RadixTabsRoot, type TabsProps as RadixTabsProps } from '@radix-ui/react-tabs';
import { createContext, useMemo } from 'react';

export interface ITabsRootProps extends Omit<RadixTabsProps, 'orientation'> {
    /**
     * The value of the tab that should be selected by default.
     */
    defaultValue?: string;
    /**
     * Whether or not the Tabs.List should use an underlined style. @default false
     */
    isUnderlined?: boolean;
}

export interface TabsContextType {
    /**
     * Whether the tabs share a common underline style implementation via the Tabs.List.
     */
    isUnderlined: boolean;
}

export const TabsContext = createContext<TabsContextType>({ isUnderlined: false });

export const TabsRoot: React.FC<ITabsRootProps> = (props) => {
    const { className, children, defaultValue, isUnderlined = false, ...otherProps } = props;
    const tabsContext = useMemo(() => ({ isUnderlined }), [isUnderlined]);

    return (
        <RadixTabsRoot defaultValue={defaultValue} orientation="horizontal" className={className} {...otherProps}>
            <TabsContext.Provider value={tabsContext}>{children}</TabsContext.Provider>
        </RadixTabsRoot>
    );
};
