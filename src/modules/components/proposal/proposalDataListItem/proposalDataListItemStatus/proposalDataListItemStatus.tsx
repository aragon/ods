import classNames from 'classnames';
import {
    AvatarIcon,
    IconType,
    StatePingAnimation,
    Tag,
    type StatePingAnimationVariant,
    type TagVariant,
} from '../../../../../core';
import { useOdsModulesContext } from '../../../odsModulesProvider';
import { type IProposalDataListItemStructureProps, type ProposalStatus } from '../proposalDataListItemStructure';

export interface IProposalDataListItemStatusProps
    extends Pick<IProposalDataListItemStructureProps, 'date' | 'status' | 'voted'> {}

const statusToTagVariant: Record<ProposalStatus, TagVariant> = {
    accepted: 'success',
    active: 'info',
    challenged: 'warning',
    draft: 'neutral',
    executed: 'success',
    expired: 'critical',
    failed: 'critical',
    partiallyExecuted: 'warning',
    pending: 'neutral',
    queued: 'success',
    rejected: 'critical',
    vetoed: 'warning',
};

type OngoingProposalStatus = 'active' | 'challenged' | 'vetoed';
const ongoingStatusToPingVariant: Record<OngoingProposalStatus, StatePingAnimationVariant> = {
    active: 'info',
    challenged: 'warning',
    vetoed: 'warning',
};

/**
 * `ProposalDataListItemStatus` local component
 */
export const ProposalDataListItemStatus: React.FC<IProposalDataListItemStatusProps> = (props) => {
    const { date, status, voted } = props;

    const ongoing = status === 'active' || status === 'challenged' || status === 'vetoed';
    const ongoingAndVoted = ongoing && voted;
    const showStatusMetadata = status !== 'draft';

    const { copy } = useOdsModulesContext();

    return (
        <div className="flex items-center gap-x-4 md:gap-x-6">
            <Tag label={status} variant={statusToTagVariant[status]} className="shrink-0 capitalize" />
            {showStatusMetadata && (
                <div className="flex flex-1 items-center justify-end gap-x-2 md:gap-x-3">
                    <span
                        className={classNames('text-sm leading-tight md:text-base', {
                            'text-info-800': status === 'active',
                            'text-warning-800': status === 'challenged' || status === 'vetoed',
                            'text-neutral-800': ongoing === false,
                        })}
                    >
                        {ongoingAndVoted ? copy.proposalDataListItemStatus.voted : date}
                    </span>
                    {ongoingAndVoted && <AvatarIcon icon={IconType.CHECKMARK} responsiveSize={{ md: 'md' }} />}
                    {ongoing && !voted && <StatePingAnimation variant={ongoingStatusToPingVariant[status]} />}
                    {!ongoing && !voted && date && (
                        <AvatarIcon icon={IconType.CALENDAR} responsiveSize={{ md: 'md' }} />
                    )}
                </div>
            )}
        </div>
    );
};
