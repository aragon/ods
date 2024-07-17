import { render, screen } from '@testing-library/react';
import type { IProposalAction, IProposalActionWithdrawToken } from '../proposalActionsTypes';
import { proposalActionsUtils } from './proposalActionsUtils';

jest.mock('../actions/proposalActionWithdrawToken/proposalActionWithdrawToken', () => ({
    ProposalActionWithdrawToken: jest.fn(() => <div>Mock ProposalActionWithdrawToken</div>),
}));

describe('ProposalActionsUtils', () => {
    it('returns ProposalActionWithdrawToken component for withdrawToken action', () => {
        const action: IProposalActionWithdrawToken = {
            type: 'withdrawToken',
            sender: { address: '0xSender' },
            receiver: { address: '0xReceiver' },
            amount: '100',
            token: {
                name: 'TokenName',
                symbol: 'TKN',
                decimals: 18,
                logo: 'logo.png',
                priceUsd: '1.00',
                address: '0xTokenAddress',
            },
            contractAddress: '0xContract',
            from: '0xFrom',
            to: '0xTo',
            data: '',
            value: '0',
            inputData: null,
        };

        const Component = proposalActionsUtils.getActionComponent(action) as React.ComponentType;
        render(<Component />);
        expect(screen.getByText('Mock ProposalActionWithdrawToken')).toBeInTheDocument();
    });

    it('returns null for unknown action type', () => {
        const action: IProposalAction = {
            type: 'unknownType',
            contractAddress: '0xContract',
            from: '0xFrom',
            to: '0xTo',
            data: '',
            value: '0',
            inputData: null,
        };

        const Component = proposalActionsUtils.getActionComponent(action);
        expect(Component).toBeNull();
    });
});
