import { fireEvent, render, screen } from '@testing-library/react';
import { Accordion } from '../../../../../core';
import { OdsModulesProvider } from '../../../odsModulesProvider';
import { generateProposalActionWithdrawToken } from '../actions/generators/proposalActionWithdrawToken';
import { withdrawActionsMock } from '../actions/mocks/proposalActionWithdrawToken';
import { ProposalActionsProvider } from '../proposalActionsContext';
import { proposalActionsUtils } from '../utils/proposalActionsUtils';
import { type IProposalActionsActionProps, ProposalActionsAction } from './proposalActionsAction';

describe('<ProposalActionsAction /> component', () => {
    const createTestComponent = (props?: Partial<IProposalActionsActionProps>) => {
        const defaultProps: IProposalActionsActionProps = {
            action: withdrawActionsMock[0],
            index: 0,
            onToggle: jest.fn(),
            ...props,
        };

        return (
            <OdsModulesProvider>
                <ProposalActionsProvider>
                    <Accordion.Container isMulti={true}>
                        <ProposalActionsAction {...defaultProps} />
                    </Accordion.Container>
                </ProposalActionsProvider>
            </OdsModulesProvider>
        );
    };

    it('renders without crashing', () => {
        render(createTestComponent());
        expect(screen.getByText('Withdraw assets')).toBeInTheDocument();
    });

    it('calls onToggle when header is clicked', () => {
        const onToggle = jest.fn();
        render(createTestComponent({ onToggle }));
        fireEvent.click(screen.getByText('Withdraw assets'));
        expect(onToggle).toHaveBeenCalled();
    });

    it('renders "Not verified" when action.inputData is null', () => {
        const action = generateProposalActionWithdrawToken({ inputData: null });
        render(createTestComponent({ action }));
        expect(screen.getByText('Not verified')).toBeInTheDocument();
    });

    it('disables Accordion.Item when action type does not have a correlated ActionComponent', () => {
        const action = {
            ...generateProposalActionWithdrawToken(),
            type: 'unknownType',
        };

        const Component = proposalActionsUtils.getActionComponent(action);
        expect(Component).toBeNull();

        render(createTestComponent({ action }));
        const accordionItem = screen.getByRole('button');
        expect(accordionItem).toBeDisabled();
    });
});
