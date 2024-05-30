import {
    DataList,
    NumberFormat,
    Tag,
    formatterUtils,
    type IDataListItemProps,
    type TagVariant,
} from '../../../../../core';
import { type ICompositeAddress } from '../../../../types';
import { addressUtils } from '../../../../utils';
import { MemberAvatar } from '../../../member';

export interface IVoteDataListItemStructureProps extends IDataListItemProps {
    /**
     * The account details of the voter.
     */
    voter: ICompositeAddress;
    /**
     * The amount of tokens voted.
     */
    voteTokenAmount?: number | string;
    /**
     * The symbol of the token voted.
     */
    voteTokenSymbol?: string;
    /**
     * The way the voter used their voting power.
     */
    voteIndicator: 'yes' | 'no' | 'abstain';
}

const voteIndicatorToTagVariant: Record<IVoteDataListItemStructureProps['voteIndicator'], TagVariant> = {
    yes: 'success',
    no: 'critical',
    abstain: 'neutral',
};

export const VoteDataListItemStructure: React.FC<IVoteDataListItemStructureProps> = (props) => {
    const { voter = { address: '', name: '' }, voteTokenAmount, voteTokenSymbol, voteIndicator, ...otherProps } = props;
    const resolvedUserHandle =
        voter.name != null && voter.name !== '' ? voter.name : addressUtils.truncateAddress(voter.address);

    const formattedTokenNumber = formatterUtils.formatNumber(voteTokenAmount, {
        format: NumberFormat.TOKEN_AMOUNT_SHORT,
        fallback: '-',
    });
    const formattedTokenVote = `${formattedTokenNumber} ${voteTokenSymbol}`;

    return (
        <DataList.Item className="flex items-center gap-x-3 md:gap-x-4" {...otherProps}>
            <MemberAvatar address={voter.address} ensName={voter.name} responsiveSize={{ md: 'md' }} />
            <div className="flex w-full flex-col gap-y-1 text-base font-normal leading-tight md:gap-y-1.5 md:text-lg">
                <span className="text-neutral-800">{resolvedUserHandle}</span>
                <span className="text-neutral-500">{formattedTokenVote}</span>
            </div>
            {voteIndicator && (
                <Tag variant={voteIndicatorToTagVariant[voteIndicator]} className="capitalize" label={voteIndicator} />
            )}
        </DataList.Item>
    );
};
