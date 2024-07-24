import { ProposalActionTokenMint, ProposalActionWithdrawToken } from './actions';
import { ProposalActionChangeMembers } from './actions/proposalActionChangeMembers';
import {
    type IProposalAction,
    type IProposalActionChangeMembers,
    type IProposalActionTokenMint,
    type IProposalActionWithdrawToken,
    ProposalActionType,
} from './proposalActionsTypes';

class ProposalActionsUtils {
    getActionComponent = (action: IProposalAction) => {
        if (this.isWithdrawTokenAction(action)) {
            return () => ProposalActionWithdrawToken({ action });
        } else if (this.isTokenMintAction(action)) {
            return () => ProposalActionTokenMint({ action });
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

    isTokenMintAction = (action: Partial<IProposalAction>): action is IProposalActionTokenMint => {
        return action.type === ProposalActionType.TOKEN_MINT;
    };
}

export const proposalActionsUtils = new ProposalActionsUtils();
