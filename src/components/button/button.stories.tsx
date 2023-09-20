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
        children: 'Button label',
        onClick: () => alert('click'),
    },
};

/**
 * Usage example of the Button component as Link.
 */
export const Link: Story = {
    args: {
        variant: 'primary',
        size: 'lg',
        children: 'Link label',
        onClick: () => alert('click'),
        href: 'www.google.com',
        target: '_blank',
    },
};

export default meta;
