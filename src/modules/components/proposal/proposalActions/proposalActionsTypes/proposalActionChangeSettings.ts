import { type ICompositeAddress } from '../../../../types';
import { type IProposalAction } from './proposalAction';
import { type ProposalActionType } from './proposalActionType';

export interface ISetting {
    /**
     * Setting name as term.
     */
    term: string;
    /**
     * Definition of the proposed setting change.
     */
    definition: React.ReactNode;
}

export interface IProposalActionChangeSettingsMultisigSettings {
    /**
     * Current threshold of member approvals necessary for passing a proposal.
     */
    threshold: number;
    /**
     * Number of current members.
     */
    currentMembers: number;
    /**
     * Multisig members who can propose actions.
     */
    proposers: ICompositeAddress[];
    /**
     * Additional settings of the proposal action can be customized.
     */
    additionalSettings?: ISetting[];
}

export interface IProposalActionChangeSettingsTokenVoteSettings {
    /**
     * Token Symbol.
     */
    tokenSymbol: string;
    /**
     * Current threshold of member approvals necessary for passing a proposal.
     */
    supportThreshold: number | string;
    /**
     * Minimum DAO token balance for member to make proposal.
     */
    proposalThreshold: number | string;
    /**
     * Minimum duration of the proposal voting period. DD HH MM
     */
    minimumDuration: number | string;
    /**
     * Whether proposal can execute once support threshold is achieved.
     */
    earlyExecution: boolean;
    /**
     * Whether voters can change their choice.
     */
    voteChanges: boolean;
    /**
     * Additional settings of the proposal action can be customized.
     */
    additionalSettings?: ISetting[];
}

export interface IProposalActionChangeSettingsMultisig extends IProposalAction {
    /**
     * Change settings action type.
     */
    type: ProposalActionType.CHANGE_SETTINGS_MULTISIG;
    /**
     * Existing settings of the proposal action.
     */
    existingSettings: IProposalActionChangeSettingsMultisigSettings;
    /**
     * Proposed settings of the proposal action.
     */
    proposedSettings: IProposalActionChangeSettingsMultisigSettings;
}

export interface IProposalActionChangeSettingsTokenVote extends IProposalAction {
    /**
     * Change settings action type.
     */
    type: ProposalActionType.CHANGE_SETTINGS_TOKENVOTE;
    /**
     * Existing settings of the proposal action.
     */
    existingSettings: IProposalActionChangeSettingsTokenVoteSettings;
    /**
     * Proposed settings of the proposal action.
     */
    proposedSettings: IProposalActionChangeSettingsTokenVoteSettings;
}

export type IProposalActionChangeSettings =
    | IProposalActionChangeSettingsMultisig
    | IProposalActionChangeSettingsTokenVote;
