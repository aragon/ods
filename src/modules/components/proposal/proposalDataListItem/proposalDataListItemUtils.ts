import type { ProposalStatus } from '../proposalUtils';

class ProposalDataListItemUtils {
    ongoingStatuses: ProposalStatus[] = ['active', 'challenged', 'vetoed'];

    isOngoingStatus = (status: ProposalStatus) => this.ongoingStatuses.includes(status);
}

export const proposalDataListItemUtils = new ProposalDataListItemUtils();
