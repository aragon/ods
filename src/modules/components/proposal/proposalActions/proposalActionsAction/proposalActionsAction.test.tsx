import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { Accordion } from '../../../../../core';
import { modulesCopy } from '../../../../assets';
import { generateProposalAction } from '../actions/generators/proposalAction';
import { generateProposalActionWithdrawToken } from '../actions/generators/proposalActionWithdrawToken';
import type { IProposalAction } from '../proposalActionsTypes';
import type { IProposalActionsActionProps } from './proposalActionsAction';
import { ProposalActionsAction } from './proposalActionsAction';

describe('<ProposalActionsAction /> component', () => {
    let scrollIntoViewSpy: jest.SpyInstance;

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

    beforeEach(() => {
        HTMLElement.prototype.scrollIntoView = jest.fn();
        scrollIntoViewSpy = jest.spyOn(HTMLElement.prototype, 'scrollIntoView').mockImplementation(() => {});
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders not-verified label when action.inputData is null', () => {
        const action = generateProposalActionWithdrawToken({ inputData: null });
        render(createTestComponent({ action }));
        expect(screen.getByText(modulesCopy.proposalActionsAction.notVerified)).toBeInTheDocument();
    });

    it('renders custom action component when provided', async () => {
        const customComponent = ({ action }: { action: IProposalAction }) => `Custom action for ${action.type}`;
        const name = 'Custom Action Name';
        const action = generateProposalAction({
            type: 'customType',
            inputData: { function: 'transfer', contract: 'DAI', parameters: [] },
        });

        render(createTestComponent({ action, name, customComponent }));

        await userEvent.click(screen.getByText(/Custom Action Name/));
        expect(screen.getByText(`Custom action for ${action.type}`)).toBeInTheDocument();
    });

    it('renders action name when provided and contract is verified', () => {
        const action = generateProposalAction({ inputData: { function: '', contract: '', parameters: [] } });
        const name = 'Custom Action Name';
        render(createTestComponent({ name, action }));
        expect(screen.getByText(name)).toBeInTheDocument();
    });

    it('updates view when dropdown value changes', async () => {
        const action = generateProposalAction({ inputData: { function: '', contract: '', parameters: [] } });
        const name = 'Custom Action Name';
        render(createTestComponent({ action, name }));

        await userEvent.click(screen.getByText(name));

        await userEvent.click(screen.getByText(modulesCopy.proposalActionsActionViewAsMenu.dropdownLabel));
        await userEvent.click(screen.getByText(modulesCopy.proposalActionsActionViewAsMenu.decoded));
        expect(screen.getByText(modulesCopy.proposalActionsActionDecodedView.valueHelper)).toBeInTheDocument();

        await userEvent.click(screen.getByText(modulesCopy.proposalActionsActionViewAsMenu.dropdownLabel));
        await userEvent.click(screen.getByText(modulesCopy.proposalActionsActionViewAsMenu.raw));
        expect(screen.getByText(modulesCopy.proposalActionsActionRawView.value)).toBeInTheDocument();
        expect(screen.getByText(modulesCopy.proposalActionsActionRawView.to)).toBeInTheDocument();
        expect(screen.getByText(modulesCopy.proposalActionsActionRawView.data)).toBeInTheDocument();
    });

    it('calls scrollIntoView when changing dropdown value', async () => {
        const action = generateProposalAction({
            inputData: { function: 'myFunction', contract: 'myContract', parameters: [] },
        });
        const name = 'Custom Action Name';
        render(createTestComponent({ action, name }));

        await userEvent.click(screen.getByText(name));
        await userEvent.click(screen.getByText(modulesCopy.proposalActionsActionViewAsMenu.dropdownLabel));
        await userEvent.click(screen.getByText(modulesCopy.proposalActionsActionViewAsMenu.raw));
        expect(scrollIntoViewSpy).toHaveBeenCalled();
    });
});
