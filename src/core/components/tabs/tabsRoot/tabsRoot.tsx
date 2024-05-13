import { Tabs as RadixTabsRoot, type TabsProps as RadixTabsProps } from '@radix-ui/react-tabs';

export interface ITabsRootProps extends Omit<RadixTabsProps, 'orientation'> {
    /**
     * The value of the tab that should be selected by default.
     */
    defaultValue?: string;
}

export const TabsRoot: React.FC<ITabsRootProps> = (props) => {
    const { className, children, defaultValue, ...otherProps } = props;
    return (
        <RadixTabsRoot defaultValue={defaultValue} orientation="horizontal" className={className} {...otherProps}>
            {children}
        </RadixTabsRoot>
    );
};
