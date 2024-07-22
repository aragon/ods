import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { OdsModulesProvider } from '../../../odsModulesProvider';
import { generateProposalAction } from '../actions/generators/proposalAction';
import { generateProposalActionWithdrawToken } from '../actions/generators/proposalActionWithdrawToken';
import { IProposalAction } from '../proposalActionsTypes';
import { type IProposalActionsProps, ProposalActions } from './proposalActions';

jest.mock('../../../member', () => ({
    MemberAvatar: () => <div>Member Pic</div>,
}));

describe('<ProposalActions /> component', () => {
    const actions = [generateProposalActionWithdrawToken()];

    const createTestComponent = (props?: Partial<IProposalActionsProps>) => {
        const completeProps: IProposalActionsProps = {
            actions,
            ...props,
        };
        return render(
            <OdsModulesProvider>
                <ProposalActions {...completeProps} />
            </OdsModulesProvider>,
        );
    };

    it('renders single child correctly', () => {
        const actions = [generateProposalActionWithdrawToken()];
        const actionNames = {
            withdrawToken: 'Withdraw assets',
        };
        createTestComponent({ actions, actionNames });

        expect(screen.getByRole('button', { name: new RegExp(actionNames.withdrawToken) })).toBeInTheDocument();
    });

    it('renders multiple children correctly', () => {
        const actions = [generateProposalActionWithdrawToken(), generateProposalActionWithdrawToken()];
        const actionNames = {
            withdrawToken: 'Withdraw assets',
        };
        createTestComponent({ actions, actionNames });

        expect(screen.getAllByRole('button', { name: new RegExp(actionNames.withdrawToken) })).toHaveLength(2);
    });

    it('handles toggling all items', async () => {
        const actions = [
            generateProposalActionWithdrawToken({
                sender: { name: 'vitalik.eth', address: '0x1234567890abcdef1234567890abcdef12345678' },
            }),
            generateProposalActionWithdrawToken({
                sender: { name: 'vitalik.eth', address: '0x1234567890abcdef1234567890abcdef12345678' },
            }),
        ];
        createTestComponent({ actions });

        const toggleButtonExpand = screen.getByText('Expand all');
        await userEvent.click(toggleButtonExpand);
        expect(screen.getByText('Collapse all')).toBeInTheDocument();
        actions.forEach(() => {
            expect(screen.getAllByText(/vitalik.eth/).length).toBe(actions.length);
        });

        const toggleButtonCollapse = screen.getByText('Collapse all');

        await userEvent.click(toggleButtonCollapse);

        expect(screen.getByText('Expand all')).toBeInTheDocument();
        actions.forEach(() => {
            expect(screen.queryAllByText(/vitalik.eth/).length).toBe(0);
        });
    });

    it('passes custom action names to ProposalActionsAction', async () => {
        const actions = [generateProposalActionWithdrawToken(), generateProposalAction({ type: 'tokenSwap' })];
        const actionNames = {
            withdrawToken: 'Custom Withdraw Token',
        };

        createTestComponent({ actions, actionNames });

        const toggleButtonExpand = screen.getByText('Expand all');
        await userEvent.click(toggleButtonExpand);

        expect(screen.getByText(actionNames.withdrawToken)).toBeInTheDocument();
    });

    it('renders custom action components if provided', async () => {
        const CustomActionComponent = ({ action }: { action: IProposalAction }) => (
            <div>{`Custom action for ${action.type}`}</div>
        );

        const actions = [
            generateProposalActionWithdrawToken(),
            {
                type: 'customType',
                inputData: { function: 'customFunction', contract: '', parameters: [] },
                contractAddress: '',
                from: '',
                to: '',
                data: '',
                value: '',
            },
        ];

        const actionNames = {
            withdrawToken: 'Withdraw assets',
            customType: 'Custom action',
        };

        const customActionComponents = {
            customType: CustomActionComponent,
        };

        createTestComponent({ actions, actionNames, customActionComponents });

        const toggleButtonExpand = screen.getByText('Expand all');
        await userEvent.click(toggleButtonExpand);

        expect(screen.getByText(actionNames.withdrawToken)).toBeInTheDocument();
        expect(screen.getByText(`Custom action for ${actions[1].type}`)).toBeInTheDocument();
    });

    it('renders footer message if provided', () => {
        const footerMessage = 'This is a footer message';
        createTestComponent({ footerMessage });

        expect(screen.getByText(footerMessage)).toBeInTheDocument();
    });
});
