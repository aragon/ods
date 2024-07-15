import { type ITabsContentProps, Tabs } from '../../../../../core';
import { ProposalVotingTab } from '../proposalVotingDefinitions';

export interface IProposalVotingBreakdownMultisigProps extends Omit<ITabsContentProps, 'value'> {}

export const ProposalVotingBreakdownMultisig: React.FC<IProposalVotingBreakdownMultisigProps> = (props) => {
    return (
        <Tabs.Content value={ProposalVotingTab.BREAKDOWN} {...props}>
            Multisig breakdown
        </Tabs.Content>
    );
};
