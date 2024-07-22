import { ProposalActionWithdrawToken } from './actions';
import { type IProposalAction, type IProposalActionWithdrawToken, ProposalActionType } from './proposalActionsTypes';

class ProposalActionsUtils {
    getActionComponent = (
        action: IProposalAction,
        customComponents?: Record<string, React.ComponentType<{ action: IProposalAction }>>,
    ) => {
        if (customComponents?.[action.type]) {
            return customComponents[action.type];
        }

        if (this.isWithdrawTokenAction(action)) {
            return () => ProposalActionWithdrawToken({ action });
        }

        return null;
    };

    isWithdrawTokenAction = (action: Partial<IProposalAction>): action is IProposalActionWithdrawToken => {
        return action.type === ProposalActionType.WITHDRAW_TOKEN;
    };
}

export const proposalActionsUtils = new ProposalActionsUtils();
