import { Accordion } from '../../../../../core';
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
        <Accordion.Item value={`${index}`} disabled={isDisabled}>
            <Accordion.ItemHeader onClick={onToggle}>
                <div className="flex flex-col items-start">
                    <div className="text-lg">
                        {action.inputData == null ? 'Not verified' : actionTypeToStringMapping[action.type]}
                    </div>
                    <ProposalActionsActionVerification action={action} />
                </div>
            </Accordion.ItemHeader>
            <Accordion.ItemContent>
                {activeTab === 'basic' && ActionComponent && <ActionComponent />}
                {activeTab === 'composer' && (
                    <div>
                        <div>Function: {action.inputData?.function}</div>
                        <div>Parameters: {JSON.stringify(action.inputData?.parameters, null, 2)}</div>
                    </div>
                )}
                {activeTab === 'code' && <pre>{JSON.stringify(action, null, 2)}</pre>}
            </Accordion.ItemContent>
        </Accordion.Item>
    );
};
