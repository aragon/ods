import classNames from 'classnames';
import { DataList, Tag, type IDataListItemProps } from '../../../../../core';
import { voteIndicatorToTagVariant } from '../../voteDataListItem/voteDataListItemStructure/voteDataListItemStructure';

export interface IVoteProposalDataListItemStructureProps extends IDataListItemProps {
    /**
     * The ID of proposal.
     */
    id: string;
    /**
     * The account details of the voter.
     */
    title: string;
    /**
     * The vote of the user.
     */
    voteIndicator: 'yes' | 'no' | 'abstain' | 'approve';
    // TO-DO: implement formatter decision
    /**
     * The Unix timestamp of the transaction.
     */
    date?: string;
}

export const VoteProposalDataListItemStructure: React.FC<IVoteProposalDataListItemStructureProps> = (props) => {
    const { title, id, voteIndicator, date, className, ...otherProps } = props;

    return (
        <DataList.Item className={classNames('flex items-center gap-x-3 md:gap-x-4', className)} {...otherProps}>
            <div className="flex w-full flex-col gap-y-1 md:gap-y-1.5 md:text-lg">
                <div className="flex items-center gap-x-1 text-base font-normal leading-tight md:gap-x-1.5 md:text-lg">
                    <span className="text-ellipsis whitespace-nowrap text-neutral-500">{id}</span>
                    <span className="truncate text-neutral-800">{title}</span>
                </div>
                <div className="flex items-center gap-x-1 text-sm font-normal leading-tight text-neutral-500 md:gap-x-1.5 md:text-base">
                    {voteIndicator && (
                        <>
                            <span>Voted</span>
                            <Tag
                                variant={voteIndicatorToTagVariant[voteIndicator]}
                                className="capitalize"
                                label={voteIndicator}
                                data-testid="tag"
                            />
                        </>
                    )}
                    <p className="mx-1">{date}</p>
                </div>
            </div>
        </DataList.Item>
    );
};
