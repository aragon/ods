import type { Meta, StoryObj } from '@storybook/react';
import { AvatarBase } from './avatarBase';

const meta: Meta<typeof AvatarBase> = {
    title: 'Core/Components/Avatars/AvatarBase',
    component: AvatarBase,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: 'TODO',
            },
        },
    },
};

type Story = StoryObj<typeof AvatarBase>;

/**
 * Default usage example of the AvatarBase component.
 */
export const Default: Story = {
    args: {
        src: 'https://cdn.discordapp.com/icons/672466989217873929/acffa3e9e09ac5962ff803a5f8649040.webp?size=240',
    },
};

export default meta;
