import { TabsList as RadixTabsList, type TabsListProps as RadixTabsListProps } from '@radix-ui/react-tabs';

export interface ITabsListProps extends RadixTabsListProps {}

export const TabsList: React.FC<ITabsListProps> = (props) => {
    const { children, ...otherProps } = props;
    return <RadixTabsList {...otherProps}>{children}</RadixTabsList>;
};
