import { type ICompositeAddress } from '../../../../types';
import type { IProposalAction } from './proposalAction';
import { type ProposalActionType } from './proposalActionType';

export interface IProposalActionTokenMintMetadataReceiver extends ICompositeAddress {
    /**
     * Receivers current token balance.
     */
    currentBalance: string;
    /**
     * Receivers new token balance after mint.
     */
    newBalance: string;
}

export interface IProposalActionTokenMint extends IProposalAction {
    /**
     * Token mint action.
     */
    type: ProposalActionType.TOKEN_MINT;
    /**
     * Token receivers.
     */
    receiver: IProposalActionTokenMintMetadataReceiver;
    /**
     * Token Symbol.
     */
    tokenSymbol: string;
}
