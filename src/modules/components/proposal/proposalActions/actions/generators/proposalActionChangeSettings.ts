import { ProposalActionType } from '../../proposalActionsTypes';
import { type IProposalActionChangeSettings } from '../../proposalActionsTypes/proposalActionChangeSettings';

export const generateProposalActionChangeSettings = (
    action?: Partial<IProposalActionChangeSettings>,
): IProposalActionChangeSettings => ({
    existingSettings: [
        { term: 'Token Symbol', definition: 'ABC' },
        { term: 'Support Threshold', definition: '50%' },
        { term: 'Proposal Threshold', definition: '1%' },
        { term: 'Minimum Duration', definition: '7 days' },
        { term: 'Early Execution', definition: 'No' },
        { term: 'Vote Changes', definition: 'Yes' },
    ],
    proposedSettings: [
        { term: 'Token Symbol', definition: 'ABC' },
        { term: 'Support Threshold', definition: '60%' },
        { term: 'Proposal Threshold', definition: '2%' },
        { term: 'Minimum Duration', definition: '5 days' },
        { term: 'Early Execution', definition: 'Yes' },
        { term: 'Vote Changes', definition: 'No' },
    ],
    type: ProposalActionType.CHANGE_SETTINGS_TOKENVOTE,
    from: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    to: '0x3f5CE5FBFe3E9af3971dD833D26BA9b5C936F0bE',
    data: '',
    value: '1000000',
    inputData: {
        function: 'settings',
        contract: 'TokenVote',
        parameters: [
            { name: 'duration', type: 'uint16', value: 5, notice: 'Changing minimum duration' },
            { name: 'tokenAmount', type: 'string', value: '1000000000000000000' },
        ],
    },
    ...action,
});
