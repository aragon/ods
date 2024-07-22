import type { ICompositeAddress } from '../../../../types';
import type { IProposalAction } from './proposalAction';
import type { ProposalActionType } from './ProposalActionType';

export interface IProposalActionAdjustMemberCount extends IProposalAction {
    /**
     * Adjust member count action
     */
    type: ProposalActionType.ADJUST_MEMBER_COUNT;
    /**
     * The members that are being added or removed
     */
    changingMembers: ICompositeAddress[];
    /**
     * The current member count
     */
    currentMemberCount: number;
    /**
     * The action to perform, either 'add' or 'remove' members
     */
    addOrRemove: 'add' | 'remove';
}
