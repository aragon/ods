import { type ICompositeAddress } from "../../../../types";
import { type IProposalAction } from "./proposalAction";
import { type ProposalActionType } from "./proposalActionType";

export interface IProposalActionUpdateSettings extends IProposalAction {
    /**
     * Type of settings update for proposal action.
     */
    type: ProposalActionType.UPDATE_SETTINGS_MULTISIG | ProposalActionType.UPDATE_SETTINGS_TOKENVOTE;
    /**
     * Multisig threshold.
     */
    threshold: number;
    /**
     * Array of multisig owners who can make proposals.
     */
    proposers: ICompositeAddress[];
}