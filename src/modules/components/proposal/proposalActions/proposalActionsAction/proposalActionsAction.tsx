import { Accordion, Heading } from '../../../../../core';

import type { IWeb3ComponentProps } from '../../../../types';
import { useOdsModulesContext } from '../../../odsModulesProvider';
import { ProposalActionsActionVerification } from '../proposalActionsActionVerfication/';
import { ProposalActionType, type IProposalAction } from '../proposalActionsTypes';
import { proposalActionsUtils } from '../proposalActionsUtils';

export interface IProposalActionsActionProps extends IWeb3ComponentProps {
    /**
     * Proposal action
     */
    action: IProposalAction;
    /**
     * Proposal action name
     */
    name?: string;
    /**
     * Index of the action being mapped by its parent ProposalActions.Container
     */
    index: number;
    /**
     * Custom component for the action if the action type is not supported
     */
    customComponents?: Record<string, React.ComponentType<{ action: IProposalAction }>>;
}

export const ProposalActionsAction: React.FC<IProposalActionsActionProps> = (props) => {
    const { action, index, name, customComponents } = props;
    const ActionComponent = proposalActionsUtils.getActionComponent(action, customComponents);
    const { copy } = useOdsModulesContext();

    const isDisabled = action.inputData == null;

    return (
        <Accordion.Item value={isDisabled ? '' : `${index}`} disabled={isDisabled}>
            <Accordion.ItemHeader>
                <div className="flex flex-col items-start">
                    <Heading size="h4">
                        {action.inputData == null
                            ? copy.proposalActionsAction.notVerified
                            : (name ?? action.inputData.function)}
                    </Heading>
                    <ProposalActionsActionVerification action={action} />
                </div>
            </Accordion.ItemHeader>
            <Accordion.ItemContent>{ActionComponent && <ActionComponent action={action} />}</Accordion.ItemContent>
        </Accordion.Item>
    );
};

ProposalActionsAction.displayName = 'ProposalActionsAction';
