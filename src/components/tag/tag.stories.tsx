import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { Tag } from './tag';

const meta = {
    title: 'Components/Tag',
    component: Tag,
    tags: ['autodocs'],
} satisfies Meta<typeof Tag>;

export default meta;

export const Default: StoryObj<typeof meta> = {
    args: {
        children: 'Default label',
    },
};

export const ColorSchemes: StoryObj<typeof Tag> = {
    render: () => (
        <div className="flex gap-1">
            <Tag colorScheme="critical">Critical</Tag>
            <Tag colorScheme="info">Info</Tag>
            <Tag colorScheme="neutral">Neutral</Tag>
            <Tag colorScheme="primary">Primary</Tag>
            <Tag colorScheme="success">Success</Tag>
            <Tag colorScheme="warning">Warning</Tag>
        </div>
    ),
};
