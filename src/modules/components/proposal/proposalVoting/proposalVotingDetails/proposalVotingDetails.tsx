import { Tabs } from '../../../../../core';
import { ProposalVotingTab } from '../proposalVotingDefinitions';

export interface IProposalVotingDetailsProps {}

export const ProposalVotingDetails: React.FC<IProposalVotingDetailsProps> = () => {
    return <Tabs.Content value={ProposalVotingTab.DETAILS}>Details</Tabs.Content>;
};
