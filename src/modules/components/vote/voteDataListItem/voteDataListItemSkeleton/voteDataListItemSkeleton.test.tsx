import { render, screen } from '@testing-library/react';
import { VoteDataListItem, type IVoteDataListItemSkeletonProps } from '../..';
import { DataList } from '../../../../../core';

describe('<VoteDataListItem.Skeleton /> component', () => {
    const createTestComponent = (props?: Partial<IVoteDataListItemSkeletonProps>) => {
        const completeProps: IVoteDataListItemSkeletonProps = { ...props };

        return (
            <DataList.Root entityLabel="Vote">
                <VoteDataListItem.Skeleton {...completeProps} />
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
