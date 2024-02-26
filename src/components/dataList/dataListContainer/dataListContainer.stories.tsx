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
        <DataList.Root entityLabel="Items">
            <DataList.Container {...props}>
                <DataList.Item>Data List Item</DataList.Item>
            </DataList.Container>
        </DataList.Root>
    ),
};

export default meta;
