import { TabsContent as RadixTabsContent, type TabsContentProps as RadixTabsContentProps } from '@radix-ui/react-tabs';

export interface ITabsContentProps extends RadixTabsContentProps {}

export const TabsContent: React.FC<ITabsContentProps> = (props) => {
    return <RadixTabsContent {...props} />;
};
