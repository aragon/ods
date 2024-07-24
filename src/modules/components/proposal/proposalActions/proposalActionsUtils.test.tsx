import { render, screen } from '@testing-library/react';
import { generateProposalActionTokenMint } from './actions/generators';
import { generateProposalAction } from './actions/generators/proposalAction';
import { generateProposalActionWithdrawToken } from './actions/generators/proposalActionWithdrawToken';
import { proposalActionsUtils } from './proposalActionsUtils';

jest.mock('./actions', () => ({
    ProposalActionWithdrawToken: () => <div>Mock ProposalActionWithdrawToken</div>,
    ProposalActionTokenMint: () => <div>Mock ProposalActionTokenMint</div>,
}));

describe('ProposalActions utils', () => {
    it('returns ProposalActionWithdrawToken component for withdrawToken action', () => {
        const action = generateProposalActionWithdrawToken();

        const Component = proposalActionsUtils.getActionComponent(action)!;
        render(<Component />);
        expect(screen.getByText('Mock ProposalActionWithdrawToken')).toBeInTheDocument();
    });

    it('returns ProposalActionTokenMint component for tokenMint action', () => {
        const action = generateProposalActionTokenMint();

        const Component = proposalActionsUtils.getActionComponent(action)!;
        render(<Component />);
        expect(screen.getByText('Mock ProposalActionTokenMint')).toBeInTheDocument();
    });

    it('returns null for unknown action type', () => {
        const action = generateProposalAction();

        const Component = proposalActionsUtils.getActionComponent(action);
        expect(Component).toBeNull();
    });
});
