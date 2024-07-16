import { ProposalActionWithdrawToken } from "../actions/proposalActionWithdrawToken/proposalActionWithdrawToken";
import type { IProposalActionWithdrawToken, IProposalAction } from "../proposalActionTypes";



class ProposalActionsUtils {
  public getActionComponent(action: IProposalAction) {
    if (this.isWithdrawTokenAction(action)) {
      return () => ProposalActionWithdrawToken({ action });
    }
    
    return null;
  }

  public isWithdrawTokenAction(action: Partial<IProposalAction>): action is IProposalActionWithdrawToken {
    return action.type === 'withdrawToken';
  }

}

export const proposalActionsUtils = new ProposalActionsUtils();
