import { type IDataListItemProps } from '../../../../../core';
import { type ICompositeAddress, type IWeb3ComponentProps } from '../../../../types';

export type ProposalType = 'majorityVoting' | 'approvalThreshold';
export type ProposalStatus =
    | 'accepted'
    | 'active'
    | 'challenged'
    | 'draft'
    | 'executed'
    | 'expired'
    | 'failed'
    | 'partiallyExecuted'
    | 'pending'
    | 'queued'
    | 'rejected'
    | 'vetoed';

export interface IProposalDataListItemStructureBaseProps<TType extends ProposalType = ProposalType>
    extends IDataListItemProps,
        IWeb3ComponentProps {
    /**
     * Indicates date relative to the proposal status
     */
    date: string;
    /**
     * Indicates whether the proposal is a protocol update
     */
    protocolUpdate?: boolean;
    /**
     * Publisher address and/or ENS name
     */
    publisher: ICompositeAddress;
    /**
     * Link to the publisher's profile
     */
    publisherProfileLink: string;
    /**
     * Result of the proposal shown only when it is active, challenged or vetoed.
     */
    result: TType extends 'majorityVoting' ? IMajorityVotingResult : IApprovalThresholdResult;
    /**
     * Proposal status
     */
    status: ProposalStatus;
    /**
     * Proposal description
     */
    summary: string;
    /**
     * Proposal title
     */
    title: string;
    /**
     * Type of the ProposalDataListItem
     */
    type: TType;
    /**
     * Indicates whether the connected wallet has voted
     */
    voted?: boolean;
}

export interface IApprovalThresholdResult {
    /**
     * Number of approvals for the proposal
     */
    approvalAmount: number;
    /**
     * Proposal approval threshold
     */
    approvalThreshold: number;
}

export interface IMajorityVotingResult {
    /**
     * Winning option
     */
    option: string;
    /**
     * Number of votes for the winning option
     */
    voteAmount: string;
    /**
     * Percentage of votes for the winning option
     */
    votePercentage: number;
}

export interface IProposalDataListItemStructureMajorityVotingProps
    extends IProposalDataListItemStructureBaseProps<'majorityVoting'> {
    result: IMajorityVotingResult;
}

export interface IProposalDataListItemStructureApprovalThresholdProps
    extends IProposalDataListItemStructureBaseProps<'approvalThreshold'> {
    result: IApprovalThresholdResult;
}

export type IProposalDataListItemStructureProps =
    | IProposalDataListItemStructureMajorityVotingProps
    | IProposalDataListItemStructureApprovalThresholdProps;
