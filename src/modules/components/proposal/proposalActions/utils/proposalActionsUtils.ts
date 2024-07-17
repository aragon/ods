import { ProposalActionWithdrawToken } from '../actions/proposalActionWithdrawToken/proposalActionWithdrawToken';
import type { IProposalAction, IProposalActionWithdrawToken } from '../proposalActionsTypes';
import { ProposalActionType } from '../proposalActionsTypes/proposalAction';

class ProposalActionsUtils {
    public getActionComponent(action: IProposalAction) {
        if (this.isWithdrawTokenAction(action)) {
            return () => ProposalActionWithdrawToken({ action });
        }

        return null;
    }

    public isWithdrawTokenAction(action: Partial<IProposalAction>): action is IProposalActionWithdrawToken {
        return action.type === ProposalActionType.WITHDRAW_TOKEN;
    }
}

export const proposalActionsUtils = new ProposalActionsUtils();
