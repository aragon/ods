import { ProposalActionTokenMint, ProposalActionUpdateMetadata, ProposalActionWithdrawToken } from './actions';
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

    isTokenMintAction = (action: Partial<IProposalAction>): action is IProposalActionTokenMint => {
        return action.type === ProposalActionType.TOKEN_MINT;
    };
}

export const proposalActionsUtils = new ProposalActionsUtils();
