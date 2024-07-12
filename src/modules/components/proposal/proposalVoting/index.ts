import { ProposalVotingBreakdownMultisig } from './proposalVotingBreakdownMultisig';
import { ProposalVotingBreakdownToken } from './proposalVotingBreakdownToken';
import { ProposalVotingContainer } from './proposalVotingContainer';
import { ProposalVotingDetails } from './proposalVotingDetails';
import { ProposalVotingStage } from './proposalVotingStage';
import { ProposalVotingTabs } from './proposalVotingTabs';
import { ProposalVotingVotes } from './proposalVotingVotes';

export const ProposalVoting = {
    BreakdownMultisig: ProposalVotingBreakdownMultisig,
    BreakdownToken: ProposalVotingBreakdownToken,
    Container: ProposalVotingContainer,
    Details: ProposalVotingDetails,
    Stage: ProposalVotingStage,
    Tabs: ProposalVotingTabs,
    Votes: ProposalVotingVotes,
};

export * from './proposalVotingBreakdownMultisig';
export * from './proposalVotingBreakdownToken';
export * from './proposalVotingContainer';
export * from './proposalVotingDefinitions';
export * from './proposalVotingDetails';
export * from './proposalVotingStage';
export * from './proposalVotingTabs';
export * from './proposalVotingVotes';
