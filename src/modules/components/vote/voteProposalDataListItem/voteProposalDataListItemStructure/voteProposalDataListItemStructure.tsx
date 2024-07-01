import classNames from 'classnames';
import { DataList, DateFormat, Tag, formatterUtils, type IDataListItemProps } from '../../../../../core';
import { useOdsModulesContext } from '../../../odsModulesProvider';
import { voteIndicatorToTagVariant, type VoteIndicator } from '../../voteUtils';

export interface IVoteProposalDataListItemStructureProps extends IDataListItemProps {
    /**
     * The ID of proposal.
     */
    proposalId: string;
    /**
     * The title of the proposal the user voted on.
     */
    proposalTitle: string;
    /**
     * The vote of the user.
     */
    voteIndicator: VoteIndicator;
    /**
     *  Date of the vote on the proposal in ISO format or as a timestamp
     */
    date?: number | string;
}

export const VoteProposalDataListItemStructure: React.FC<IVoteProposalDataListItemStructureProps> = (props) => {
    const { proposalTitle, proposalId, voteIndicator, date, className, ...otherProps } = props;

    const { copy } = useOdsModulesContext();

    return (
        <DataList.Item
            className={classNames('flex flex-col gap-x-3 gap-y-1 md:gap-x-4 md:gap-y-1.5 md:text-lg', className)}
            {...otherProps}
        >
            <div className="flex items-center gap-x-1 text-base font-normal leading-tight md:gap-x-1.5 md:text-lg">
                <span className="text-ellipsis whitespace-nowrap text-neutral-500">{proposalId}</span>
                <span className="truncate text-neutral-800">{proposalTitle}</span>
            </div>
            <div className="flex items-center gap-x-1 text-sm font-normal leading-tight text-neutral-500 md:gap-x-1.5 md:text-base">
                <span>{copy.voteProposalDataListItemStructure.voted}</span>
                <Tag
                    variant={voteIndicatorToTagVariant[voteIndicator]}
                    className="capitalize"
                    label={voteIndicator}
                    data-testid="tag"
                />
                {date && <p className="mx-1">{formatterUtils.formatDate(date, { format: DateFormat.RELATIVE })}</p>}
            </div>
        </DataList.Item>
    );
};
