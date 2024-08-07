import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { Accordion } from '../../../../../core';
import { modulesCopy } from '../../../../assets';
import {
    generateProposalActionChangeMembers,
    generateProposalActionChangeSettings,
    generateProposalActionTokenMint,
    generateProposalActionUpdateMetadata,
} from '../actions/generators';
import { generateProposalAction } from '../actions/generators/proposalAction';
import { generateProposalActionWithdrawToken } from '../actions/generators/proposalActionWithdrawToken';
import type { IProposalAction } from '../proposalActionsTypes';
import { type IProposalActionsActionProps, ProposalActionsAction } from './proposalActionsAction';

jest.mock('../actions', () => ({
    ProposalActionWithdrawToken: () => <div data-testid="withdraw-token" />,
    ProposalActionTokenMint: () => <div data-testid="token-mint" />,
    ProposalActionUpdateMetadata: () => <div data-testid="update-metadata" />,
    ProposalActionChangeMembers: () => <div data-testid="change-members" />,
    ProposalActionChangeSettings: () => <div data-testid="change-settings" />,
}));

describe('<ProposalActionsAction /> component', () => {
    const createTestComponent = (props?: Partial<IProposalActionsActionProps>) => {
        const defaultProps: IProposalActionsActionProps = {
            action: generateProposalAction(),
            index: 0,
            ...props,
        };

        return (
            <Accordion.Container isMulti={true}>
                <ProposalActionsAction {...defaultProps} />
            </Accordion.Container>
        );
    };

    it('renders not-verified label when action.inputData is null', () => {
        const action = generateProposalActionWithdrawToken({ inputData: null });
        render(createTestComponent({ action }));
        expect(screen.getByText(modulesCopy.proposalActionsAction.notVerified)).toBeInTheDocument();
    });

    it('renders custom action component when provided', async () => {
        const CustomComponent = (props: { action: IProposalAction }) => props.action.type;
        const action = generateProposalAction({
            type: 'customType',
            inputData: { function: 'transfer', contract: 'DAI', parameters: [] },
        });

        render(createTestComponent({ action, CustomComponent }));

        await userEvent.click(screen.getByText('transfer'));
        expect(screen.getByText(action.type)).toBeInTheDocument();
    });

    it('renders action name when provided and contract is verified', () => {
        const action = generateProposalAction({ inputData: { function: '', contract: '', parameters: [] } });
        const name = 'Custom Action Name';
        render(createTestComponent({ name, action }));
        expect(screen.getByText(name)).toBeInTheDocument();
    });

    it.each([
        { action: generateProposalActionWithdrawToken(), testId: 'withdraw-token' },
        { action: generateProposalActionTokenMint(), testId: 'token-mint' },
        { action: generateProposalActionUpdateMetadata(), testId: 'update-metadata' },
        { action: generateProposalActionChangeMembers(), testId: 'change-members' },
        { action: generateProposalActionChangeSettings(), testId: 'change-settings' },
    ])('renders correct UI for $testId action', async ({ action, testId }) => {
        render(createTestComponent({ action }));
        await userEvent.click(screen.getByRole('button'));
        expect(screen.getByTestId(testId)).toBeInTheDocument();
    });

    it('renders AlertCard when action.value is not null and not "0"', async () => {
        const action = generateProposalAction({
            inputData: { function: '', contract: '', parameters: [] },
            value: '1000000000000000000',
        });
        render(createTestComponent({ action }));

        await userEvent.click(screen.getByRole('button'));

        expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    it('does not render AlertCard when action.value is "0"', async () => {
        const action = generateProposalAction({
            inputData: { function: '', contract: '', parameters: [] },
            value: '0',
        });
        render(createTestComponent({ action }));

        await userEvent.click(screen.getByRole('button'));

        expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });

    it('does not render AlertCard when action.value is null', async () => {
        const action = generateProposalAction({
            inputData: { function: '', contract: '', parameters: [] },
            value: null,
        });
        render(createTestComponent({ action }));

        await userEvent.click(screen.getByRole('button'));

        expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });
});
