import { ProposalActionWithdrawToken } from './actions';
import { ProposalActionChangeMembers } from './actions/proposalActionChangeMembers';
import {
    type IProposalAction,
    type IProposalActionChangeMembers,
    type IProposalActionWithdrawToken,
    ProposalActionType,
} from './proposalActionsTypes';

class ProposalActionsUtils {
    getActionComponent = (action: IProposalAction) => {
        if (this.isWithdrawTokenAction(action)) {
            return () => ProposalActionWithdrawToken({ action });
        }

        if (this.isChangeMembersAction(action)) {
            return () => ProposalActionChangeMembers({ action });
        }

        return null;
    };

    isWithdrawTokenAction = (action: Partial<IProposalAction>): action is IProposalActionWithdrawToken => {
        return action.type === ProposalActionType.WITHDRAW_TOKEN;
    };

    isChangeMembersAction = (action: Partial<IProposalAction>): action is IProposalActionChangeMembers => {
        return action.type === ProposalActionType.ADD_MEMBERS || action.type === ProposalActionType.REMOVE_MEMBERS;
    };
}

export const proposalActionsUtils = new ProposalActionsUtils();
