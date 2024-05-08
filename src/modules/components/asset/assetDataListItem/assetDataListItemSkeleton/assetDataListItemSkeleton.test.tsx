import { render, screen } from '@testing-library/react';
import { DataList } from '../../../../../core';
import { AssetDataListItem, type IAssetDataListItemSkeletonProps } from '../../assetDataListItem';

describe('<AssetDataListItem.Skeleton /> component', () => {
    const createTestComponent = (props?: Partial<IAssetDataListItemSkeletonProps>) => {
        const completeProps: IAssetDataListItemSkeletonProps = { ...props };

        return (
            <DataList.Root entityLabel="Asset">
                <AssetDataListItem.Skeleton {...completeProps} />
            </DataList.Root>
        );
    };
    it('has correct accessibility attributes', () => {
        render(createTestComponent());
        const listItem = screen.getByLabelText('loading');
        expect(listItem).toHaveAttribute('aria-busy', 'true');
        expect(listItem).toHaveAttribute('tabIndex', '0');
    });
});
