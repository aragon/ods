import { useMemo } from 'react';
import { formatUnits } from 'viem';
import { Accordion, AlertCard, Heading } from '../../../../../core';
import type { IWeb3ComponentProps } from '../../../../types';
import { useOdsModulesContext } from '../../../odsModulesProvider';
import {
    ProposalActionChangeMembers,
    ProposalActionChangeSettings,
    ProposalActionTokenMint,
    ProposalActionUpdateMetadata,
    ProposalActionWithdrawToken,
} from '../actions';
import { ProposalActionsActionVerification } from '../proposalActionsActionVerfication';
import type { IProposalAction, ProposalActionComponent } from '../proposalActionsTypes';
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
     * Custom component for the action
     */
    CustomComponent?: ProposalActionComponent;
}

export const ProposalActionsAction: React.FC<IProposalActionsActionProps> = (props) => {
    const { action, index, name, CustomComponent, ...web3Props } = props;

    const { copy } = useOdsModulesContext();

    const ActionComponent = useMemo(() => {
        if (CustomComponent) {
            return <CustomComponent action={action} {...web3Props} />;
        }

        if (proposalActionsUtils.isWithdrawTokenAction(action)) {
            return <ProposalActionWithdrawToken action={action} {...web3Props} />;
        } else if (proposalActionsUtils.isTokenMintAction(action)) {
            return <ProposalActionTokenMint action={action} {...web3Props} />;
        } else if (proposalActionsUtils.isUpdateMetadataAction(action)) {
            return <ProposalActionUpdateMetadata action={action} {...web3Props} />;
        } else if (proposalActionsUtils.isChangeMembersAction(action)) {
            return <ProposalActionChangeMembers action={action} {...web3Props} />;
        } else if (proposalActionsUtils.isChangeSettingsAction(action)) {
            return <ProposalActionChangeSettings action={action} {...web3Props} />;
        }

        return null;
    }, [action, CustomComponent, web3Props]);

    const defaultTitle = name ?? action.inputData?.function;
    const actionTitle = action.inputData == null ? copy.proposalActionsAction.notVerified : defaultTitle;

    const isDisabled = action.inputData == null;

    return (
        <Accordion.Item value={isDisabled ? '' : `${index}`} disabled={isDisabled}>
            <Accordion.ItemHeader>
                <div className="flex flex-col items-start">
                    <Heading size="h4">{actionTitle}</Heading>
                    <ProposalActionsActionVerification action={action} />
                </div>
            </Accordion.ItemHeader>
            <Accordion.ItemContent>
                {action.value != null && action.value !== '0' && (
                    <AlertCard
                        variant="critical"
                        message={copy.proposalActionsAction.nativeSendAlert}
                        description={copy.proposalActionsAction.nativeSendDescription(
                            formatUnits(BigInt(action.value), 18),
                        )}
                        className="mb-6 md:mb-8"
                    />
                )}
                {ActionComponent}
            </Accordion.ItemContent>
        </Accordion.Item>
    );
};
