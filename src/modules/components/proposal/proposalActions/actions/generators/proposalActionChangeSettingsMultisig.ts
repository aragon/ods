import { type IProposalActionChangeSettings, ProposalActionType } from '../../proposalActionsTypes';

export const generateProposalActionChangeSettingsMultisig = (
    action?: Partial<IProposalActionChangeSettings>,
): IProposalActionChangeSettings => ({
    existingSettings: [
        { term: 'Threshold', definition: '3' },
        { term: 'Proposers', definition: 'Alice, Bob' },
    ],
    proposedSettings: [
        { term: 'Threshold', definition: '4' },
        { term: 'Proposers', definition: 'Any wallet' },
    ],
    type: ProposalActionType.CHANGE_SETTINGS_MULTISIG,
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