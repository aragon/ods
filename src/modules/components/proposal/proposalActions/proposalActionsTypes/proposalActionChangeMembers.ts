import type { ICompositeAddress } from '../../../../types';
import type { IProposalAction } from './proposalAction';
import type { ProposalActionType } from './proposalActionType';

export interface IProposalActionChangeMembers extends IProposalAction {
    /**
     * Adjust member count action
     */
    type: ProposalActionType.ADD_MEMBERS | ProposalActionType.REMOVE_MEMBERS;
    /**
     * The members that are being added or removed
     */
    members: ICompositeAddress[];
    /**
     * The number of members of the DAO when the proposal is created
     */
    currentMembers: number;
}
