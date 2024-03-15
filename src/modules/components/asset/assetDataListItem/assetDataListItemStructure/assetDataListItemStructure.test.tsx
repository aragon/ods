import { render, screen } from '@testing-library/react';
import { DataList } from '../../../../../core';
import { AssetDataListItemStructure, type IAssetDataListItemStructureProps } from './assetDataListItemStructure';

describe('<AssetDataListItemStructure /> component', () => {
    const createTestComponent = (props?: Partial<IAssetDataListItemStructureProps>) => {
        return (
            <DataList.Root entityLabel="Assets">
                <DataList.Container>
                    <AssetDataListItemStructure {...props} />
                </DataList.Container>
            </DataList.Root>
        );
    };

    it('renders tokenName, symbol, and the logoSrc', () => {
        const props = {
            logoSrc: 'https://assets.coingecko.com/coins/images/279/standard/ethereum.png?1696501628',
            tokenName: 'Ethereum',
            amount: 420.69,
            symbol: 'ETH',
            USDAmount: 1230000,
            changedAmount: 420.69,
            changedPercentage: 0.05,
        };

        render(createTestComponent(props));
        expect(screen.getByText(props.tokenName)).toBeInTheDocument();
        expect(screen.getByText(props.symbol)).toBeInTheDocument();
    });

    it('handles zero changedAmount and changedPercentage as neutral', () => {
        const props = {
            logoSrc: 'https://assets.coingecko.com/coins/images/279/standard/ethereum.png?1696501628',
            tokenName: 'Ethereum',
            amount: 420.69,
            symbol: 'ETH',
            USDAmount: 1230000,
            changedAmount: 0,
            changedPercentage: 0,
        };

        render(createTestComponent(props));
        expect(screen.getByText('$0.00')).toBeInTheDocument(); // Assuming component shows '0' for zero changedAmount
        expect(screen.getByText('0%')).toBeInTheDocument(); // Assuming Tag component renders '0%' for zero changedPercentage
    });

    it('handle not passing changedAmount and changedPercentage', async () => {
        const props = {
            logoSrc: 'https://assets.coingecko.com/coins/images/279/standard/ethereum.png?1696501628',
            tokenName: 'Ethereum',
            amount: 420.69,
            symbol: 'ETH',
            USDAmount: 1230000,
        };

        render(createTestComponent(props));
        expect(screen.getByText('0%')).toBeInTheDocument();
        const USDAmount = await screen.findByText(/1.23/);
        expect(USDAmount).toHaveTextContent('$1.23M');
    });

    it('handle not passing changedPercentage', async () => {
        const props = {
            logoSrc: 'https://assets.coingecko.com/coins/images/279/standard/ethereum.png?1696501628',
            tokenName: 'Ethereum',
            amount: -420.69,
            symbol: 'ETH',
            USDAmount: 1230000,
            changedAmount: 420.69,
            changedPercentage: 0.05,
        };

        render(createTestComponent(props));
        const tagElement = await screen.findByText(/\+ 5%/);
        expect(tagElement).toHaveTextContent('+ 5%');
    });
});
