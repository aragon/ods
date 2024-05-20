import { render, screen } from '@testing-library/react';
import { DataList } from '../../../../../core';
import { TransactionDataListItem, type ITransactionDataListItemSkeletonProps } from '../../transactionDataListItem';

describe('<MemberDataListItem.Skeleton /> component', () => {
    const createTestComponent = (props?: Partial<ITransactionDataListItemSkeletonProps>) => {
        const completeProps: ITransactionDataListItemSkeletonProps = { ...props };

        return (
            <DataList.Root entityLabel="Transaction">
                <TransactionDataListItem.Skeleton {...completeProps} />
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
