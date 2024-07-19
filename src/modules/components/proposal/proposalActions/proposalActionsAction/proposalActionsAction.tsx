import { Accordion, Heading } from '../../../../../core';
import { useOdsModulesContext } from '../../../odsModulesProvider';
import { ProposalActionsActionVerification } from '../proposalActionsActionVerfication/proposalActionsActionVerfication';
import type { IProposalAction } from '../proposalActionsTypes';
import { proposalActionsUtils } from '../proposalActionsUtils';

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
     * Custom component for the action if the action type is not supported
     */
    customComponent?: React.ComponentType<{ action: IProposalAction }>;
}

export const ProposalActionsAction: React.FC<IProposalActionsActionProps> = (props) => {
    const { action, index, customComponent } = props;
    const DefaultComponent = proposalActionsUtils.getActionComponent(action);
    const ActionComponent = customComponent ?? DefaultComponent;
    const { copy } = useOdsModulesContext();

    const actionTypeToStringMapping: Record<string, string> = {
        withdrawToken: copy.proposalActionsAction.actionTypeWithdrawToken,
    };

    if (!ActionComponent) {
        return null;
    }

    const isDisabled = action.inputData == null;

    return (
        <Accordion.Item value={isDisabled ? '' : `${index}`} disabled={isDisabled}>
            <Accordion.ItemHeader>
                <div className="flex flex-col items-start">
                    <Heading size="h4">
                        {action.inputData == null
                            ? copy.proposalActionsAction.notVerified
                            : actionTypeToStringMapping[action.type] || action.type}
                    </Heading>
                    <ProposalActionsActionVerification action={action} />
                </div>
            </Accordion.ItemHeader>
            <Accordion.ItemContent>
                <ActionComponent action={action} />
            </Accordion.ItemContent>
        </Accordion.Item>
    );
};

ProposalActionsAction.displayName = 'ProposalActionsAction';
