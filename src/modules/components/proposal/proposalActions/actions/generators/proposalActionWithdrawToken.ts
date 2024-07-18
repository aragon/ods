import { type ICompositeAddress } from '../../../../../types';
import type { IProposalActionWithdrawToken } from '../../proposalActionsTypes';
import { ProposalActionType } from '../../proposalActionsTypes/proposalAction';

export const generateCompositeAddress = (address?: Partial<ICompositeAddress>): ICompositeAddress => ({
    address: '0x0000000000000000000000000000000000000000',
    name: '',
    ...address,
});

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
    sender: generateCompositeAddress({ address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e' }),
    receiver: generateCompositeAddress({ address: '0x3f5CE5FBFe3E9af3971dD833D26BA9b5C936F0bE' }),
    token: generateToken(),
    from: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    to: '0x3f5CE5FBFe3E9af3971dD833D26BA9b5C936F0bE',
    data: '',
    value: '1000000000000000000',
    inputData: {
        function: 'transfer',
        contract: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
        parameters: [
            { type: 'address', value: '0x3f5CE5FBFe3E9af3971dD833D26BA9b5C936F0bE' },
            { type: 'uint256', value: '1000000000000000000' },
        ],
    },
    amount: '1000000000000000000',
    contractAddress: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    ...action,
});
