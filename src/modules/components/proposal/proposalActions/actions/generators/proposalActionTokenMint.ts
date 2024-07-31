import { ProposalActionType } from '../../proposalActionsTypes';
import { type IProposalActionTokenMint } from '../../proposalActionsTypes/proposalActionTokenMint';

export const generateProposalActionTokenMint = (
    action?: Partial<IProposalActionTokenMint>,
): IProposalActionTokenMint => ({
    type: ProposalActionType.TOKEN_MINT,
    from: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    to: '0x3f5CE5FBFe3E9af3971dD833D26BA9b5C936F0bE',
    data: '0x3f60b63300000000000000000000000019dbc1c820dd3f13260829a4e06dda6d9ef758db00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000d5fb864acfd6bb2f72939f122e89ff7f475924f5',
    value: '1000000',
    inputData: {
        function: 'Mint tokens',
        contract: 'GovernanceERC20',
        parameters: [
            { name: 'address', value: '0x3f5CE5FBFe3E9af3971dD833D26BA9b5C936F0bE' },
            { name: 'tokenAmount', value: '2000000000000000000' },
        ],
    },
    receivers: [],
    tokenSupply: 10000,
    holdersCount: 500,
    tokenSymbol: 'PDC',
    ...action,
});
