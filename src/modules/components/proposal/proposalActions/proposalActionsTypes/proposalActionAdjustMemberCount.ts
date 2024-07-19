import type { ICompositeAddress } from "../../../../types";
import type { IProposalAction } from "./proposalAction";

export interface IProposalActionAdjustMemberCount extends IProposalAction {
  /**
   * The members that are being added or removed
   */
  changingMembers: ICompositeAddress[];
  /**
   * The current member count
   */
  currentMemberCount: number;
  /**
   * The action to perform, either 'add' or 'remove' members
   */
  addOrRemove: 'add' | 'remove';
}