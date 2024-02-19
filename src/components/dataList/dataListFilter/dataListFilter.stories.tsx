import type { Meta, StoryObj } from '@storybook/react';
import { DataList } from '../index';

const meta: Meta<typeof DataList.Filter> = {
    title: 'components/DataList/DataList.Filter',
    component: DataList.Filter,
    tags: ['autodocs'],
    parameters: {
        design: {
            type: 'figma',
            url: 'TODO',
        },
    },
};

type Story = StoryObj<typeof DataList.Filter>;

/**
 * Default usage example of the DataList.Filter component.
 */
export const Default: Story = {
    args: {},
    render: (props) => (
        <DataList.Root>
            <DataList.Filter {...props} />
        </DataList.Root>
    ),
};

export default meta;
