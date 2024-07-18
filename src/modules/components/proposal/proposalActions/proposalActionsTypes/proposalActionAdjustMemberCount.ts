import type { ICompositeAddress } from "../../../../types";
import type { IProposalAction } from "./proposalAction";

export interface IProposalActionAdjustMemberCount extends IProposalAction {
  changingMembers: ICompositeAddress[];
  currentMemberCount: number;
  addOrRemove: 'add' | 'remove';
}