import type { Meta, StoryObj } from '@storybook/react';
import { AssetTransfer } from './assetTransfer';

const meta: Meta<typeof AssetTransfer> = {
    title: 'Modules/Components/Asset/AssetTransfer',
    component: AssetTransfer,
    tags: ['autodocs'],
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/ISSDryshtEpB7SUSdNqAcw/branch/P0GeJKqILL7UXvaqu5Jj7V/Aragon-ODS?type=design&node-id=14385%3A24287&mode=dev&t=IX3Fa96hiwUEtcoA-1',
        },
    },
};

type Story = StoryObj<typeof AssetTransfer>;

/**
 * Default usage example of the AssetTransfer component.
 */
export const Default: Story = {
    args: {
        senderAddress: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
        recipientAddress: '0x168dAa4529bf88369ac8c1ABA5A2ad8CF2A61Fb9',
        senderEnsName: 'vitalik.eth',
        recipientEnsName: 'decentralizedtransactions.eth',
        tokenIconSrc: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png?1696501628',
        symbol: 'ETH',
        amount: 1,
        tokenName: 'Ethereum',
        hash: '0xf006e9454ad77c5e8e6f54106c6939d3d8b68ae16fc216d67c752f54adb21fc6',
        fiatPrice: 3850,
        chainId: 1,
    },
    render: (props) => <AssetTransfer {...props} />,
};

/**
 * Fallback usage example of the AssetTransfer component with only required props.
 */
export const Fallback: Story = {
    args: {
        senderAddress: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
        recipientAddress: '0x168dAa4529bf88369ac8c1ABA5A2ad8CF2A61Fb9',
        tokenName: 'Ethereum',
        symbol: 'ETH',
        amount: 1,
        hash: '0xf006e9454ad77c5e8e6f54106c6939d3d8b68ae16fc216d67c752f54adb21fc6',
        chainId: 1,
    },
    render: (props) => <AssetTransfer {...props} />,
};

export default meta;
