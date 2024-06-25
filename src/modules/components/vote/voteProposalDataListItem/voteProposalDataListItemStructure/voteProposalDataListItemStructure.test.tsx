import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { DataList } from '../../../../../core';
import {
    VoteProposalDataListItemStructure,
    type IVoteProposalDataListItemStructureProps,
} from './voteProposalDataListItemStructure';

jest.mock('../../../../../core/components/tag', () => ({
    Tag: ({ label }: { label: string }) => <div data-testid="tag">{label}</div>,
}));

describe('<VoteProposalDataListItemStructure /> component', () => {
    const createTestComponent = (props?: Partial<IVoteProposalDataListItemStructureProps>) => {
        const completeProps: IVoteProposalDataListItemStructureProps = {
            id: 'PIP-06',
            title: 'Introduction of Layer 2 Scaling Solutions',
            voteIndicator: 'yes',
            ...props,
        };

        return (
            <DataList.Root entityLabel="proposalVote">
                <DataList.Container>
                    <VoteProposalDataListItemStructure {...completeProps} />
                </DataList.Container>
            </DataList.Root>
        );
    };

    it('renders the vote and the proposal information', () => {
        const id = 'PIP-06';
        const voteIndicator = 'no';
        render(createTestComponent({ id, voteIndicator }));

        expect(screen.getByTestId('tag')).toHaveTextContent(voteIndicator);
        expect(screen.getByText(id)).toBeInTheDocument();
    });

    it('renders the date if available', () => {
        const date = '2 days ago';
        render(createTestComponent({ date }));

        expect(screen.getByText(date)).toBeInTheDocument();
    });
});
