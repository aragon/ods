import { render, screen } from '@testing-library/react';
import { VoteProposalDataListItem, type IVoteProposalDataListItemSkeletonProps } from '../..';

describe('<VoteProposalDataListItem.Skeleton /> component', () => {
    const createTestComponent = (props?: Partial<IVoteProposalDataListItemSkeletonProps>) => {
        const completeProps: IVoteProposalDataListItemSkeletonProps = { ...props };

        return <VoteProposalDataListItem.Skeleton {...completeProps} />;
    };
    it('has correct accessibility attributes', () => {
        render(createTestComponent());
        const listItem = screen.getByLabelText('loading');
        expect(listItem).toHaveAttribute('aria-busy', 'true');
        expect(listItem).toHaveAttribute('tabIndex', '0');
    });
});
