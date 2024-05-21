import { render, screen } from '@testing-library/react';
import { DataList } from '../../../../../core';
import { MemberDataListItemSkeleton, type IMemberDataListItemSkeletonProps } from './memberDataListItemSkeleton';

describe('<MemberDataListItem.Skeleton /> component', () => {
    const createTestComponent = (props?: Partial<IMemberDataListItemSkeletonProps>) => {
        const completeProps: IMemberDataListItemSkeletonProps = { ...props };

        return (
            <DataList.Root entityLabel="Member">
                <MemberDataListItemSkeleton {...completeProps} />
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
