import { type IProposalActionChangeSettingsMultisig, ProposalActionType } from '../../proposalActionsTypes';

export const generateProposalActionChangeSettingsMultisig = (
    action?: Partial<IProposalActionChangeSettingsMultisig>,
): IProposalActionChangeSettingsMultisig => ({
    type: ProposalActionType.CHANGE_SETTINGS_MULTISIG,
    existingSettings: {
        threshold: 2,
        currentMembers: 2,
        proposers: [
            { address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e' },
            { address: '0x3f5CE5FBFe3E9af3971dD833D26BA9b5C936F0bE' },
        ],
    },
    proposedSettings: {
        threshold: 3,
        currentMembers: 6,
        proposers: [
            { address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e' },
            { address: '0x3f5CE5FBFe3E9af3971dD833D26BA9b5C936F0bE' },
            { address: '0x4a5cE5FBFe3E9af3971dD833D26BA9b5C936F0cE' },
        ],
    },
    from: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    to: '0x3f5CE5FBFe3E9af3971dD833D26BA9b5C936F0bE',
    data: '',
    value: '1000000',
    inputData: {
        function: 'settings',
        contract: 'Multisig',
        parameters: [
            { type: 'address', value: '0x3f5CE5FBFe3E9af3971dD833D26BA9b5C936F0bE' },
            { type: 'uint256', value: '1000000000000000000' },
        ],
    },
    ...action,
});