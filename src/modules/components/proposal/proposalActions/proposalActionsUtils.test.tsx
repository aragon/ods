import { render, screen } from '@testing-library/react';
import {
    generateProposalAction,
    generateProposalActionChangeMembers,
    generateProposalActionChangeSettings,
    generateProposalActionTokenMint,
    generateProposalActionUpdateMetadata,
    generateProposalActionWithdrawToken,
} from './actions/generators';
import { ProposalActionType } from './proposalActionsTypes';
import { proposalActionsUtils } from './proposalActionsUtils';

jest.mock('./actions', () => ({
    ProposalActionWithdrawToken: () => <div>Mock ProposalActionWithdrawToken</div>,
    ProposalActionUpdateMetadata: () => <div>Mock ProposalActionUpdateMetaData</div>,
    ProposalActionTokenMint: () => <div>Mock ProposalActionTokenMint</div>,
    ProposalActionChangeMembers: () => <div>Mock ProposalActionChangeMembers</div>,
    ProposalActionChangeSettings: () => <div>Mock ProposalActionChangeSettings</div>,
}));

describe('ProposalActions utils', () => {
    it('returns ProposalActionWithdrawToken component for withdrawToken action', () => {
        const action = generateProposalActionWithdrawToken();

        const Component = proposalActionsUtils.getActionComponent(action)!;
        render(<Component />);
        expect(screen.getByText('Mock ProposalActionWithdrawToken')).toBeInTheDocument();
    });

    it('returns ProposalActionUpdateMetadata component for updateMetadata action', () => {
        const action = generateProposalActionUpdateMetadata();

        const Component = proposalActionsUtils.getActionComponent(action)!;
        render(<Component />);
        expect(screen.getByText('Mock ProposalActionUpdateMetaData')).toBeInTheDocument();
    });

    it('returns ProposalActionTokenMint component for tokenMint action', () => {
        const action = generateProposalActionTokenMint();

        const Component = proposalActionsUtils.getActionComponent(action)!;
        render(<Component />);
        expect(screen.getByText('Mock ProposalActionTokenMint')).toBeInTheDocument();
    });

    it('returns ProposalActionChangeMembers component for addMember action', () => {
        const action = generateProposalActionChangeMembers({ type: ProposalActionType.ADD_MEMBERS });

        const Component = proposalActionsUtils.getActionComponent(action)!;
        render(<Component />);
        expect(screen.getByText('Mock ProposalActionChangeMembers')).toBeInTheDocument();
    });

    it('returns ProposalActionChangeMembers component for removeMember action', () => {
        const action = generateProposalActionChangeMembers({ type: ProposalActionType.REMOVE_MEMBERS });

        const Component = proposalActionsUtils.getActionComponent(action)!;
        render(<Component />);
        expect(screen.getByText('Mock ProposalActionChangeMembers')).toBeInTheDocument();
    });

    it('returns ProposalActionChangeSettings component for Multisig action', () => {
        const action = generateProposalActionChangeSettings({ type: ProposalActionType.CHANGE_SETTINGS_MULTISIG });

        const Component = proposalActionsUtils.getActionComponent(action)!;
        render(<Component />);
        expect(screen.getByText('Mock ProposalActionChangeSettings')).toBeInTheDocument();
    });

    it('returns ProposalActionChangeSettings component for TokenVote action', () => {
        const action = generateProposalActionChangeSettings({ type: ProposalActionType.CHANGE_SETTINGS_TOKENVOTE });

        const Component = proposalActionsUtils.getActionComponent(action)!;
        render(<Component />);
        expect(screen.getByText('Mock ProposalActionChangeSettings')).toBeInTheDocument();
    });

    it('returns null for unknown action type', () => {
        const action = generateProposalAction();

        const Component = proposalActionsUtils.getActionComponent(action);
        expect(Component).toBeNull();
    });
});
