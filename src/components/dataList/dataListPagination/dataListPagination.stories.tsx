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
};

export default meta;
