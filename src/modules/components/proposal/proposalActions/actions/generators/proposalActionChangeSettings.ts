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
    data: '0x3f60b63300000000000000000000000019dbc1c820dd3f13260829a4e06dda6d9ef758db00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000d5fb864acfd6bb2f72939f122e89ff7f475924f5',
    value: '1000000',
    inputData: {
        function: 'settings',
        contract: 'TokenVote',
        parameters: [
            { name: 'duration', value: 5, comment: 'Changing minimum duration' },
            { name: 'tokenAmount', value: '1000000000000000000' },
        ],
    },
    ...action,
});
