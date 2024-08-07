import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { OdsModulesProvider } from '../../../odsModulesProvider';
import { generateProposalAction } from '../actions/generators/proposalAction';
import { generateProposalActionWithdrawToken } from '../actions/generators/proposalActionWithdrawToken';
import { ProposalActionType, type IProposalAction } from '../proposalActionsTypes';
import { ProposalActions, type IProposalActionsProps } from './proposalActions';

jest.mock('../../../member', () => ({ MemberAvatar: () => <div data-testid="member-avatar" /> }));

describe('<ProposalActions /> component', () => {
    const scrollIntoViewSpy = jest.spyOn(HTMLElement.prototype, 'scrollIntoView');

    afterEach(() => {
        scrollIntoViewSpy.mockReset();
    });

    const createTestComponent = (props?: Partial<IProposalActionsProps>) => {
        const completeProps: IProposalActionsProps = {
            actions: [],
            ...props,
        };

        return (
            <OdsModulesProvider>
                <ProposalActions {...completeProps} />
            </OdsModulesProvider>
        );
    };

    it('correctly renders the actions', () => {
        const actions = [generateProposalActionWithdrawToken(), generateProposalActionWithdrawToken()];
        const actionNames = { [ProposalActionType.WITHDRAW_TOKEN]: 'Withdraw assets' };
        render(createTestComponent({ actions, actionNames }));
        expect(
            screen.getAllByRole('button', { name: new RegExp(actionNames[ProposalActionType.WITHDRAW_TOKEN]) }),
        ).toHaveLength(2);
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
        render(createTestComponent({ actions }));

        const toggleButtonExpand = screen.getByText('Expand all');
        await userEvent.click(toggleButtonExpand);
        expect(screen.getByText('Collapse all')).toBeInTheDocument();

        actions.forEach(() => expect(screen.getAllByText(/vitalik.eth/).length).toBe(actions.length));

        const toggleButtonCollapse = screen.getByText('Collapse all');
        await userEvent.click(toggleButtonCollapse);

        expect(screen.getByText('Expand all')).toBeInTheDocument();
        actions.forEach(() => expect(screen.queryAllByText(/vitalik.eth/).length).toBe(0));
    });

    it('triggers scrollIntoView when collapsing all items', async () => {
        const actions = [generateProposalActionWithdrawToken(), generateProposalActionWithdrawToken()];
        render(createTestComponent({ actions }));

        const toggleButtonExpand = screen.getByText('Expand all');
        await userEvent.click(toggleButtonExpand);

        expect(screen.getByText('Collapse all')).toBeInTheDocument();
        expect(scrollIntoViewSpy).not.toHaveBeenCalled();

        const toggleButtonCollapse = screen.getByText('Collapse all');
        await userEvent.click(toggleButtonCollapse);

        expect(screen.getByText('Expand all')).toBeInTheDocument();
        expect(scrollIntoViewSpy).toHaveBeenCalled();
    });

    it('passes custom action names to ProposalActionsAction', async () => {
        const actions = [generateProposalActionWithdrawToken(), generateProposalAction({ type: 'tokenSwap' })];
        const actionNames = { [ProposalActionType.WITHDRAW_TOKEN]: 'Custom Withdraw Token' };
        render(createTestComponent({ actions, actionNames }));

        const toggleButtonExpand = screen.getByText('Expand all');
        await userEvent.click(toggleButtonExpand);

        expect(screen.getByText(actionNames[ProposalActionType.WITHDRAW_TOKEN])).toBeInTheDocument();
    });

    it('renders custom action components if provided', async () => {
        const CustomActionComponent = (props: { action: IProposalAction }) => `Custom action for ${props.action.type}`;

        const actions = [
            generateProposalActionWithdrawToken(),
            generateProposalAction({
                type: 'customType',
                inputData: { function: 'customFunction', contract: '', parameters: [] },
            }),
        ];

        const actionNames = { customType: 'Custom action' };
        const customActionComponents = { customType: CustomActionComponent };

        render(createTestComponent({ actions, actionNames, customActionComponents }));

        const toggleButtonExpand = screen.getByText('Expand all');
        await userEvent.click(toggleButtonExpand);

        expect(screen.getByText(`Custom action for ${actions[1].type}`)).toBeInTheDocument();
    });
});
