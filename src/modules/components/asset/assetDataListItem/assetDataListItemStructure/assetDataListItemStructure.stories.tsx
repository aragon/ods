import type { Meta, StoryObj } from '@storybook/react';
import { DataList } from '../../../../../core/components/dataList';
import { AssetDataListItemStructure } from './assetDataListItemStructure';

const meta: Meta<typeof AssetDataListItemStructure> = {
    title: 'Modules/Components/asset/AssetDataListItem/AssetDataListItem.Structure',
    component: AssetDataListItemStructure,
    tags: ['autodocs'],
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/P0GeJKqILL7UXvaqu5Jj7V/v1.1.0?type=design&node-id=3259-11363&mode=dev',
        },
    },
};

type Story = StoryObj<typeof AssetDataListItemStructure>;

/**
 * Default usage example of the AssetDataListItem component.
 */
export const Default: Story = {
    args: {
        logoSrc: 'https://assets.coingecko.com/coins/images/279/standard/ethereum.png?1696501628',
        tokenName: 'Ethereum',
        amount: 420.69,
        symbol: 'ETH',
        USDAmount: 1230000,
        changedAmount: 420.69,
        changedPercentage: 0.05,
    },
    render: (props) => (
        <DataList.Root entityLabel="Assets">
            <DataList.Container>
                <AssetDataListItemStructure {...props} />
            </DataList.Container>
        </DataList.Root>
    ),
};

/**
 *  Usage of the AssetDataListItem without changedAmount and changedPercentage.
 */
export const Fallback: Story = {
    args: {
        logoSrc: 'https://assets.coingecko.com/coins/images/279/standard/ethereum.png?1696501628',
        tokenName: 'Ethereum',
        amount: 420.69,
        symbol: 'ETH',
        USDAmount: 1230000,
    },
    render: (props) => (
        <DataList.Root entityLabel="Assets">
            <DataList.Container>
                <AssetDataListItemStructure {...props} />
            </DataList.Container>
        </DataList.Root>
    ),
};

export default meta;
