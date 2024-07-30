import { ProposalActionType, type IProposalActionChangeMembers } from '../../proposalActionsTypes';

export const generateProposalActionChangeMembers = (
    action?: Partial<IProposalActionChangeMembers>,
): IProposalActionChangeMembers => ({
    type: ProposalActionType.ADD_MEMBERS,
    members: [{ address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e' }],
    currentMembers: 5,
    from: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    to: '0x3f5CE5FBFe3E9af3971dD833D26BA9b5C936F0bE',
    data: '0x3f60b63300000000000000000000000019dbc1c820dd3f13260829a4e06dda6d9ef758db00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000d5fb864acfd6bb2f72939f122e89ff7f475924f5',
    value: '1000000000000000000',
    inputData: {
        function: 'transfer',
        contract: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
        parameters: [
            { type: 'address', value: '0x3f5CE5FBFe3E9af3971dD833D26BA9b5C936F0bE' },
            { type: 'uint256', value: '1000000000000000000' },
        ],
    },
    ...action,
});
