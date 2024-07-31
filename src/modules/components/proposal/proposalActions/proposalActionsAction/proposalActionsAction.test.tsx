import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Accordion } from '../../../../../core';
import { modulesCopy } from '../../../../assets';
import { generateProposalAction } from '../actions/generators/proposalAction';
import { generateProposalActionWithdrawToken } from '../actions/generators/proposalActionWithdrawToken';
import type { IProposalAction } from '../proposalActionsTypes';
import type { IProposalActionsActionProps } from './proposalActionsAction';
import { ProposalActionsAction } from './proposalActionsAction';

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
        const customComponent = ({ action }: { action: IProposalAction }) => `Custom action for ${action.type}`;
        const action = generateProposalAction({
            type: 'customType',
            inputData: { function: 'transfer', contract: 'DAI', parameters: [] },
        });

        render(createTestComponent({ action, customComponent }));

        await userEvent.click(screen.getByText('transfer'));
        expect(screen.getByText(`Custom action for ${action.type}`)).toBeInTheDocument();
    });

    it('renders action name when provided and contract is verified', () => {
        const action = generateProposalAction({ inputData: { function: '', contract: '', parameters: [] } });
        const name = 'Custom Action Name';
        render(createTestComponent({ name, action }));
        expect(screen.getByText(name)).toBeInTheDocument();
    });

    it('renders decoded view when dropdown value is "decoded"', async () => {
        const action = generateProposalAction({ inputData: { function: '', contract: '', parameters: [] } });
        render(createTestComponent({ action }));

        await userEvent.click(screen.getByText('View action as'));
        await userEvent.click(screen.getByText('Decoded'));

        expect(screen.getByText('Natspec placeholder')).toBeInTheDocument();
    });

    it('renders raw view when dropdown value is "raw"', async () => {
        const action = generateProposalAction({ inputData: { function: '', contract: '', parameters: [] } });
        render(createTestComponent({ action }));

        await userEvent.click(screen.getByText('View action as'));
        await userEvent.click(screen.getByText('Raw'));

        expect(screen.getByText('Value')).toBeInTheDocument();
        expect(screen.getByText('To')).toBeInTheDocument();
        expect(screen.getByText('Data')).toBeInTheDocument();
    });

    it('calls handleDropdownChange and updates the view when dropdown value changes', async () => {
        const action = generateProposalAction({ inputData: { function: '', contract: '', parameters: [] } });
        render(createTestComponent({ action }));

        await userEvent.click(screen.getByText('View action as'));
        await userEvent.click(screen.getByText('Decoded'));
        expect(screen.getByText('Natspec placeholder')).toBeInTheDocument();

        await userEvent.click(screen.getByText('View action as'));
        await userEvent.click(screen.getByText('Raw'));
        expect(screen.getByText('Value')).toBeInTheDocument();
        expect(screen.getByText('To')).toBeInTheDocument();
        expect(screen.getByText('Data')).toBeInTheDocument();
    });
});
