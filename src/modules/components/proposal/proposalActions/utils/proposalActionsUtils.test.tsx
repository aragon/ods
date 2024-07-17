import { render, screen } from '@testing-library/react';
import { generateProposalActionGeneric } from '../actions/generators/proposalActionGeneric';
import { generateProposalActionWithdrawToken } from '../actions/generators/proposalActionWithdrawToken';
import { proposalActionsUtils } from './proposalActionsUtils';

jest.mock('../actions/proposalActionWithdrawToken/proposalActionWithdrawToken', () => ({
    ProposalActionWithdrawToken: jest.fn(() => <div>Mock ProposalActionWithdrawToken</div>),
}));

describe('ProposalActionsUtils', () => {
    it('returns ProposalActionWithdrawToken component for withdrawToken action', () => {
        const action = generateProposalActionWithdrawToken();

        const Component = proposalActionsUtils.getActionComponent(action) as React.ComponentType;
        render(<Component />);
        expect(screen.getByText('Mock ProposalActionWithdrawToken')).toBeInTheDocument();
    });

    it('returns null for unknown action type', () => {
        const action = generateProposalActionGeneric();

        const Component = proposalActionsUtils.getActionComponent(action);
        expect(Component).toBeNull();
    });
});
