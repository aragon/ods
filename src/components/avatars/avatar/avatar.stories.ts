import type { Meta, StoryObj } from '@storybook/react';

import { Avatar } from './avatar';

const meta: Meta<typeof Avatar> = {
    title: 'components/Avatars/Avatar',
    component: Avatar,
    tags: ['autodocs'],
};

type Story = StoryObj<typeof Avatar>;

/**
 * Default usage example of Avatar component.
 */
export const Default: Story = {
    args: {
        responsiveSize: { sm: 'sm', md: 'md', lg: 'lg' },
        size: 'md',
        src: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
    },
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/jfKRr1V9evJUp1uBeyP3Zz/v1.0.0?type=design&node-id=7853-14315&mode=dev',
        },
    },
};

/**
 * Usage as a wallet address avatar
 */
export const WalletAvatar: Story = {
    args: {
        size: 'sm',
        src: '0x0000000000000000000000000000000000000000',
    },
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/jfKRr1V9evJUp1uBeyP3Zz/v1.0.0?type=design&node-id=7853-14315&mode=dev',
        },
    },
};

export const DaoAvatar: Story = {
    args: {
        size: 'lg',
        copy: 'Patito Dao',
    },
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/jfKRr1V9evJUp1uBeyP3Zz/v1.0.0?type=design&node-id=7853-14315&mode=dev',
        },
    },
};

export default meta;
