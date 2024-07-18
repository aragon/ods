import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { OdsModulesProvider } from '../../../odsModulesProvider';
import { generateProposalActionWithdrawToken } from '../actions/generators/proposalActionWithdrawToken';
import { ProposalActionsAction } from '../proposalActionsAction';
import { type IProposalActionsContainerProps, ProposalActionsContainer } from './proposalActionsContainer';

describe('<ProposalActionsContainer /> component', () => {
    const actions = [
        generateProposalActionWithdrawToken(),
        generateProposalActionWithdrawToken({ contractAddress: '0xAnotherAddress' }),
    ];

    const createTestComponent = (props?: Partial<IProposalActionsContainerProps>) => {
        const defaultProps: IProposalActionsContainerProps = {
            actions,
            containerName: 'Test Container',
            ...props,
        };
        return render(
            <OdsModulesProvider>
                <ProposalActionsContainer {...defaultProps} />
            </OdsModulesProvider>,
        );
    };

    it('renders without crashing', () => {
        createTestComponent();
        expect(screen.getByText('Test Container')).toBeInTheDocument();
    });

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
            generateProposalActionWithdrawToken({sender: {name: 'vitalik.eth', address: '0x1234567890abcdef1234567890abcdef12345678'}}),
            generateProposalActionWithdrawToken({sender: {name: 'vitalik.eth', address: '0x1234567890abcdef1234567890abcdef12345678'}}),
        ];
    
        const children = [
            <ProposalActionsAction key="0" action={actions[0]} index={0} />,
            <ProposalActionsAction key="1" action={actions[1]} index={1} />,
        ];
        createTestComponent({ children });

        const toggleButtonExpand = screen.getByText('Expand All');
        await userEvent.click(toggleButtonExpand);
        expect(screen.getByText('Collapse All')).toBeInTheDocument();
        actions.forEach(() => {
            expect(screen.getAllByText(/vitalik.eth/).length).toBe(actions.length);
        });

        const toggleButtonCollapse = screen.getByText('Collapse All');
        await userEvent.click(toggleButtonCollapse);
        expect(screen.getByText('Expand All')).toBeInTheDocument();
        actions.forEach(() => {
            expect(screen.queryAllByText(/vitalik.eth/).length).toBe(0);
        });
    });

    it('displays footer message when provided', () => {
        const footerMessage = 'This is a footer message';
        createTestComponent({ footerMessage });
        expect(screen.getByText(footerMessage)).toBeInTheDocument();
    });
});
