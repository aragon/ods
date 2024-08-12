import { type ICompositeAddress } from '../../../../types';
import type { IProposalAction } from './proposalAction';
import { type ProposalActionType } from './proposalActionType';

export interface IProposalActionTokenMintMetadataReceiver extends ICompositeAddress {
    /**
     * Receivers current token balance.
     */
    currentBalance: number;
    /**
     * Receivers new token balance after mint.
     */
    newBalance: number;
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
     * Total token supply.
     */
    tokenSupply: number;
    /**
     * Holders token count.
     */
    holdersCount: number;
    /**
     * Token Symbol.
     */
    tokenSymbol: string;
}
