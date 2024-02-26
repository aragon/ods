import type { Meta, StoryObj } from '@storybook/react';
import { DataList } from '../index';

const meta: Meta<typeof DataList.Pagination> = {
    title: 'components/DataList/DataList.Pagination',
    component: DataList.Pagination,
    tags: ['autodocs'],
    parameters: {
        design: {
            type: 'figma',
            url: 'TODO',
        },
    },
};

type Story = StoryObj<typeof DataList.Pagination>;

/**
 * Default usage example of the DataList.Pagination component.
 */
export const Default: Story = {
    args: {},
    render: (props) => (
        <DataList.Root maxItems={2} itemsCount={10} entityLabel="Users">
            <DataList.Container>
                {[...Array(10)].map((_value, index) => (
                    <DataList.Item key={index}>User {index}</DataList.Item>
                ))}
            </DataList.Container>
            <DataList.Pagination {...props} />
        </DataList.Root>
    ),
};

export default meta;
