import { render, screen } from '@testing-library/react';
import { generateProposalActionWithdrawToken } from './actions/generators/proposalActionWithdrawToken';
import { proposalActionsUtils } from './proposalActionsUtils';
import { generateProposalAction } from './actions/generators/proposalAction';


jest.mock('./actions', () => ({
    ProposalActionWithdrawToken: () => <div>Mock ProposalActionWithdrawToken</div>,
}));

describe('ProposalActions utils', () => {
    it('returns ProposalActionWithdrawToken component for withdrawToken action', () => {
        const action = generateProposalActionWithdrawToken();

        const Component = proposalActionsUtils.getActionComponent(action)!;
        render(<Component action={action} />);
        expect(screen.getByText('Mock ProposalActionWithdrawToken')).toBeInTheDocument();
    });

    it('returns null for unknown action type', () => {
        const action = generateProposalAction();

        const Component = proposalActionsUtils.getActionComponent(action);
        expect(Component).toBeNull();
    });
});
