import { type IOdsModulesCopy } from './IOdsModulesCopy';

export const enCopy: IOdsModulesCopy = {
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
        of: 'of',
        members: 'Members',
    },
    majorityVotingResult: {
        winningOption: 'Winning Option',
        stage: 'Stage',
    },
    proposalDataListItemStatus: {
        youHaveVoted: "You've voted",
    },
    proposalDataListItemStructure: {
        by: 'By',
        creatorsNumber: (count) => `${count}+ ${count > 1 ? 'Creators' : 'Creator'}`,
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
