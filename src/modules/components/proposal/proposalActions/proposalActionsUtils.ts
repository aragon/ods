import { ProposalActionUpdateMetadata, ProposalActionWithdrawToken } from './actions';
import {
    ProposalActionType,
    type IProposalAction,
    type IProposalActionUpdateMetadata,
    type IProposalActionWithdrawToken,
} from './proposalActionsTypes';

class ProposalActionsUtils {
    getActionComponent = (action: IProposalAction) => {
        if (this.isWithdrawTokenAction(action)) {
            return () => ProposalActionWithdrawToken({ action });
        }

        if (this.isUpdateMetadataAction(action)) {
            return () => ProposalActionUpdateMetadata({ action });
        }

        return null;
    };

    isWithdrawTokenAction = (action: Partial<IProposalAction>): action is IProposalActionWithdrawToken => {
        return action.type === ProposalActionType.WITHDRAW_TOKEN;
    };

    isUpdateMetadataAction = (action: Partial<IProposalAction>): action is IProposalActionUpdateMetadata => {
        return action.type === ProposalActionType.UPDATE_METADATA;
    };
}

export const proposalActionsUtils = new ProposalActionsUtils();
