import {
    ProposalActionChangeMembers,
    ProposalActionTokenMint,
    ProposalActionUpdateMetadata,
    ProposalActionWithdrawToken,
    ProposalActionChangeSettings,
} from './actions';
import {
    type IProposalAction,
    type IProposalActionChangeMembers,
    type IProposalActionTokenMint,
    type IProposalActionUpdateMetadata,
    type IProposalActionWithdrawToken,
    type IProposalActionChangeSettings,
    ProposalActionType,
} from './proposalActionsTypes';

class ProposalActionsUtils {
    getActionComponent = (action: IProposalAction) => {
        if (this.isWithdrawTokenAction(action)) {
            return () => ProposalActionWithdrawToken({ action });
        } else if (this.isTokenMintAction(action)) {
            return () => ProposalActionTokenMint({ action });
        } else if (this.isUpdateMetadataAction(action)) {
            return () => ProposalActionUpdateMetadata({ action });
        } else if (this.isChangeMembersAction(action)) {
            return () => ProposalActionChangeMembers({ action });
        } else if (this.isChangeSettingsAction(action)) {
            return () => ProposalActionChangeSettings({ action });
        }

        return null;
    };

    isWithdrawTokenAction = (action: Partial<IProposalAction>): action is IProposalActionWithdrawToken => {
        return action.type === ProposalActionType.WITHDRAW_TOKEN;
    };

    isChangeMembersAction = (action: Partial<IProposalAction>): action is IProposalActionChangeMembers => {
        return action.type === ProposalActionType.ADD_MEMBERS || action.type === ProposalActionType.REMOVE_MEMBERS;
    };

    isUpdateMetadataAction = (action: Partial<IProposalAction>): action is IProposalActionUpdateMetadata => {
        return action.type === ProposalActionType.UPDATE_METADATA;
    };

    isTokenMintAction = (action: Partial<IProposalAction>): action is IProposalActionTokenMint => {
        return action.type === ProposalActionType.TOKEN_MINT;
    };

    isChangeSettingsAction = (action: Partial<IProposalAction>): action is IProposalActionChangeSettings => {
        return (
            action.type === ProposalActionType.CHANGE_SETTINGS_MULTISIG ||
            action.type === ProposalActionType.CHANGE_SETTINGS_TOKENVOTE
        );
    }
}

export const proposalActionsUtils = new ProposalActionsUtils();
