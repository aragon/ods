import { Progress, formatterUtils } from '../../../../../core';
import { type IApprovalThresholdResultProps, type IMajorityVotingResultProps } from '../proposalDataListItemApi';

export type IProposalDataListItemResultProps = IApprovalThresholdResultProps | IMajorityVotingResultProps;

/**
 * `ProposalDataListItemResult` component
 */
export const ProposalDataListItemResult: React.FC<IProposalDataListItemResultProps> = (props) => {
    const containerClasses =
        'w-full flex flex-col gap-y-2 rounded-xl border border-neutral-100 bg-neutral-0 px-4 py-3 shadow-neutral-sm md:gap-y-3 md:px-6 md:py-5';
    const headerClasses = 'flex flex-1 gap-x-4 leading-tight text-neutral-800 md:gap-x-6 md:text-lg';

    if (props.type === 'majorityVoting') {
        const { option, voteAmount, votePercentage } = props;

        return (
            // TODO: apply internationalization to Winning Option [APP-2627]
            <div className={containerClasses}>
                <div className={headerClasses}>
                    <span className="flex-1">Winning Option</span>
                    <span className="text-primary-400">{`${votePercentage}%`}</span>
                </div>
                <Progress value={votePercentage} />
                <div className="flex gap-x-4 leading-tight md:gap-x-6 md:text-lg">
                    <span className="capitalize text-primary-400">{option}</span>
                    <span className="flex-1 text-right text-neutral-500">{voteAmount}</span>
                </div>
            </div>
        );
    } else if (props.type === 'approvalThreshold') {
        const { approvalAmount, approvalThreshold } = props;
        const percentage = Math.min((approvalAmount / approvalThreshold) * 100, 100);

        return (
            //  TODO: apply internationalization to Approved By, of, and Members [APP-2627]
            <div className={containerClasses}>
                <div className={headerClasses}>
                    <span className="flex-1">Approved By</span>
                </div>
                <Progress value={percentage} />
                <div className="flex gap-x-0.5 leading-tight text-neutral-500 md:gap-x-1 md:text-lg">
                    <span className="text-primary-400">{formatterUtils.formatNumber(approvalAmount)}</span>
                    <span>of</span>
                    <span>{formatterUtils.formatNumber(approvalThreshold)}</span>
                    <span>Members</span>
                </div>
            </div>
        );
    }

    return null;
};
