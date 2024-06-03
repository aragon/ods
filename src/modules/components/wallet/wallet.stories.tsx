import type { Meta, StoryObj } from '@storybook/react';
import { Wallet } from './wallet';

/**
 * Our Wallet button implementation is intentionally minimal for full flexibility.
 * As a controlled component you can pass the user details and connectivity actions to the component.
 * This includes a global connected state, likely from your WAGMI provider.
 */
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

/**
 * Example usage of a connected Wallet component with only address.
 */
export const WithAddress: Story = {
    args: {
        user: {
            address: '0x1234567890123456789012345678901234567890',
        },
        isConnected: true,
    },
    render: (props) => <Wallet {...props} />,
};

/**
 * Example usage of a connected Wallet component with additional ENS handle provided.
 */
export const WithEnsName: Story = {
    args: {
        user: {
            address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
            name: 'vitalik.eth',
        },
        isConnected: true,
    },
    render: (props) => <Wallet {...props} />,
};

export default meta;
