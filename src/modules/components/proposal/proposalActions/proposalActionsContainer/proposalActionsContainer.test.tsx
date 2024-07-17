import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { OdsModulesProvider } from '../../../odsModulesProvider';
import { generateProposalActionWithdrawToken } from '../actions/generators/proposalActionWithdrawToken';
import { ProposalActionsProvider } from '../proposalActionsContext';
import type { IProposalAction } from '../proposalActionsTypes';
import { type IProposalActionsContainerProps, ProposalActionsContainer } from './proposalActionsContainer';

describe('<ProposalActionsContainer /> component', () => {
    const actions: IProposalAction[] = [
        generateProposalActionWithdrawToken(),
        generateProposalActionWithdrawToken({ contractAddress: '0xAnotherAddress' }),
    ];

    const tabs = [
        { label: 'Basic', value: 'basic' },
        { label: 'Composer', value: 'composer' },
        { label: 'Code', value: 'code' },
    ];

    const createTestComponent = (props?: Partial<IProposalActionsContainerProps>) => {
        const defaultProps: IProposalActionsContainerProps = {
            actions,
            tabs,
            containerName: 'Test Container',
            ...props,
        };
        return render(
            <OdsModulesProvider>
                <ProposalActionsProvider>
                    <ProposalActionsContainer {...defaultProps} />
                </ProposalActionsProvider>
            </OdsModulesProvider>,
        );
    };

    it('renders without crashing', () => {
        createTestComponent();
        expect(screen.getByText('Test Container')).toBeInTheDocument();
    });

    it('renders actions correctly in basic tab', () => {
        const actions = [
            generateProposalActionWithdrawToken({ inputData: null }),
            generateProposalActionWithdrawToken({ inputData: null }),
        ];
        createTestComponent({ actions });
        expect(screen.getAllByText(/Not verified/).length).toBe(actions.length);
    });

    it('handles toggling all items', async () => {
        const actions = [
            generateProposalActionWithdrawToken({ sender: { address: '0xVitalik', name: 'vitalik.eth' } }),
            generateProposalActionWithdrawToken({ sender: { address: '0xVitalik', name: 'vitalik.eth' } }),
        ];
        createTestComponent({ actions });

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
});
