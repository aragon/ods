import type { ICompositeAddress } from '../../../../types';
import type { IProposalAction } from './proposalAction';
import type { ProposalActionType } from './proposalActionType';

export interface IProposalActionWithdrawToken extends IProposalAction {
    /**
     * Withdraw token action type.
     */
    type: ProposalActionType.WITHDRAW_TOKEN;
    /**
     * Sender handle (the DAO treasury in this case), object with address and optional ensName.
     */
    sender: ICompositeAddress;
    /**
     * Receiver handle, object with address and optional ensName.
     */
    receiver: ICompositeAddress;
    /**
     * Amount of tokens to withdraw.
     */
    amount: string;
    /**
     * Token details of the token to withdraw.
     */
    token: {
        /**
         * Token name.
         */
        name: string;
        /**
         * Token symbol.
         */
        symbol: string;
        /**
         * Token decimals.
         */
        decimals: number;
        /**
         * Token logo.
         */
        logo: string;
        /**
         * Token price in USD.
         */
        priceUsd: string;
        /**
         * Token address.
         */
        address: string;
    };
}
