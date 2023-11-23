import type { Meta, StoryObj } from '@storybook/react';

import { Avatar } from './avatar';

const meta: Meta<typeof Avatar> = {
    title: 'components/Avatars/Avatar',
    component: Avatar,
    tags: ['autodocs'],
};

type Story = StoryObj<typeof Avatar>;

/**
 * Default usage of the Avatar component
 */
export const Default: Story = {
    args: {
        size: 'lg',
    },
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/ISSDryshtEpB7SUSdNqAcw/branch/jfKRr1V9evJUp1uBeyP3Zz/Aragon-ODS?node-id=10413%3A11972&mode=dev',
        },
    },
};

/**
 * Wallet address avatar
 */
export const Wallet: Story = {
    args: {
        size: 'sm',
        src: '0x0000000000000000000000000000000000000000',
    },
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/ISSDryshtEpB7SUSdNqAcw/branch/jfKRr1V9evJUp1uBeyP3Zz/Aragon-ODS?node-id=7853%3A14199&mode=dev',
        },
    },
};

/**
 * Token symbol avatar
 */
export const Token: Story = {
    args: {
        responsiveSize: { md: 'md' },
        size: 'md',
        src: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
    },
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/ISSDryshtEpB7SUSdNqAcw/branch/jfKRr1V9evJUp1uBeyP3Zz/Aragon-ODS?type=design&node-id=1-32&mode=design&t=sfIu3NdB5L0zbR2w-0',
        },
    },
};

/**
 * Fallback Dao avatar
 */
export const Dao: Story = {
    args: {
        size: 'lg',
        src: 'Patito Dao',
    },
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/ISSDryshtEpB7SUSdNqAcw/branch/jfKRr1V9evJUp1uBeyP3Zz/Aragon-ODS?node-id=10413%3A11972&mode=dev',
        },
    },
};

export default meta;
