import { TabsContent as RadixTabsContent } from '@radix-ui/react-tabs';
import { type ComponentProps } from 'react';

export interface ITabsContentProps extends ComponentProps<'div'> {
    /**
     * Value linking Tabs.Content to its corresponding Tabs.Trigger
     */
    value: string;
}

/**
 * `TabsContent` component
 *
 * This component is based on the Radix-UI tabs content implementation.
 * An exhaustive list of its properties can be found in the corresponding Radix primitive
 * [documentation](https://www.radix-ui.com/primitives/docs/components/tabs#content).
 */
export const TabsContent: React.FC<ITabsContentProps> = (props) => {
    const { value, ...rest } = props;
    return <RadixTabsContent value={value} {...rest} />;
};
