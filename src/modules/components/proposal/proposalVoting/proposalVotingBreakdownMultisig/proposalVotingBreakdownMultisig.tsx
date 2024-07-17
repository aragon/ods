import { NumberFormat, Tabs, formatterUtils, invariant, type ITabsContentProps } from '../../../../../core';
import { useOdsModulesContext } from '../../../odsModulesProvider';
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
    const { approvalsAmount, minApprovals, membersCount, ...otherProps } = props;

    const { copy } = useOdsModulesContext();

    invariant(
        membersCount > 0,
        'ProposalVotingBreakdownMultisig: memberCount must be a positive number greater than 0',
    );

    const approvalsAmountPercentage = (approvalsAmount / membersCount) * 100;
    const minApprovalsPercentage = (minApprovals / membersCount) * 100;

    const formattedApprovalsAmount = formatterUtils.formatNumber(approvalsAmount, {
        format: NumberFormat.GENERIC_SHORT,
    });
    const formattedMembersCount = formatterUtils.formatNumber(membersCount, { format: NumberFormat.GENERIC_SHORT });

    return (
        <Tabs.Content value={ProposalVotingTab.BREAKDOWN} {...otherProps}>
            <ProposalVotingProgress.Container>
                <ProposalVotingProgress.Item
                    name={copy.proposalVotingBreakdownMultisig.name}
                    value={approvalsAmountPercentage}
                    indicator={minApprovalsPercentage}
                    description={{
                        value: formattedApprovalsAmount,
                        text: copy.proposalVotingBreakdownMultisig.description(formattedMembersCount),
                    }}
                    showStatusIcon={true}
                    variant={approvalsAmount >= minApprovals ? 'primary' : 'neutral'}
                />
            </ProposalVotingProgress.Container>
        </Tabs.Content>
    );
};
