import { AvatarIcon, IconType, Tag, type TagVariant } from '../../../../../core';
import { type IProposalDataListItemProps, type ProposalDataListItemStatusType } from '../proposalDataListItemApi';

export interface IProposalDataListItemStatusProps
    extends Pick<IProposalDataListItemProps, 'date' | 'status' | 'voted'> {}

const statusToTagVariant: Record<ProposalDataListItemStatusType, TagVariant> = {
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

/**
 * `ProposalDataListItemStatus` local component
 */
export const ProposalDataListItemStatus: React.FC<IProposalDataListItemStatusProps> = (props) => {
    const { date, status, voted } = props;

    const ongoing = status === 'active' || status === 'challenged' || status === 'vetoed';
    const ongoingAndVoted = ongoing && voted;
    const showStatusMetadata = status !== 'draft';

    let statusElement;
    if (ongoingAndVoted) {
        statusElement = <AvatarIcon icon={IconType.CHECKMARK} responsiveSize={{ md: 'md' }} />;
    } else if (ongoing && !voted) {
        // TODO: Add pulse component [APP-2983]
        statusElement = <div data-testid="pulse" />;
    } else {
        statusElement = <AvatarIcon icon={IconType.CALENDAR} responsiveSize={{ md: 'md' }} />;
    }

    return (
        <div className="flex items-center gap-x-4 md:gap-x-6">
            <Tag label={status} variant={statusToTagVariant[status]} className="shrink-0 capitalize" />
            {showStatusMetadata && (
                <div className="flex flex-1 items-center justify-end gap-x-2 md:gap-x-3">
                    <span className="text-sm leading-tight text-neutral-800 md:text-base">
                        {/* TODO: apply internationalization [APP-2627]; apply relative date formatter  [APP-2944] */}
                        {ongoingAndVoted ? "You've voted" : date}
                    </span>
                    {statusElement}
                </div>
            )}
        </div>
    );
};
