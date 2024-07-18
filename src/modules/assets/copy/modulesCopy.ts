/**
 * Object representing the structure of copy texts used in various parts of the ODS Modules package.
 * Each property in the object corresponds to a specific component or feature, containing the necessary
 * text labels or functions that return text strings.
 */
export const modulesCopy = {
    addressInput: {
        clear: 'Clear',
        paste: 'Paste',
    },
    assetDataListItemStructure: {
        unknown: 'Unknown',
    },
    memberDataListItemStructure: {
        yourDelegate: 'Your Delegate',
        you: 'You',
        delegations: 'Delegations',
        votingPower: 'Voting Power',
    },
    approvalThresholdResult: {
        stage: 'Stage',
        outOf: (threshold: string) => `of ${threshold} members`,
    },
    majorityVotingResult: {
        winningOption: 'Winning Option',
        stage: 'Stage',
    },
    proposalActionsContainer: {
        containerName: 'Actions',
        collapse: 'Collapse all',
        expand: 'Expand all',
        footerMessage:
            'The proposal must pass all voting stages above before the binding onchain actions are able to be executed.',
    },
    proposalActionsAction: {
        notVerified: 'Not verified',
    },
    proposalDataListItemStatus: {
        voted: "You've voted",
        ago: 'ago',
        left: 'left',
    },
    proposalDataListItemStructure: {
        by: 'By',
        creators: 'creators',
    },
    voteDataListItemStructure: {
        yourDelegate: 'Your delegate',
        you: 'You',
    },
    voteProposalDataListItemStructure: {
        voted: 'Voted',
    },
    wallet: {
        connect: 'Connect',
    },
};

export type ModulesCopy = typeof modulesCopy;
