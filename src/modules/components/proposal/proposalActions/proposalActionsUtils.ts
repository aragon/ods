import { ProposalActionWithdrawToken } from './actions';
import { ProposalActionChangeMembers } from './actions/proposalActionChangeMembers/proposalActionChangeMembers';

import {
    type IProposalAction,
    type IProposalActionChangeMembers,
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

        if (this.isChangeMembers(action)) {
            return ProposalActionChangeMembers;
        }

        return null;
    };

    public isWithdrawTokenAction = (action: Partial<IProposalAction>): action is IProposalActionWithdrawToken => {
        return action.type === ProposalActionType.WITHDRAW_TOKEN;
    };

    public isChangeMembers = (action: Partial<IProposalAction>): action is IProposalActionChangeMembers => {
        return action.type === ProposalActionType.ADD_MEMBERS || action.type === ProposalActionType.REMOVE_MEMBERS;
    };
}

export const proposalActionsUtils = new ProposalActionsUtils();
