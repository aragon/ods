import { type IProposalActionsContainerProps, ProposalActionsContainer } from './proposalActionsContainer';
import { ProposalActionsProvider } from './proposalActionsContext';

export interface IProposalActions extends IProposalActionsContainerProps {}

export const ProposalActions: React.FC<IProposalActions> = (props) => {
    const { actions, ...otherProps } = props;

    return (
        <ProposalActionsProvider>
            <ProposalActionsContainer actions={actions} {...otherProps} />
        </ProposalActionsProvider>
    );
};
