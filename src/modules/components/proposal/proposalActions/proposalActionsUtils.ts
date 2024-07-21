import { ProposalActionWithdrawToken } from './actions';
import { type IProposalAction, type IProposalActionWithdrawToken, ProposalActionType } from './proposalActionsTypes';
import type { ReactComponentLike } from 'prop-types';

class ProposalActionsUtils {
    private actionComponentsMap: Record<string, ReactComponentLike> = {
        [ProposalActionType.WITHDRAW_TOKEN]: ProposalActionWithdrawToken,
        // Add other predefined action components here
    };

    getActionComponent = (action: IProposalAction, customComponents?: Record<string, React.ComponentType<{ action: IProposalAction }>>) => {
        if (customComponents?.[action.type]) {
            return customComponents[action.type];
        }

        if (this.isWithdrawTokenAction(action)) {
            return this.actionComponentsMap[ProposalActionType.WITHDRAW_TOKEN];
        }

        // Add other type guards and component mappings here if needed

        return null;
    };

    isWithdrawTokenAction = (action: Partial<IProposalAction>): action is IProposalActionWithdrawToken => {
        return action.type === ProposalActionType.WITHDRAW_TOKEN;
    };
}

export const proposalActionsUtils = new ProposalActionsUtils();
