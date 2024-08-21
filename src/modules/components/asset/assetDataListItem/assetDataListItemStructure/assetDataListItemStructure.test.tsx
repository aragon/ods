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

    it('renders token name and symbol', () => {
        const props = { name: 'Ethereum', symbol: 'ETH' };
        render(createTestComponent(props));
        expect(screen.getByText(props.name)).toBeInTheDocument();
        expect(screen.getByText(props.symbol)).toBeInTheDocument();
    });

    it('correctly renders amount, fiat price and price change', () => {
        const props = { amount: 10, fiatPrice: 1250, priceChange: 25 };
        render(createTestComponent(props));
        expect(screen.getByText('$12.50K')).toBeInTheDocument();
        expect(screen.getByText(props.amount)).toBeInTheDocument();
        expect(screen.getByText('+$2.50K')).toBeInTheDocument();
        expect(screen.getByText('+25.00%')).toBeInTheDocument();
    });

    it('renders unknown with fiatPrice is not set', () => {
        const props = { fiatPrice: undefined };
        render(createTestComponent(props));
        expect(screen.getByText('Unknown')).toBeInTheDocument();
    });

    it('correctly renders price change when fiatPrice is set but priceChange property is undefined', () => {
        const props = { priceChange: undefined, fiatPrice: 10 };
        render(createTestComponent(props));
        expect(screen.getByText('0.00%')).toBeInTheDocument();
    });
});
