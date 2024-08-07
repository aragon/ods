import { ProposalActionType, type IProposalActionChangeMembers } from '../../proposalActionsTypes';

export const generateProposalActionChangeMembers = (
    action?: Partial<IProposalActionChangeMembers>,
): IProposalActionChangeMembers => ({
    type: ProposalActionType.ADD_MEMBERS,
    members: [{ address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e' }],
    currentMembers: 5,
    from: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    to: '0x3f5CE5FBFe3E9af3971dD833D26BA9b5C936F0bE',
    data: '',
    value: '0',
    inputData: {
        function: 'transfer',
        contract: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
        parameters: [
            {
                name: 'address',
                type: 'string',
                value: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
                notice: 'Changing member address',
            },
        ],
    },
    ...action,
});
