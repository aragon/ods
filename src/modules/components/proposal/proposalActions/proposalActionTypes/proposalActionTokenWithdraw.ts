import type { ICompositeAddress } from "../../../../types";
import type { IProposalAction } from "./proposalAction";


export interface IProposalActionWithdrawToken extends IProposalAction {
  /**
   * Withdraw token action
   */
  type: 'withdrawToken';
  /**
   * Sender address, object with address and optional ensName
   */
  sender: ICompositeAddress;
  /**
   * Receiver address, object with address and optional ensName
   */
  receiver: ICompositeAddress;
  /**
   * Amount to withdraw
   */
  amount: string;
  /**
   * Token details of the token to withdraw
   */
  token: {
    /**
     * Token name
     */
    name: string;
    /**
     * Token symbol
     */
    symbol: string;
    /**
     * Token decimals
     */
    decimals: number;
    /**
     * Token logo
     */
    logo: string;
    /**
     * Token price in USD
     */
    priceUsd: string;
  };
}
