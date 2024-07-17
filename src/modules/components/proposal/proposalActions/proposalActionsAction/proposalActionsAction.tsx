import { Accordion, Heading } from '../../../../../core';
import { ProposalActionsActionVerification } from '../proposalActionsActionVerfication/proposalActionsActionVerfication';

import { useProposalActionsContext } from '../proposalActionsContext';
import type { IProposalAction } from '../proposalActionsTypes';
import { proposalActionsUtils } from '../utils';

export interface IProposalActionsActionProps {
    /**
     * Proposal action
     */
    action: IProposalAction;
    /**
     * Index of the action being mapped by its parent ProposalActions.Container
     */
    index: number;
    /**
     * Toggle accordion callback for two way binding
     */
    onToggle: () => void;
}

const actionTypeToStringMapping: Record<string, string> = {
    withdrawToken: 'Withdraw assets',
};

export const ProposalActionsAction: React.FC<IProposalActionsActionProps> = (props) => {
    const { action, index, onToggle } = props;
    const { activeTab } = useProposalActionsContext();
    const ActionComponent = proposalActionsUtils.getActionComponent(action);
    const isDisabled = !ActionComponent;

    return (
        <Accordion.Item value={`${index}-action`} disabled={isDisabled}>
            <Accordion.ItemHeader onClick={onToggle}>
                <div className="flex flex-col items-start">
                    <Heading size="h4">
                        {action.inputData == null ? 'Not verified' : actionTypeToStringMapping[action.type]}
                    </Heading>
                    <ProposalActionsActionVerification action={action} />
                </div>
            </Accordion.ItemHeader>
            <Accordion.ItemContent>
                {activeTab === 'basic' && ActionComponent && <ActionComponent />}
            </Accordion.ItemContent>
        </Accordion.Item>
    );
};
