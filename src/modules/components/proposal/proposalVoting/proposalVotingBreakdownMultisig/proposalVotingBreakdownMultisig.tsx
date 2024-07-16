import { formatterUtils, type ITabsContentProps, NumberFormat, Tabs } from '../../../../../core';
import { ProposalVotingTab } from '../proposalVotingDefinitions';
import { ProposalVotingProgress } from '../proposalVotingProgress';

export interface IProposalVotingBreakdownMultisigProps extends Omit<ITabsContentProps, 'value'> {
    /**
     * Current number of approvals for the proposal.
     */
    approvalsAmount: number;
    /**
     * Minimum numbers of approvals required for a proposal to pass.
     */
    minApprovals: number;
    /**
     * Number of members of a DAO when the proposal was created.
     */
    membersCount: number;
}

export const ProposalVotingBreakdownMultisig: React.FC<IProposalVotingBreakdownMultisigProps> = (props) => {
    const { approvalsAmount, minApprovals, membersCount } = props;

    const approvalsAmountPercentage = (approvalsAmount / membersCount) * 100;
    const minApprovalsPercentage = (minApprovals / membersCount) * 100;

    const formattedApprovalsAmount = formatterUtils.formatNumber(approvalsAmount, {
        format: NumberFormat.GENERIC_SHORT,
    });
    const formattedMembersCount = formatterUtils.formatNumber(membersCount, { format: NumberFormat.GENERIC_SHORT });

    return (
        <Tabs.Content value={ProposalVotingTab.BREAKDOWN} {...props}>
            <ProposalVotingProgress.Container>
                <ProposalVotingProgress.Item
                    name="Minimum Approval"
                    value={approvalsAmountPercentage}
                    indicator={minApprovalsPercentage}
                    description={{ value: formattedApprovalsAmount, text: `of ${formattedMembersCount} Members` }}
                    showStatusIcon={true}
                    variant={approvalsAmount >= minApprovals ? 'primary' : 'neutral'}
                />
            </ProposalVotingProgress.Container>
        </Tabs.Content>
    );
};
