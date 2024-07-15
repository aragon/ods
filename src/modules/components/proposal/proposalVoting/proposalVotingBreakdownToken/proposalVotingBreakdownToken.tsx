import classNames from 'classnames';
import { type ITabsContentProps, NumberFormat, Tabs, formatterUtils } from '../../../../../core';
import { ProposalVotingTab } from '../proposalVotingDefinitions';
import { ProposalVotingProgress } from '../proposalVotingProgress';

export interface IProposalVotingBreakdownTokenProps extends Omit<ITabsContentProps, 'value'> {
    /**
     * Total voting power of users that voted yes.
     */
    totalYes: number | string;
    /**
     * Total voting power of users that voted no.
     */
    totalNo: number | string;
    /**
     * Total voting power of users that voted abstain.
     */
    totalAbstain: number | string;
    /**
     * Percentage of tokens that need to vote "Yes" for a proposal to pass.
     */
    supportThreshold: number;
    /**
     * Percentage of tokens that need to participate in a vote for it to be valid.
     */
    minParticipation: number;
    /**
     * Symbol of the governance token.
     */
    tokenSymbol: string;
    /**
     * Total supply of the governance token.
     */
    tokenTotalSupply: number | string;
}

export const ProposalVotingBreakdownToken: React.FC<IProposalVotingBreakdownTokenProps> = (props) => {
    const {
        className,
        totalAbstain,
        totalNo,
        totalYes,
        supportThreshold,
        minParticipation,
        tokenSymbol,
        tokenTotalSupply,
        ...otherProps
    } = props;

    const totalVotes = Number(totalAbstain) + Number(totalNo) + Number(totalYes);
    const formattedTotalVotes = formatterUtils.formatNumber(totalVotes, { format: NumberFormat.GENERIC_SHORT });

    const totalYesPercentage = (Number(totalYes) / Number(totalVotes)) * 100;
    const formattedTotalYes = formatterUtils.formatNumber(totalYes, { format: NumberFormat.GENERIC_SHORT });

    const totalAbstainPercentage = (Number(totalAbstain) / Number(totalVotes)) * 100;
    const formattedTotalAbstain = formatterUtils.formatNumber(totalAbstain, { format: NumberFormat.GENERIC_SHORT });

    const totalNoPercentage = (Number(totalAbstain) / Number(totalVotes)) * 100;
    const formattedTotalNo = formatterUtils.formatNumber(totalNo, { format: NumberFormat.GENERIC_SHORT });

    const minParticipationToken = (Number(tokenTotalSupply) * minParticipation) / 100;
    const formattedMinParticipationToken = formatterUtils.formatNumber(minParticipationToken, {
        format: NumberFormat.GENERIC_SHORT,
    });

    const currentParticipationPercentage = (totalVotes / minParticipationToken) * 100;

    return (
        <Tabs.Content
            value={ProposalVotingTab.BREAKDOWN}
            className={classNames('flex flex-col gap-4', className)}
            {...otherProps}
        >
            <ProposalVotingProgress.Container direction="row">
                <ProposalVotingProgress.Item
                    name="Yes"
                    value={totalYesPercentage}
                    description={{ value: formattedTotalYes, text: tokenSymbol }}
                    variant="success"
                />
                <ProposalVotingProgress.Item
                    name="Abstain"
                    value={totalAbstainPercentage}
                    description={{ value: formattedTotalAbstain, text: tokenSymbol }}
                    variant="neutral"
                />
                <ProposalVotingProgress.Item
                    name="No"
                    value={totalNoPercentage}
                    description={{ value: formattedTotalNo, text: tokenSymbol }}
                    variant="critical"
                />
            </ProposalVotingProgress.Container>
            <ProposalVotingProgress.Container direction="col">
                <ProposalVotingProgress.Item
                    name="Support"
                    value={totalYesPercentage}
                    description={{ value: formattedTotalYes, text: `of ${formattedTotalVotes} ${tokenSymbol}` }}
                    showPercentage={true}
                    showStatusIcon={true}
                    variant="primary"
                    indicator={supportThreshold}
                />
                <ProposalVotingProgress.Item
                    name="Minimum participation"
                    value={currentParticipationPercentage}
                    description={{
                        value: formattedTotalVotes,
                        text: `of ${formattedMinParticipationToken} ${tokenSymbol}`,
                    }}
                    showPercentage={true}
                    showStatusIcon={true}
                    variant="neutral"
                />
            </ProposalVotingProgress.Container>
        </Tabs.Content>
    );
};
