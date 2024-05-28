import type { Meta, StoryObj } from '@storybook/react';
import { Wallet } from './wallet';

const meta: Meta<typeof Wallet> = {
    title: 'Modules/Components/Wallet/Wallet',
    component: Wallet,
    tags: ['autodocs'],
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/design/ISSDryshtEpB7SUSdNqAcw/Aragon-ODS?m=auto&node-id=10451-13526&t=DIlkZ1JJt516kxyh-1',
        },
    },
};

type Story = StoryObj<typeof Wallet>;

/**
 * Default usage of the Wallet component.
 */
export const Default: Story = {};

export default meta;
