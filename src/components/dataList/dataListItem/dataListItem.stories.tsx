import type { Meta, StoryObj } from '@storybook/react';
import { DataList } from '../index';

const meta: Meta<typeof DataList.Item> = {
    title: 'components/DataList/DataList.Item',
    component: DataList.Item,
    tags: ['autodocs'],
    parameters: {
        design: {
            type: 'figma',
            url: 'TODO',
        },
    },
};

type Story = StoryObj<typeof DataList.Item>;

/**
 * Default usage example of the DataList.Item component.
 */
export const Default: Story = {
    args: {},
    render: (props) => (
        <DataList.Root entityLabel="Users">
            <DataList.Container>
                <DataList.Item {...props}>Data List Item</DataList.Item>
            </DataList.Container>
        </DataList.Root>
    ),
};

export default meta;
