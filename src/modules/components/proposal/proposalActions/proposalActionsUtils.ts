import { ProposalActionWithdrawToken } from './actions';
import { type IProposalAction, IProposalActionAdjustMemberCount, type IProposalActionWithdrawToken, ProposalActionType } from './proposalActionsTypes';
import type { ReactComponentLike } from 'prop-types';

class ProposalActionsUtils {
    private actionComponentsMap: Record<string, ReactComponentLike> = {
        [ProposalActionType.WITHDRAW_TOKEN]: ProposalActionWithdrawToken,
    };

    getActionComponent = (action: IProposalAction, customComponents?: Record<string, React.ComponentType<{ action: IProposalAction }>>) => {
        if (customComponents?.[action.type]) {
            return customComponents[action.type];
        }

        if (this.isWithdrawTokenAction(action)) {
            return this.actionComponentsMap[ProposalActionType.WITHDRAW_TOKEN];
        }

        if (this.isAdjustMemberCountAction(action)) {
            return this.actionComponentsMap[ProposalActionType.ADJUST_MEMBER_COUNT];
        }

        return null;
    };

    isWithdrawTokenAction = (action: Partial<IProposalAction>): action is IProposalActionWithdrawToken => {
        return action.type === ProposalActionType.WITHDRAW_TOKEN;
    };

    isAdjustMemberCountAction = (action: Partial<IProposalAction>): action is IProposalActionAdjustMemberCount => {
        return action.type === ProposalActionType.ADJUST_MEMBER_COUNT;
    };
}

export const proposalActionsUtils = new ProposalActionsUtils();
