import { fireEvent, render, screen } from '@testing-library/react';
import { Accordion } from '../../../../../core';
import { modulesCopy } from '../../../../assets';
import { OdsModulesProvider } from '../../../odsModulesProvider';
import { generateProposalAction } from '../actions/generators/proposalAction';
import { generateProposalActionWithdrawToken } from '../actions/generators/proposalActionWithdrawToken';
import type { IProposalAction } from '../proposalActionsTypes';
import { type IProposalActionsActionProps, ProposalActionsAction } from './proposalActionsAction';

jest.mock('../../../member', () => ({
    MemberAvatar: () => <div>Member Pic</div>,
}));

const CustomActionComponent = ({ action }: { action: IProposalAction }) => (
    <div>{`Custom action for ${action.type}`}</div>
);

describe('<ProposalActionsAction /> component', () => {
    const createTestComponent = (props?: Partial<IProposalActionsActionProps>) => {
        const defaultProps: IProposalActionsActionProps = {
            action: generateProposalActionWithdrawToken(),
            index: 0,
            wagmiConfig: undefined,
            chainId: undefined,
            ...props,
        };

        return (
            <OdsModulesProvider>
                <Accordion.Container isMulti={true}>
                    <ProposalActionsAction {...defaultProps} />
                </Accordion.Container>
            </OdsModulesProvider>
        );
    };

    it('renders without crashing', () => {
        render(createTestComponent());
        expect(screen.getByText(modulesCopy.proposalActionsAction.actionTypeWithdrawToken)).toBeInTheDocument();
    });

    it('renders "Not verified" when action.inputData is null', () => {
        const action = generateProposalActionWithdrawToken({ inputData: null });
        render(createTestComponent({ action }));

        expect(screen.getByText(modulesCopy.proposalActionsAction.notVerified)).toBeInTheDocument();
    });

    it('renders custom action component if provided', () => {
        const action = generateProposalAction({
            type: 'customType',
            inputData: {
                function: 'transfer',
                contract: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
                parameters: [
                    { type: 'address', value: '0x3f5CE5FBFe3E9af3971dD833D26BA9b5C936F0bE' },
                    { type: 'uint256', value: '1000000000000000000' },
                ],
            },
        });
        const customComponents = {
            [action.type]: CustomActionComponent,
        };

        render(createTestComponent({ action, customComponents }));

        fireEvent.click(screen.getByText('transfer'));

        expect(screen.getByText(`Custom action for ${action.type}`)).toBeInTheDocument();
    });

    it('renders fallback for unknown action type', () => {
        const action: IProposalAction = {
            ...generateProposalActionWithdrawToken(),
            type: 'unknownType',
        };
        render(createTestComponent({ action }));

        fireEvent.click(screen.getByText(modulesCopy.proposalActionsAction.unknownActionTypeHeader));

        expect(screen.getByText(modulesCopy.proposalActionsAction.unknownActionTypeCopy)).toBeInTheDocument();
        expect(
            screen.getByRole('link', { name: modulesCopy.proposalActionsAction.unknownActionTypeButton }),
        ).toBeInTheDocument();
    });
});
