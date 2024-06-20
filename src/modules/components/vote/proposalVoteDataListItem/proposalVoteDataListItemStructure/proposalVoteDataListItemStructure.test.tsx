import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { DataList } from '../../../../../core';
import {
    ProposalVoteDataListItemStructure,
    type IProposalVoteDataListItemStructureProps,
} from '../../proposalVoteDataListItem';

jest.mock('../../../../../core/components/tag', () => ({
    Tag: ({ label }: { label: string }) => <div data-testid="tag">{label}</div>,
}));

jest.mock('./proposalVoteDataListItemStructure', () => ({
    ProposalVoteDataListItemStructure: () => <div data-testid="proposal-vote-dataListItem" />,
}));

describe('<ProposalVoteDataListItemStructure /> component', () => {
    const createTestComponent = (props?: Partial<IProposalVoteDataListItemStructureProps>) => {
        const completeProps: IProposalVoteDataListItemStructureProps = {
            id: 'PIP-06',
            title: 'Introduction of Layer 2 Scaling Solutions',
            voteIndicator: 'yes',
            date: '2 days ago',
            ...props,
        };

        return (
            <DataList.Root entityLabel="proposalVote">
                <DataList.Container>
                    <ProposalVoteDataListItemStructure {...completeProps} />
                </DataList.Container>
            </DataList.Root>
        );
    };

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders the vote and the proposal information', () => {
        render(
            createTestComponent({
                id: 'PIP-06',
                title: 'Introduction of Layer 2 Scaling Solutions',
                voteIndicator: 'yes',
                date: '2 days ago',
            }),
        );

        expect(screen.getByTestId('proposal-vote-dataListItem')).toBeInTheDocument();
        expect(screen.getByTestId('tag')).toHaveTextContent('yes');
    });
});
