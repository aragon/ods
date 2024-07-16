import { ProposalActionsAction } from './proposalActionsAction';
import { ProposalActionsContainer } from './proposalActionsContainer';

export const ProposalActions = {
    Container: ProposalActionsContainer,
    Action: ProposalActionsAction,
};

export * from './actions';
export * from './proposalActionsContext';
export * from './proposalActionsTypes';
