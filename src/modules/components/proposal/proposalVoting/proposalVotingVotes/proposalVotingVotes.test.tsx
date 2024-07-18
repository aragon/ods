import { render, screen } from '@testing-library/react';
import { Tabs } from '../../../../../core';
import { ProposalVotingTab } from '../proposalVotingDefinitions';
import { type IProposalVotingVotesProps, ProposalVotingVotes } from './proposalVotingVotes';

describe('<ProposalVotingVotes /> component', () => {
    const createTestComponent = (props?: Partial<IProposalVotingVotesProps>) => {
        const completeProps: IProposalVotingVotesProps = { ...props };

        return (
            <Tabs.Root defaultValue={ProposalVotingTab.VOTES}>
                <ProposalVotingVotes {...completeProps} />
            </Tabs.Root>
        );
    };

    it('renders a votes tab', () => {
        render(createTestComponent());
        const tabPabel = screen.getByRole('tabpanel');
        expect(tabPabel).toBeInTheDocument();
        expect(tabPabel.id).toContain(ProposalVotingTab.VOTES);
    });
});
