import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';

const meta: Meta<typeof Button> = {
    title: 'components/Button',
    component: Button,
    tags: ['autodocs'],
};

type Story = StoryObj<typeof Button>;

/**
 * Default usage example of the Button component.
 */
export const Default: Story = {
    args: {
        variant: 'primary',
        size: 'lg',
        children: 'Default',
        onClick: () => alert('click'),
    },
};

export default meta;
