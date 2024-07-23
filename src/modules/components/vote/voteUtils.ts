import { type TagVariant } from '../../../core';

export type VoteIndicator = 'yes' | 'no' | 'abstain' | 'approve';

export const voteIndicatorToTagVariant: Record<VoteIndicator, TagVariant> = {
    yes: 'success',
    no: 'critical',
    abstain: 'neutral',
    approve: 'primary',
};
