import { ProposalActionTokenMint, ProposalActionWithdrawToken } from './actions';
import {
    type IProposalAction,
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

        return null;
    };

    isWithdrawTokenAction = (action: Partial<IProposalAction>): action is IProposalActionWithdrawToken => {
        return action.type === ProposalActionType.WITHDRAW_TOKEN;
    };

    isTokenMintAction = (action: Partial<IProposalAction>): action is IProposalActionTokenMint => {
        return action.type === ProposalActionType.TOKEN_MINT;
    };
}

export const proposalActionsUtils = new ProposalActionsUtils();
