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
    },
    proposalActionsAction: {
        actionTypeWithdrawToken: 'Withdraw assets',
        notVerified: 'Not verified',
        proposalActionChangeMembers: {
            summary: 'Summary',
            added: 'Added',
            removed: 'Removed',
            members: 'members',
            adjustMemberCount: {
                addMembers: 'Add members',
                removeMembers: 'Remove members',
            },
            existingMembers: 'Existing members',
            blockNote: 'At the block in which the proposal was created',
        },
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
