import { useMemo, useRef, useState } from 'react';
import { Accordion, Heading } from '../../../../../core';
import type { IWeb3ComponentProps } from '../../../../types';
import { useOdsModulesContext } from '../../../odsModulesProvider';
import {
    ProposalActionChangeMembers,
    ProposalActionChangeSettings,
    ProposalActionTokenMint,
    ProposalActionUpdateMetadata,
    ProposalActionWithdrawToken,
} from '../actions';
import { ProposalActionsActionVerification } from '../proposalActionsActionVerfication/proposalActionsActionVerfication';
import type { IProposalAction, ProposalActionComponent } from '../proposalActionsTypes';
import { proposalActionsUtils } from '../proposalActionsUtils';
import { ProposalActionsActionDecodedView } from './proposalActionsActionDecodedView';
import { ProposalActionsActionRawView } from './proposalActionsActionRawView';
import { ProposalActionsActionViewAsMenu } from './proposalActionsActionViewAsMenu';

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

export enum ProposalActionViewMode {
    BASIC_VIEW = 'basic',
    DECODED_VIEW = 'decoded',
    RAW_VIEW = 'raw',
}

export const ProposalActionsAction: React.FC<IProposalActionsActionProps> = (props) => {
    const { action, index, name, CustomComponent, ...web3Props } = props;

    const { copy } = useOdsModulesContext();

    const contentRef = useRef<HTMLDivElement>(null);
    const itemRef = useRef<HTMLDivElement>(null);

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

    const [viewMode, setViewMode] = useState(
        ActionComponent
            ? ProposalActionViewMode.BASIC_VIEW
            : action.inputData
              ? ProposalActionViewMode.DECODED_VIEW
              : ProposalActionViewMode.RAW_VIEW,
    );

    const onViewModeChange = (value: ProposalActionViewMode) => {
        if (contentRef?.current == null) {
            return;
        }

        const { style, scrollHeight } = contentRef.current;

        style.setProperty('--radix-collapsible-content-height', scrollHeight.toString());

        setViewMode(value);

        if (itemRef.current) {
            itemRef.current.scrollIntoView({ behavior: 'instant', block: 'center' });
        }
    };

    return (
        <Accordion.Item value={`${index}`} ref={itemRef}>
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
            <Accordion.ItemContent ref={contentRef}>
                <div className="flex flex-col items-start gap-y-6 md:gap-y-8">
                    {viewMode === ProposalActionViewMode.BASIC_VIEW && ActionComponent}
                    {viewMode === ProposalActionViewMode.DECODED_VIEW && (
                        <ProposalActionsActionDecodedView action={action} />
                    )}
                    {viewMode === ProposalActionViewMode.RAW_VIEW && <ProposalActionsActionRawView action={action} />}

                    <ProposalActionsActionViewAsMenu
                        disableBasic={ActionComponent == null}
                        disableDecoded={action.inputData == null}
                        viewMode={viewMode}
                        onViewModeChange={onViewModeChange}
                    />
                </div>
            </Accordion.ItemContent>
        </Accordion.Item>
    );
};
