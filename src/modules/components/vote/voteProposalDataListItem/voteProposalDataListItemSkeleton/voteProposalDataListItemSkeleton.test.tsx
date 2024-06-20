import { render, screen } from '@testing-library/react';
import { VoteProposalDataListItem, type IVoteProposalDataListItemSkeletonProps } from '../..';
import { DataList } from '../../../../../core';

describe('<VoteProposalDataListItem.Skeleton /> component', () => {
    const createTestComponent = (props?: Partial<IVoteProposalDataListItemSkeletonProps>) => {
        const completeProps: IVoteProposalDataListItemSkeletonProps = { ...props };

        return (
            <DataList.Root entityLabel="proposalVote">
                <VoteProposalDataListItem.Skeleton {...completeProps} />
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
