import { render, screen } from '@testing-library/react';
import { generateProposalActionWithdrawToken } from '../actions/generators/proposalActionWithdrawToken';
import { ProposalActionType, type IProposalAction, type IProposalActionWithdrawToken } from '../proposalActionsTypes';
import { ProposalActionsActionVerification } from './proposalActionsActionVerfication';

jest.mock('../../../../utils', () => ({
    addressUtils: {
        truncateAddress: jest.fn((address) => `truncated_${address}`),
    },
}));

describe('<ProposalActionsActionVerification /> component', () => {
    const createTestComponent = (action: IProposalAction) => {
        return <ProposalActionsActionVerification action={action} />;
    };

    it('renders with warning when inputData is null', () => {
        const action = generateProposalActionWithdrawToken({ contractAddress: '0xContractAddress', inputData: null });
        render(createTestComponent(action));

        expect(screen.getByTestId('WARNING')).toBeInTheDocument();
    });

    it('renders with success when inputData is present and action type is unknown', () => {
        const action: IProposalAction = {
            ...generateProposalActionWithdrawToken({
                inputData: {
                    function: 'myFunction',
                    contract: 'myContract',
                    parameters: [],
                },
            }),
            type: 'unknownType',
        };
        render(createTestComponent(action));

        expect(screen.getByTestId('SUCCESS')).toBeInTheDocument();
    });

    it('renders token name for withdrawToken action', () => {
        const action: IProposalActionWithdrawToken = generateProposalActionWithdrawToken({
            contractAddress: '0xContractAddress',
            token: {
                name: 'TokenName',
                symbol: 'TKN',
                logo: 'logo.png',
                decimals: 18,
                priceUsd: '1.00',
                address: '0xTokenAddress',
            },
            type: ProposalActionType.WITHDRAW_TOKEN,
        });
        render(createTestComponent(action));

        expect(screen.getByText(action.token.name)).toBeInTheDocument();
    });
});
