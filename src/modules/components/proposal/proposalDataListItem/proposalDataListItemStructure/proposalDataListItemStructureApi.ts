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

export interface IProposalListItemBaseProps extends IDataListItemProps {
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
    type: ProposalType;
    /**
     * Indicates whether the connected wallet has voted
     */
    voted?: boolean;
    /**
     * Callback invoked when the publisher is clicked
     */
    onPublisherClick?: (publisher: ICompositeAddress) => void;
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
    /**
     * Type of the ProposalDataListItem
     */
    type: 'approvalThreshold';
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
    /**
     * Type of the ProposalDataListItem
     */
    type: 'majorityVoting';
}

export type IProposalDataListItemStructureProps = IWeb3ComponentProps &
    IProposalListItemBaseProps &
    (IApprovalThresholdResult | IMajorityVotingResult);
