import type { Meta, StoryObj } from '@storybook/react';
import { DataList } from '..';

const meta: Meta<typeof DataList.Container> = {
    title: 'components/DataList/DataList.Container',
    component: DataList.Container,
    tags: ['autodocs'],
    parameters: {
        design: {
            type: 'figma',
            url: 'TODO',
        },
    },
};

type Story = StoryObj<typeof DataList.Container>;

/**
 * Default usage example of the DataList.Container component.
 */
export const Default: Story = {
    args: {},
    render: (props) => (
        <DataList.Root>
            <DataList.Container {...props}>
                <DataList.Item>Item 1</DataList.Item>
                <DataList.Item>Item 2</DataList.Item>
            </DataList.Container>
        </DataList.Root>
    ),
};

export default meta;
