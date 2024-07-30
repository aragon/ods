import { useRef, useState } from 'react';
import { Accordion, Heading } from '../../../../../core';
import type { IWeb3ComponentProps } from '../../../../types';
import { useOdsModulesContext } from '../../../odsModulesProvider';
import { ProposalActionsActionVerification } from '../proposalActionsActionVerfication/proposalActionsActionVerfication';
import type { IProposalAction, ProposalActionComponent } from '../proposalActionsTypes';
import { proposalActionsUtils } from '../proposalActionsUtils';
import { ProposalActionsActionDecodedView } from './proposalActionsActionDecodedView/proposalActionsActionDecodedView';
import { ProposalActionsActionRawView } from './proposalActionsActionRawView/proposalActionsActionRawView';
import { ProposalActionsActionViewAsMenu } from './proposalActionsActionViewAsMenu/proposalActionsActionViewAsMenu';

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
    customComponent?: ProposalActionComponent;
}

export const ProposalActionsAction: React.FC<IProposalActionsActionProps> = (props) => {
    const { action, index, name, customComponent, ...web3Props } = props;

    const { copy } = useOdsModulesContext();
    
    const contentRef = useRef<HTMLDivElement>(null);
    const itemRef = useRef<HTMLDivElement>(null);

    const ActionComponent = customComponent ?? proposalActionsUtils.getActionComponent(action);

    const [dropdownValue, setDropdownValue] = useState(ActionComponent ? 'basic' : 'decoded');

    const isDisabled = action.inputData == null;

    const handleDropdownChange = (value: string) => {
        if (contentRef?.current == null) {
            return;
        }

        const { style, scrollHeight } = contentRef.current;

        style.setProperty('--radix-collapsible-content-height', scrollHeight.toString());

        setDropdownValue(value);

        if (itemRef.current) {
            itemRef.current.scrollIntoView({ behavior: 'instant', block: 'center' });
        }
    };

    return (
        <Accordion.Item value={isDisabled ? '' : `${index}`} disabled={isDisabled} ref={itemRef}>
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
                {dropdownValue === 'basic' && ActionComponent && <ActionComponent action={action} {...web3Props} />}
                {dropdownValue === 'decoded' && <ProposalActionsActionDecodedView action={action} />}
                {dropdownValue === 'raw' && <ProposalActionsActionRawView action={action} />}

                <ProposalActionsActionViewAsMenu
                    disableBasic={ActionComponent == null}
                    dropdownValue={dropdownValue}
                    handleDropdownChange={handleDropdownChange}
                />
            </Accordion.ItemContent>
        </Accordion.Item>
    );
};
