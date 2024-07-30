import { useRef, useState } from 'react';
import { Accordion, Dropdown, Heading, InputContainer, InputNumber, InputText } from '../../../../../core';
import type { IWeb3ComponentProps } from '../../../../types';
import { useOdsModulesContext } from '../../../odsModulesProvider';
import { ProposalActionsActionVerification } from '../proposalActionsActionVerfication/proposalActionsActionVerfication';
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
    customComponent?: ProposalActionComponent;
}

export const ProposalActionsAction: React.FC<IProposalActionsActionProps> = (props) => {
    const { action, index, name, customComponent, ...web3Props } = props;

    const [dropdownValue, setDropdownValue] = useState('basic');

    const contentRef = useRef<HTMLDivElement>(null);

    const ActionComponent = customComponent ?? proposalActionsUtils.getActionComponent(action);

    const { copy } = useOdsModulesContext();

    const isDisabled = action.inputData == null;

    const handleDropdownChange = (value: string) => {
        if (contentRef?.current == null) {
            return;
        }

        const { style, scrollHeight } = contentRef.current;

        style.setProperty('--radix-collapsible-content-height', scrollHeight.toString());

        setDropdownValue(value);
    };

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
            <Accordion.ItemContent ref={contentRef}>
                {dropdownValue === 'basic' && ActionComponent && <ActionComponent action={action} {...web3Props} />}
                {dropdownValue === 'decoded' && (
                    <div key={index} className="flex flex-col gap-y-3">
                        <div key={index} className="flex flex-col gap-y-2">
                            <div>
                                <Heading size="h5">Value</Heading>
                                <p className="text-sm text-neutral-400">Natspec placeholder</p>
                            </div>
                            <InputContainer id={`${index}`}>
                                <InputNumber value={action.value ?? 0} disabled={true} />
                            </InputContainer>
                        </div>
                        {action.inputData &&
                            action.inputData.parameters.map((parameter, index) => (
                                <div key={index} className="flex flex-col gap-y-2">
                                    <div>
                                        <Heading size="h5">{parameter.type}</Heading>
                                        <p className="text-sm text-neutral-400">Natspec placeholder</p>
                                    </div>
                                    <InputContainer id={`${index}`}>
                                        <InputText value={parameter.value} disabled={true} />
                                    </InputContainer>
                                </div>
                            ))}
                    </div>
                )}
                {dropdownValue === 'raw' && <div>RAW VIEW</div>}
                <div className="mt-6 md:mt-8">
                    <Dropdown.Container label="View action as" size="sm" className="my-2">
                        <Dropdown.Item onClick={() => handleDropdownChange('basic')}>Basic</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleDropdownChange('decoded')}>Decoded</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleDropdownChange('raw')}>Raw</Dropdown.Item>
                    </Dropdown.Container>
                </div>
            </Accordion.ItemContent>
        </Accordion.Item>
    );
};
