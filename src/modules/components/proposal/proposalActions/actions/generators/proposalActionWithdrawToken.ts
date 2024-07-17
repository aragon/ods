import { type ICompositeAddress } from '../../../../../types';
import type { IProposalActionWithdrawToken } from '../../proposalActionsTypes';
import { ProposalActionType } from '../../proposalActionsTypes/proposalAction';

export const generateCompositeAddress = (address?: Partial<ICompositeAddress>): ICompositeAddress => ({
    address: '0xDefaultAddress',
    name: '',
    ...address,
});

export const generateProposalActionWithdrawToken = (
    action?: Partial<IProposalActionWithdrawToken>,
): IProposalActionWithdrawToken => ({
    type: ProposalActionType.WITHDRAW_TOKEN,
    sender: generateCompositeAddress({ address: '0xDefaultSender' }),
    receiver: generateCompositeAddress({ address: '0xDefaultReceiver' }),
    token: {
        name: 'DefaultToken',
        symbol: 'DEF',
        logo: 'default-logo.png',
        decimals: 0,
        priceUsd: '',
        address: '',
    },
    from: '0xDefaultFrom',
    to: '0xDefaultTo',
    data: '',
    value: '0',
    inputData: {
        function: 'defaultFunction',
        contract: '0xDefaultContract',
        parameters: [
            { type: 'defaultType', value: '0' },
            { type: 'defaultType', value: '0' },
        ],
    },
    amount: '0',
    contractAddress: '0xDefaultContractAddress',
    ...action,
});
