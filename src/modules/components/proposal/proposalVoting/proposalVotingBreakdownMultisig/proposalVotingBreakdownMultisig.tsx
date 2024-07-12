import { Tabs } from '../../../../../core';
import { ProposalVotingTab } from '../proposalVotingDefinitions';

export interface IProposalVotingBreakdownMultisigProps {}

export const ProposalVotingBreakdownMultisig: React.FC<IProposalVotingBreakdownMultisigProps> = () => {
    return <Tabs.Content value={ProposalVotingTab.BREAKDOWN}>Multisig breakdown</Tabs.Content>;
};
