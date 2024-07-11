import { ProposalVotingBreakdownMultisig } from './proposalVotingBreakdownMultisig';
import { ProposalVotingBreakdownToken } from './proposalVotingBreakdownToken';
import { ProposalVotingContainer } from './proposalVotingContainer';
import { ProposalVotingStage } from './proposalVotingStage';
import { ProposalVotingTabs } from './proposalVotingTabs';

export const ProposalVoting = {
    Container: ProposalVotingContainer,
    Stage: ProposalVotingStage,
    Tabs: ProposalVotingTabs,
    BreakdownMultisig: ProposalVotingBreakdownMultisig,
    BreakdownToken: ProposalVotingBreakdownToken,
};

export * from './proposalVotingBreakdownMultisig';
export * from './proposalVotingBreakdownToken';
export * from './proposalVotingContainer';
export * from './proposalVotingDefinitions';
export * from './proposalVotingStage';
export * from './proposalVotingTabs';
