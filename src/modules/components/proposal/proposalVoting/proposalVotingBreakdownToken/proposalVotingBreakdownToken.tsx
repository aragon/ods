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

    const optionValues = [
        { name: 'Yes', value: Number(totalYes), variant: 'success' },
        { name: 'Abstain', value: Number(totalAbstain), variant: 'neutral' },
        { name: 'No', value: Number(totalNo), variant: 'critical' },
    ] as const;

    const totalSupplyNumber = Number(tokenTotalSupply);

    const totalVotes = optionValues.reduce((accumulator, option) => accumulator + option.value, 0);
    const formattedTotalVotes = formatterUtils.formatNumber(totalVotes, { format: NumberFormat.GENERIC_SHORT });

    const minParticipationToken = (totalSupplyNumber * minParticipation) / 100;
    const formattedMinParticipationToken = formatterUtils.formatNumber(minParticipationToken, {
        format: NumberFormat.GENERIC_SHORT,
    });

    const winningOption = Math.max(...optionValues.map((option) => option.value));
    const winningOptionPercentage = (winningOption / totalVotes) * 100;
    const formattedWinninOption = formatterUtils.formatNumber(winningOption, { format: NumberFormat.GENERIC_SHORT });

    const currentParticipationPercentage = (totalVotes / totalSupplyNumber) * 100;

    const supportReached = winningOptionPercentage > supportThreshold;
    const minParticipationReached = currentParticipationPercentage > minParticipation;

    return (
        <Tabs.Content
            value={ProposalVotingTab.BREAKDOWN}
            className={classNames('flex flex-col gap-4', className)}
            {...otherProps}
        >
            <ProposalVotingProgress.Container direction="row">
                {optionValues.map(({ name, variant, value }) => (
                    <ProposalVotingProgress.Item
                        key={name}
                        name={name}
                        value={(value / totalVotes) * 100}
                        indicator={supportThreshold}
                        description={{
                            value: formatterUtils.formatNumber(value, { format: NumberFormat.GENERIC_SHORT }),
                            text: tokenSymbol,
                        }}
                        variant={variant}
                    />
                ))}
            </ProposalVotingProgress.Container>
            <ProposalVotingProgress.Container direction="col">
                <ProposalVotingProgress.Item
                    name="Support"
                    value={winningOptionPercentage}
                    description={{ value: formattedWinninOption, text: `of ${formattedTotalVotes} ${tokenSymbol}` }}
                    showPercentage={true}
                    showStatusIcon={true}
                    variant={supportReached ? 'primary' : 'neutral'}
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
                    variant={minParticipationReached ? 'primary' : 'neutral'}
                    indicator={minParticipation}
                />
            </ProposalVotingProgress.Container>
        </Tabs.Content>
    );
};
