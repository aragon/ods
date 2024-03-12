import { type IDataListItemProps } from '../../../../core';
import { type ICompositeAddress, type IWeb3ComponentProps } from '../../../types';

export type ProposalDataListItemType = 'majorityVoting' | 'approvalThreshold';
export type ProposalDataListItemStatusType =
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
    // TODO: Change the date into a date type so that it can be used with the date formatter
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
    status: ProposalDataListItemStatusType;
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
    type: ProposalDataListItemType;
    /**
     * Indicates whether the connected wallet has voted
     */
    voted?: boolean;
    /**
     * Callback invoked when the publisher is clicked
     */
    onPublisherClick?: (publisher: ICompositeAddress) => void;
}

export interface IApprovalThresholdResultProps {
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

export interface IMajorityVotingResultProps {
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
    (IApprovalThresholdResultProps | IMajorityVotingResultProps);
