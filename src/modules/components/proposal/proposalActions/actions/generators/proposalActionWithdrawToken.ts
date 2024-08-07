import { ProposalActionType, type IProposalActionWithdrawToken } from '../../proposalActionsTypes';

export const generateToken = (
    token?: Partial<IProposalActionWithdrawToken['token']>,
): IProposalActionWithdrawToken['token'] => ({
    name: 'Dai Stablecoin',
    symbol: 'DAI',
    logo: 'https://cryptologos.cc/logos/multi-collateral-dai-dai-logo.png',
    decimals: 18,
    priceUsd: '1.00',
    address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    ...token,
});

export const generateProposalActionWithdrawToken = (
    action?: Partial<IProposalActionWithdrawToken>,
): IProposalActionWithdrawToken => ({
    type: ProposalActionType.WITHDRAW_TOKEN,
    sender: { address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e' },
    receiver: { address: '0x3f5CE5FBFe3E9af3971dD833D26BA9b5C936F0bE' },
    token: generateToken(),
    from: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    to: '0x3f5CE5FBFe3E9af3971dD833D26BA9b5C936F0bE',
    data: '',
    value: '0',
    inputData: {
        function: 'transfer',
        contract: 'Ether',
        parameters: [
            {
                name: 'address',
                type: 'string',
                value: '0x3f5CE5FBFe3E9af3971dD833D26BA9b5C936F0bE',
                notice: 'Contract address of asset',
            },
            {
                name: 'tokenAmount',
                type: 'string',
                value: '1000000000000000000',
                notice: 'Amount of tokens to withdraw',
            },
        ],
    },
    amount: '10000000',
    ...action,
});
