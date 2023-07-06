import type { Meta, StoryObj } from '@storybook/react';

import { Tag } from './tag';

const meta = {
    title: 'Components/Tag',
    component: Tag,
    tags: ['autodocs'],
} satisfies Meta<typeof Tag>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        colorScheme: 'primary',
        children: 'Primary label',
    },
};
