import { ProposalActionWithdrawToken } from './actions';
import { ProposalActionUpdateMetadata } from './actions/proposalActionUpdateMetadata';
import { type IProposalAction, type IProposalActionUpdateMetadata, type IProposalActionWithdrawToken, ProposalActionType } from './proposalActionsTypes';

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

        if (this.isUpdateMetadataAction(action)) {
            return () => ProposalActionUpdateMetadata({ action })
        }

        return null;
    };

    isWithdrawTokenAction = (action: Partial<IProposalAction>): action is IProposalActionWithdrawToken => {
        return action.type === ProposalActionType.WITHDRAW_TOKEN;
    };

    isUpdateMetadataAction = (action: Partial<IProposalAction>): action is IProposalActionUpdateMetadata => {
        return action.type === ProposalActionType.UPDATE_METADATA
    }
}

export const proposalActionsUtils = new ProposalActionsUtils();
