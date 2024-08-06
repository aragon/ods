import type { TagVariant } from '../../../core';

export type ProposalStatus =
    | 'accepted'
    | 'active'
    | 'challenged'
    | 'draft'
    | 'executed'
    | 'expired'
    | 'failed'
    | 'partiallyExecuted'
    | 'pending'
    | 'queued'
    | 'rejected'
    | 'vetoed';

export const proposalStatusToTagVariant: Record<ProposalStatus, TagVariant> = {
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
