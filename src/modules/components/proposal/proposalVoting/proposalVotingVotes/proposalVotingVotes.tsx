import { Tabs } from '../../../../../core';
import { ProposalVotingTab } from '../proposalVotingDefinitions';

export interface IProposalVotingVotesProps {}

export const ProposalVotingVotes: React.FC<IProposalVotingVotesProps> = () => {
    return <Tabs.Content value={ProposalVotingTab.VOTES}>Votes</Tabs.Content>;
};
