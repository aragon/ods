import { AdjustMemberCount } from "../../components/proposal/proposalActions/proposalActionsContainer/proposalActionsContainer.stories";

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
        actionTypeAdjustMemberCount: {
            addMembers: 'Add members',
            removeMembers: 'Remove members',
        },
        actionTypeWithdrawToken: 'Withdraw assets',
        notVerified: 'Not verified',
        unknownActionTypeHeader: 'Unknown action type',
        unknownActionTypeCopy: 'Action cannot be processed and rendered. Use the block explorer to complete manually.',
        unknownActionTypeButton: 'See contract',
        AdjustMemberCount: {
            addMembers: 'Add members',
            removeMembers: 'Remove members',
        },
    },
    proposalActionAdjustMemberCount: {
        summary: 'Summary',
        added: 'Added',
        removed: 'Removed',
        members: 'members',
        totalMembers: 'Total members',
        blockNote: 'This is by the current block number, and might change in the future',
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
