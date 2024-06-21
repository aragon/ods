import type { Meta, StoryObj } from '@storybook/react';
import { Tabs, type ITabsRootProps } from '..';
import { Card } from '../../cards';
import { IconType } from '../../icon';

/**
 * Tabs.Root can contain multiple Tabs.Triggers inside it's requisite Tabs.List. These tabs will coordinate with what Tabs.Content to show by matching their value prop.
 */
const meta: Meta<typeof Tabs.Root> = {
    title: 'Core/Components/Tabs/Tabs.Root',
    component: Tabs.Root,
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
                <Tabs.Trigger label="Tab 1" value="1" />
                <Tabs.Trigger label="Tab 2" value="2" />
                <Tabs.Trigger label="Tab 3" value="3" iconRight={IconType.BLOCKCHAIN_BLOCK} />
            </Tabs.List>
            <Tabs.Content value="1">
                <div className="flex h-24 w-96 items-center justify-center border border-dashed border-info-300 bg-info-100">
                    Item 1 Content
                </div>
            </Tabs.Content>
            <Tabs.Content value="2">
                <div className="flex h-24 w-96 items-center justify-center border border-dashed border-info-300 bg-info-100">
                    Item 2 Content
                </div>
            </Tabs.Content>
            <Tabs.Content value="3">
                <div className="flex h-24 w-96 items-center justify-center border border-dashed border-info-300 bg-info-100">
                    Item 3 Content
                </div>
            </Tabs.Content>
        </Tabs.Root>
    );
};

/**
 * Default usage example of a full Tabs component.
 */
export const Default: Story = {
    args: {},
    render: (args) => reusableStoryComponent(args),
};

/**
 * Usage example of a Tabs component with the isUnderlined prop set to true.
 */
export const Underlined: Story = {
    args: { isUnderlined: true },
    render: (args) => reusableStoryComponent(args),
};

/**
 * Usage example of a Tabs component inside a Card component with the defaultValue set.
 */
export const InsideCard: Story = {
    args: { defaultValue: '2' },
    render: (args) => <Card className="p-6">{reusableStoryComponent(args)}</Card>,
};

export default meta;
