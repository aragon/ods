
import ProposalActionAdjustMemberCount from '../actions/proposalActionAdjustMemberCount/proposalActionAdjustMemberCount';
import { ProposalActionWithdrawToken } from '../actions/proposalActionWithdrawToken/proposalActionWithdrawToken';
import type { IProposalAction, IProposalActionAdjustMemberCount, IProposalActionWithdrawToken } from '../proposalActionsTypes';
import { ProposalActionType } from '../proposalActionsTypes/proposalAction';

class ProposalActionsUtils {
    public getActionComponent(action: IProposalAction) {
        if (this.isWithdrawTokenAction(action)) {
            return () => ProposalActionWithdrawToken({ action });
        }
        if (this.isAdjustMemberCountAction(action)) {
            return () => ProposalActionAdjustMemberCount({ action });
        }

        return null;
    }

    public isWithdrawTokenAction(action: Partial<IProposalAction>): action is IProposalActionWithdrawToken {
        return action.type === ProposalActionType.WITHDRAW_TOKEN;
    }
    
    public isAdjustMemberCountAction(action: Partial<IProposalAction>): action is IProposalActionAdjustMemberCount {
        return action.type === ProposalActionType.ADJUST_MEMBER_COUNT;
    }
}

export const proposalActionsUtils = new ProposalActionsUtils();
