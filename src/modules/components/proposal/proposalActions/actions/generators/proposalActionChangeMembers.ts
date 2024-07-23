import { type ICompositeAddress } from '../../../../../types';
import { ProposalActionType, type IProposalActionChangeMembers } from '../../proposalActionsTypes';

export const generateCompositeAddress = (address?: Partial<ICompositeAddress>): ICompositeAddress => ({
    address: '0x0000000000000000000000000000000000000000',
    name: '',
    ...address,
});

export const generateProposalActionChangeMembers = (
    action?: Partial<IProposalActionChangeMembers>,
): IProposalActionChangeMembers => ({
    type: ProposalActionType.ADD_MEMBERS,
    changingMembers: [generateCompositeAddress({ address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e' })],
    currentMemberCount: 5,
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
    ...action,
});
