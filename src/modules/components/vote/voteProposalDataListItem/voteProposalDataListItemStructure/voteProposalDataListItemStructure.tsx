import classNames from 'classnames';
import { DataList, Tag, type IDataListItemProps } from '../../../../../core';
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
     * Formatted date of the user's vote on the proposal
     */
    date?: string;
}

export const VoteProposalDataListItemStructure: React.FC<IVoteProposalDataListItemStructureProps> = (props) => {
    const { title, id, voteIndicator, date, className, ...otherProps } = props;

    return (
        <DataList.Item
            className={classNames('flex flex-col gap-x-3 gap-y-1 md:gap-x-4 md:gap-y-1.5 md:text-lg', className)}
            {...otherProps}
        >
            <div className="flex items-center gap-x-1 text-base font-normal leading-tight md:gap-x-1.5 md:text-lg">
                <span className="text-ellipsis whitespace-nowrap text-neutral-500">{id}</span>
                <span className="truncate text-neutral-800">{title}</span>
            </div>
            <div className="flex items-center gap-x-1 text-sm font-normal leading-tight text-neutral-500 md:gap-x-1.5 md:text-base">
                <span>Voted</span>
                <Tag
                    variant={voteIndicatorToTagVariant[voteIndicator]}
                    className="capitalize"
                    label={voteIndicator}
                    data-testid="tag"
                />
                <p className="mx-1">{date}</p>
            </div>
        </DataList.Item>
    );
};
