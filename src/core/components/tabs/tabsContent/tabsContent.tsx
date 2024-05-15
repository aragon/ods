import { TabsContent as RadixTabsContent, type TabsContentProps as RadixTabsContentProps } from '@radix-ui/react-tabs';

export interface ITabsContentProps extends RadixTabsContentProps {
    /**
     * Value of the Tabs.Trigger that this Tabs.Content should be associated with.
     */
    value: string;
}

export const TabsContent: React.FC<ITabsContentProps> = (props) => {
    return <RadixTabsContent {...props} />;
};
