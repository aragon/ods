import { Accordion, IconType, Link } from '../../../../../core';
import { addressUtils } from '../../../../utils';
import { useProposalActionsContext } from '../proposalActionsContext';
import type { IProposalAction } from '../proposalActionTypes';
import { proposalActionsUtils } from '../utils';

export interface IProposalActionsActionProps {
    /**
     * Proposal action
     */
    action: IProposalAction;
    /**
     * Index of the action
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

    if (action.inputData == null) {
        return null;
    }

    return (
        <Accordion.Item value={`${index}`} disabled={isDisabled}>
            <Accordion.ItemHeader onClick={onToggle}>
                <div className="flex flex-col items-start">
                    <div>{actionTypeToStringMapping[action.type]}</div>
                    <div className="flex items-center gap-2 text-sm">
                        <p className="text-neutral-600">{addressUtils.truncateAddress(action.inputData.contract)}</p>
                        {/* TODO: implement verified component based on action type */}
                        <Link iconRight={IconType.SUCCESS}>Verified</Link>
                    </div>
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
