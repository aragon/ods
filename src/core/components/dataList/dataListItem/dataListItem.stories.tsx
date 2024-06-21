import type { Meta, StoryObj } from '@storybook/react';
import { DataList } from '../index';

const meta: Meta<typeof DataList.Item> = {
    title: 'Core/Components/DataList/DataList.Item',
    component: DataList.Item,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/P0GeJKqILL7UXvaqu5Jj7V/v1.1.0?type=design&node-id=13724-27671&mode=dev',
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
