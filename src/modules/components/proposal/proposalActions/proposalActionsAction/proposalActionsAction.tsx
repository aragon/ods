import { Accordion, Button, Heading, IconType } from '../../../../../core';
import { ChainEntityType, useBlockExplorer } from '../../../../hooks';
import type { IWeb3ComponentProps } from '../../../../types';
import { useOdsModulesContext } from '../../../odsModulesProvider';
import { ProposalActionsActionVerification } from '../proposalActionsActionVerfication/proposalActionsActionVerfication';
import type { IProposalAction } from '../proposalActionsTypes';
import { proposalActionsUtils } from '../proposalActionsUtils';

export interface IProposalActionsActionProps extends IWeb3ComponentProps {
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
    customComponents?: Record<string, React.ComponentType<{ action: IProposalAction }>>;
}

export const ProposalActionsAction: React.FC<IProposalActionsActionProps> = (props) => {
    const { action, index, wagmiConfig, chainId, customComponents } = props;
    const ActionComponent = proposalActionsUtils.getActionComponent(action, customComponents);
    const { copy } = useOdsModulesContext();

    const getActionTypeString = () => {
        if (proposalActionsUtils.isWithdrawTokenAction(action)) {
            return copy.proposalActionsAction.actionTypeWithdrawToken;
        }
        if (proposalActionsUtils.isAdjustMemberCountAction(action)) {
            return action.addOrRemove === 'add'
                ? copy.proposalActionsAction.actionTypeAdjustMemberCount.addMembers
                : copy.proposalActionsAction.actionTypeAdjustMemberCount.removeMembers;
        }
        return '';
    };
    const { buildEntityUrl } = useBlockExplorer({ chains: wagmiConfig?.chains, chainId });
    const contractUrl = buildEntityUrl({ type: ChainEntityType.ADDRESS, id: action.contractAddress });

    const actionTypeToStringMapping: Record<string, string> = {
        withdrawToken: copy.proposalActionsAction.actionTypeWithdrawToken,
    };

    const isDisabled = action.inputData == null;

    if (!ActionComponent) {
        return (
            <Accordion.Item value={isDisabled ? '' : `${index}`}>
                <Accordion.ItemHeader>
                    <Heading size="h4" className="text-critical-400">
                        {getActionTypeString()}
                    </Heading>
                </Accordion.ItemHeader>
                <Accordion.ItemContent>
                    <p className="text-neutral-400">{copy.proposalActionsAction.unknownActionTypeCopy}</p>
                    <Button
                        href={contractUrl}
                        target="_blank"
                        variant="secondary"
                        size="md"
                        iconRight={IconType.LINK_EXTERNAL}
                        className="mt-3 max-w-fit"
                    >
                        {copy.proposalActionsAction.unknownActionTypeButton}
                    </Button>
                </Accordion.ItemContent>
            </Accordion.Item>
        );
    }

    return (
        <Accordion.Item value={isDisabled ? '' : `${index}`} disabled={isDisabled}>
            <Accordion.ItemHeader>
                <div className="flex flex-col items-start">
                    <Heading size="h4">
                        {action.inputData == null
                            ? copy.proposalActionsAction.notVerified
                            : actionTypeToStringMapping[action.type] || action.inputData.function}
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
