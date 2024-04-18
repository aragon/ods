import { Progress } from '../../../../../core';
import { type IMajorityVotingResult } from '../proposalDataListItemStructure';

export interface IMajorityVotingResultProps extends IMajorityVotingResult {}

/**
 * `MajorityVotingResult` component
 */
export const MajorityVotingResult: React.FC<IMajorityVotingResultProps> = (props) => {
    const { option, stageId, stageTitle, voteAmount, votePercentage } = props;

    return (
        // TODO: apply internationalization to Winning Option and Stage [APP-2627]
        <div className="flex w-full flex-col gap-y-2 rounded-xl border border-neutral-100 bg-neutral-0 px-4 py-3 shadow-neutral-sm md:gap-y-3 md:px-6 md:py-5">
            <div className="flex flex-1 gap-x-4 leading-tight text-neutral-800 md:gap-x-6 md:text-lg">
                <span className="line-clamp-1 flex-1">{stageTitle ?? 'Winning Option'}</span>
                {stageId == null && <span className="text-primary-400">{`${votePercentage}%`}</span>}
                {stageId != null && (
                    <span className="flex shrink-0 gap-x-0.5 text-right">
                        <span className="flex-1 text-neutral-500">Stage</span>
                        {stageId}
                    </span>
                )}
            </div>
            <Progress value={votePercentage} />
            <div className="flex gap-x-4 leading-tight md:gap-x-6 md:text-lg">
                <span className="capitalize text-primary-400">{option}</span>
                <span className="flex-1 text-right text-neutral-500">{voteAmount}</span>
            </div>
        </div>
    );
};
