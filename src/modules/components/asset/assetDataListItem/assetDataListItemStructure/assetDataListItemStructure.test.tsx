import { render, screen } from '@testing-library/react';
import { DataList } from '../../../../../core';
import { AssetDataListItemStructure, type IAssetDataListItemStructureProps } from './assetDataListItemStructure';

describe('<AssetDataListItem.Structure /> component', () => {
    const createTestComponent = (props: Partial<IAssetDataListItemStructureProps> = {}) => {
        const completeProps: IAssetDataListItemStructureProps = {
            name: 'Ethereum',
            symbol: 'ETH',
            amount: 420.69,
            ...props,
        };

        return (
            <DataList.Root entityLabel="Assets">
                <DataList.Container>
                    <AssetDataListItemStructure {...completeProps} />
                </DataList.Container>
            </DataList.Root>
        );
    };

    it('renders tokenName and symbol', () => {
        const props = {
            name: 'Ethereum',
            symbol: 'ETH',
            amount: 420.69,
        };

        render(createTestComponent(props));
        expect(screen.getByText(props.name)).toBeInTheDocument();
        expect(screen.getByText(props.symbol)).toBeInTheDocument();
    });

    it('renders amount, fiat price', async () => {
        const props = {
            name: 'Ethereum',
            symbol: 'ETH',
            amount: 420.69,
            fiatPrice: 3654.76,
        };

        render(createTestComponent(props));
        const USDAmount = await screen.findByText(/1.54/);
        expect(USDAmount).toHaveTextContent('$1.54M');
        expect(screen.getByText(props.amount)).toBeInTheDocument();
    });

    it('handles not passing fiat price', () => {
        const props = {
            name: 'Ethereum',
            symbol: 'ETH',
            amount: 0,
            priceChange: 0,
        };

        render(createTestComponent(props));
        expect(screen.getByText('Unknown')).toBeInTheDocument(); // Assuming Tag component renders '0%' for zero priceChange
    });

    it('handle not passing priceChange', async () => {
        const props = {
            name: 'Ethereum',
            amount: 420.69,
            symbol: 'ETH',
            fiatPrice: 3654.76,
        };

        render(createTestComponent(props));
        expect(screen.getByText('0%')).toBeInTheDocument();
    });
});
