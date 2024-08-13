import { ProposalActionType } from '../../proposalActionsTypes';
import { type IProposalActionTokenMint } from '../../proposalActionsTypes/proposalActionTokenMint';

export const generateProposalActionTokenMint = (
    action?: Partial<IProposalActionTokenMint>,
): IProposalActionTokenMint => ({
    type: ProposalActionType.TOKEN_MINT,
    from: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    to: '0x3f5CE5FBFe3E9af3971dD833D26BA9b5C936F0bE',
    data: '',
    value: '0',
    inputData: {
        function: 'Mint tokens',
        contract: 'GovernanceERC20',
        parameters: [
            { name: 'address', type: 'string', value: '0x3f5CE5FBFe3E9af3971dD833D26BA9b5C936F0bE' },
            { name: 'tokenAmount', type: 'string', value: '2000000000000000000' },
        ],
    },
    receiver: {
        currentBalance: '0',
        newBalance: '5',
        address: '0x32c2FE388ABbB3e678D44DF6a0471086D705316a',
    },
    tokenSymbol: 'PDC',
    ...action,
});
