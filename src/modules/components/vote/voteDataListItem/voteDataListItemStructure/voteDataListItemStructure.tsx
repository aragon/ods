import classNames from 'classnames';
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
     * The way the voter used their voting power.
     */
    voteIndicator: 'yes' | 'no' | 'abstain' | 'approved' | 'none';
    /**
     * If token-based voting, the amount of tokens voted.
     */
    voteTokenAmount?: number | string;
    /**
     * If token-based voting, the symbol of the token voted.
     */
    voteTokenSymbol?: string;
}

const voteIndicatorToTagVariant: Record<IVoteDataListItemStructureProps['voteIndicator'], TagVariant> = {
    yes: 'success',
    no: 'critical',
    abstain: 'neutral',
    approved: 'primary',
    none: 'neutral',
};

export const VoteDataListItemStructure: React.FC<IVoteDataListItemStructureProps> = (props) => {
    const { voter, voteTokenAmount, voteTokenSymbol, voteIndicator, ...otherProps } = props;
    const resolvedUserHandle =
        voter.name != null && voter.name !== '' ? voter.name : addressUtils.truncateAddress(voter.address);

    const formattedTokenNumber = formatterUtils.formatNumber(voteTokenAmount, {
        format: NumberFormat.TOKEN_AMOUNT_SHORT,
    });
    const formattedTokenVote = `${formattedTokenNumber} ${voteTokenSymbol}`;

    const isTokenVoting = voteTokenAmount != null && voteTokenSymbol != null;
    const centerInfoClassNames = classNames(
        'flex w-full flex-col gap-y-1 text-base font-normal leading-tight md:gap-y-1.5 md:text-lg',
        {
            'py-3.5': !isTokenVoting,
        },
    );
    return (
        <DataList.Item {...otherProps}>
            <div className="flex items-center gap-x-3 md:gap-x-4">
                <MemberAvatar address={voter.address} ensName={voter.name} responsiveSize={{ md: 'md' }} />
                <div className={centerInfoClassNames}>
                    <span className="text-neutral-800">{resolvedUserHandle}</span>
                    {isTokenVoting && <span className="text-neutral-500">{formattedTokenVote}</span>}
                </div>
                {voteIndicator && (
                    <Tag
                        variant={voteIndicatorToTagVariant[voteIndicator]}
                        className="capitalize"
                        label={voteIndicator}
                    />
                )}
            </div>
        </DataList.Item>
    );
};
