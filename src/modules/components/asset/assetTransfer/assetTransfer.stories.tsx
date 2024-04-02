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

export const Default: Story = {};

export const Loaded: Story = {
    args: {
        senderAddress: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
        recipientAddress: '0x1D03D98c0aac1f83860cec5156116FE68725642E',
        senderEnsName: 'vitalik.eth',
        tokenIconSrc: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png?1696501628',
        tokenSymbol: 'ETH',
        tokenAmount: 1,
        tokenName: 'Ethereum',
        hash: '0xf006e9454ad77c5e8e6f54106c6939d3d8b68ae16fc216d67c752f54adb21fc6',
        tokenPrice: 3850,
        chainId: 1,
    },
    render: (props) => <AssetTransfer {...props} />,
};

export default meta;
