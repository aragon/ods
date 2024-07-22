import { ProposalActionWithdrawToken } from './actions';
import { ProposalActionAdjustMemberCount } from './actions/proposalActionAdjustMemberCount';
import {
    type IProposalAction,
    type IProposalActionAdjustMemberCount,
    type IProposalActionWithdrawToken,
    ProposalActionType,
} from './proposalActionsTypes';

class ProposalActionsUtils {
    getActionComponent = (
        action: IProposalAction,
        customComponents?: Record<string, React.ComponentType<{ action: IProposalAction }>>,
    ) => {
        if (customComponents?.[action.type]) {
            return customComponents[action.type];
        }

        if (this.isWithdrawTokenAction(action)) {
            return ProposalActionWithdrawToken;
        }

        if (this.isAdjustMemberCountAction(action)) {
            return ProposalActionAdjustMemberCount;
        }

        return null;
    };

    public isWithdrawTokenAction = (action: Partial<IProposalAction>): action is IProposalActionWithdrawToken => {
        return action.type === ProposalActionType.WITHDRAW_TOKEN;
    };

    public isAdjustMemberCountAction = (
        action: Partial<IProposalAction>,
    ): action is IProposalActionAdjustMemberCount => {
        return action.type === ProposalActionType.ADJUST_MEMBER_COUNT;
    };
}

export const proposalActionsUtils = new ProposalActionsUtils();
