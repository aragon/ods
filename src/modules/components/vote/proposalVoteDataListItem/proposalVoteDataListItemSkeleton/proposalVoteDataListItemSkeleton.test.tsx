import { render, screen } from '@testing-library/react';
import { ProposalVoteDataListItem, type IProposalVoteDataListItemSkeletonProps } from '../..';
import { DataList } from '../../../../../core';

describe('<ProposalVoteDataListItem.Skeleton /> component', () => {
    const createTestComponent = (props?: Partial<IProposalVoteDataListItemSkeletonProps>) => {
        const completeProps: IProposalVoteDataListItemSkeletonProps = { ...props };

        return (
            <DataList.Root entityLabel="proposalVote">
                <ProposalVoteDataListItem.Skeleton {...completeProps} />
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
