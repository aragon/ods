import { type IProposalActionUpdateMetadata } from '../../proposalActionsTypes';

export interface IProposalActionUpdateMetadataProps {
    /**
     * Withdraw token action
     */
    action: IProposalActionUpdateMetadata;
}

export const ProposalActionUpdateMetadata: React.FC<IProposalActionUpdateMetadataProps> = (props) => {
    const { action } = props;
    return <>{JSON.stringify(action, null, 2)}</>;
};
