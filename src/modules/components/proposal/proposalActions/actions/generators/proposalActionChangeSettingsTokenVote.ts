import { ProposalActionType } from "../../proposalActionsTypes";
import { type IProposalActionChangeSettingsTokenVote } from "../../proposalActionsTypes/proposalActionChangeSettings";

export const generateProposalActionChangeSettingsTokenVote = (
    action?: Partial<IProposalActionChangeSettingsTokenVote>
): IProposalActionChangeSettingsTokenVote => ({
    type: ProposalActionType.CHANGE_SETTINGS_TOKENVOTE,
    existingSettings: {
        tokenSymbol: 'TKN',
        supportThreshold: '50%',
        proposalThreshold: '100 TKN',
        minimumDuration: '7 days',
        earlyExecution: true,
        voteChanges: false,
        additionalSettings: [
            { term: 'Max number of active proposals', definition: '5' },
            { term: 'Proposal cool-off period', definition: '48 hours' },
        ],
    },
    proposedSettings: {
        tokenSymbol: 'TKN',
        supportThreshold: '60%',
        proposalThreshold: '200 TKN',
        minimumDuration: '5 days',
        earlyExecution: false,
        voteChanges: true,
        additionalSettings: [
            { term: 'Max number of active proposals', definition: '10' },
            { term: 'Proposal cool-off period', definition: '24 hours' },
        ],
    },
    from: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    to: '0x3f5CE5FBFe3E9af3971dD833D26BA9b5C936F0bE',
    data: '',
    value: '1000000',
    inputData: {
        function: 'settings',
        contract: 'TokenVote',
        parameters: [
            { type: 'address', value: '0x3f5CE5FBFe3E9af3971dD833D26BA9b5C936F0bE' },
            { type: 'uint256', value: '1000000000000000000' },
        ],
    },
    ...action,
});