import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { OdsModulesProvider } from '../../../odsModulesProvider';
import { generateProposalActionWithdrawToken } from '../actions/generators/proposalActionWithdrawToken';
import { type IProposalActionsProps, ProposalActions } from './proposalActions';

jest.mock('../../../member', () => ({
    MemberAvatar: () => <div>Member Pic</div>,
}));

describe('<ProposalActionsContainer /> component', () => {
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
        createTestComponent({ actions });

        expect(screen.getByRole('button', { name: /Withdraw assets/ })).toBeInTheDocument();
    });

    it('renders multiple children correctly', () => {
        const actions = [generateProposalActionWithdrawToken(), generateProposalActionWithdrawToken()];
        createTestComponent({ actions });
        expect(screen.getAllByRole('button', { name: /Withdraw assets/ })).toHaveLength(2);
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
});
