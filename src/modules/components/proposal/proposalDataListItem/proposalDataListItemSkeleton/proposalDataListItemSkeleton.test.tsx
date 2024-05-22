import { render, screen } from '@testing-library/react';
import { DataList } from '../../../../../core';
import { ProposalDataListItemSkeleton, type IProposalDataListItemSkeletonProps } from './proposalDataListItemSkeleton';

describe('<ProposalDataListItem.Skeleton /> component', () => {
    const createTestComponent = (props?: Partial<IProposalDataListItemSkeletonProps>) => {
        const completeProps: IProposalDataListItemSkeletonProps = { ...props };

        return (
            <DataList.Root entityLabel="Proposal">
                <ProposalDataListItemSkeleton {...completeProps} />
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
