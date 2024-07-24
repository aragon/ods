import { ProposalActionType } from "../../proposalActionsTypes";
import { type IProposalActionUpdateSettings } from "../../proposalActionsTypes/proposalActionUpdateSettings";
import { generateCompositeAddress } from "./proposalActionWithdrawToken";

export const generateProposalActionUpdateSettingsMultisig = ( action: Partial<IProposalActionUpdateSettings> ): IProposalActionUpdateSettings => ( {
    type: ProposalActionType.UPDATE_SETTINGS_MULTISIG,
    threshold: 2,
    proposers: [
        generateCompositeAddress( { address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e' } ),
        generateCompositeAddress( { address: '0x3f5CE5FBFe3E9af3971dD833D26BA9b5C936F0bE' } ),
    ],
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
} );

export const generateProposalActionUpdateSettingsTokenVote = ( action: Partial<IProposalActionUpdateSettingsMultisig> ): IProposalActionUpdateSettingsMultisig => ( {
