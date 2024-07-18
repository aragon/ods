import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { OdsModulesProvider } from '../../../odsModulesProvider';
import { generateProposalActionWithdrawToken } from '../actions/generators/proposalActionWithdrawToken';
import { ProposalActionsAction } from '../proposalActionsAction';
import { type IProposalActionsContainerProps, ProposalActionsContainer } from './proposalActionsContainer';

jest.mock('../../../member', () => ({
    MemberAvatar: () => <div>Member Pic</div>,
}));

describe('<ProposalActionsContainer /> component', () => {
    const actions = [
        generateProposalActionWithdrawToken(),
        generateProposalActionWithdrawToken({ contractAddress: '0xAnotherAddress' }),
    ];

    const createTestComponent = (props?: Partial<IProposalActionsContainerProps>) => {
        const completeProps: IProposalActionsContainerProps = {
            ...props,
        };
        return render(
            <OdsModulesProvider>
                <ProposalActionsContainer {...completeProps} />
            </OdsModulesProvider>,
        );
    };

    it('renders single child correctly', () => {
        const children = <ProposalActionsAction action={actions[0]} index={0} />;
        createTestComponent({ children });
        expect(screen.getByRole('button', { name: /Withdraw assets/ })).toBeInTheDocument();
    });

    it('renders multiple children correctly', () => {
        const children = [
            <ProposalActionsAction key="0" action={actions[0]} index={0} />,
            <ProposalActionsAction key="1" action={actions[1]} index={1} />,
        ];
        createTestComponent({ children });
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

        const children = [
            <ProposalActionsAction key="0" action={actions[0]} index={0} />,
            <ProposalActionsAction key="1" action={actions[1]} index={1} />,
        ];
        createTestComponent({ children });

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
