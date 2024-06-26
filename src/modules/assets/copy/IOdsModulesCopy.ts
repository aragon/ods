/**
 * Interface representing the structure of copy texts used in various parts of the ODS Core package.
 * Each property in the interface corresponds to a specific component or feature, containing the necessary
 * text labels or functions that return text strings.
 */

export interface IOdsModulesCopy {
    addressInput: {
        clear: string;
        paste: string;
    };
    assetDataListItemStructure: {
        unknown: string;
    };
    memberDataListItemStructure: {
        yourDelegate: string;
        you: string;
        delegations: string;
        votingPower: string;
    };
    approvalThresholdResult: {
        stage: string;
        of: string;
        members: string;
    };
    majorityVotingResult: {
        winningOption: string;
        stage: string;
    };
    proposalDataListItemStatus: {
        youHaveVoted: string;
    };
    proposalDataListItemStructure: {
        by: string;
        creatorsNumber: (count: number) => string;
    };
    voteDataListItemStructure: {
        yourDelegate: string;
        you: string;
    };
    voteProposalDataListItemStructure: {
        voted: string;
    };
    wallet: {
        connect: string;
    };
}
