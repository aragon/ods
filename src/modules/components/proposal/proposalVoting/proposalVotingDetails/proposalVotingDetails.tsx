import { ITabsContentProps, Tabs } from '../../../../../core';
import { ProposalVotingTab } from '../proposalVotingDefinitions';

export interface IProposalVotingDetailsProps extends Omit<ITabsContentProps, 'value'> {}

export const ProposalVotingDetails: React.FC<IProposalVotingDetailsProps> = (props) => {
    return (
        <Tabs.Content value={ProposalVotingTab.DETAILS} {...props}>
            Details
        </Tabs.Content>
    );
};
