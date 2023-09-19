import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from './spinner';

const meta: Meta<typeof Spinner> = {
    title: 'components/Spinner',
    component: Spinner,
    tags: ['autodocs'],
};

type Story = StoryObj<typeof Spinner>;

/**
 * Default usage example of the Spinner component.
 */
export const Default: Story = {
    args: {
        variant: 'neutral',
        size: 'lg',
    },
};

export default meta;
