import { TabsTrigger as RadixTabsTrigger, type TabsTriggerProps as RadixTabsTriggerProps } from '@radix-ui/react-tabs';
export interface ITabsTriggerProps extends RadixTabsTriggerProps {}

export const TabsTrigger: React.FC<ITabsTriggerProps> = (props) => {
    const { children, ...otherProps } = props;
    return <RadixTabsTrigger {...otherProps}>{children}</RadixTabsTrigger>;
};
