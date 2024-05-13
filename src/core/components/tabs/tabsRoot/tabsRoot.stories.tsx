import type { Meta, StoryObj } from '@storybook/react';
import { ITabsRootProps, Tabs } from '..';
import { Card } from '../../cards';

/**
 * Accordion.Container can contain multiple Accordion.Items which comprises an Accordion.Header and its collapsible Accordion.Content.
 */
const meta: Meta<typeof Tabs.Root> = {
    title: 'Core/Components/Tabs/Tabs.Root',
    component: Tabs.Root,
    tags: ['autodocs'],
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/design/ISSDryshtEpB7SUSdNqAcw/branch/P0GeJKqILL7UXvaqu5Jj7V/Aragon-ODS?m=auto&node-id=15855%3A27684',
        },
    },
};

type Story = StoryObj<typeof Tabs.Root>;

const reusableStoryComponent = (props: ITabsRootProps) => {
    return (
        <Tabs.Root {...props}>
            <Tabs.List>
                <Tabs.Trigger value="1">Tab 1</Tabs.Trigger>
                <Tabs.Trigger value="2">Tab 2</Tabs.Trigger>
                <Tabs.Trigger value="3">Tab 3</Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="1">
                <Card className="p-4">Content 1</Card>
            </Tabs.Content>
            <Tabs.Content value="2">
                <Card className="p-4">Content 2</Card>
            </Tabs.Content>
            <Tabs.Content value="3">
                <Card className="p-4">Content 3</Card>
            </Tabs.Content>
        </Tabs.Root>
    );
};

/**
 * Default usage example of a full Accordion component.
 */
export const Default: Story = {
    args: {},
    render: (args) => reusableStoryComponent(args),
};

export default meta;
