import type { Meta, StoryObj } from '@storybook/react';
import { Tabs, type ITabsTriggerProps } from '..';

/**
 * Tabs.Root can contain multiple Tabs.Triggers inside it's requisite Tabs.List. These tabs will coordinate with what Tabs.Content to show by matching their value prop.
 */
const meta: Meta<typeof Tabs.Trigger> = {
    title: 'Core/Components/Tabs/Tabs.Trigger',
    component: Tabs.Trigger,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/design/ISSDryshtEpB7SUSdNqAcw/branch/P0GeJKqILL7UXvaqu5Jj7V/Aragon-ODS?m=auto&node-id=15855%3A27684',
        },
    },
};

type Story = StoryObj<typeof Tabs.Trigger>;

const reusableStoryComponent = (props: ITabsTriggerProps) => {
    return (
        <Tabs.Root>
            <Tabs.List>
                <Tabs.Trigger {...props} />
            </Tabs.List>
        </Tabs.Root>
    );
};

/**
 * Default usage example of a single Tabs.Trigger component.
 */
export const Default: Story = {
    args: {
        label: 'Tab 1',
        value: '1',
    },
    render: (args) => reusableStoryComponent(args),
};

export default meta;
