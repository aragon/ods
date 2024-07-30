import { useRef, useState } from 'react';
import {
    Accordion,
    Button,
    clipboardUtils,
    Dropdown,
    Heading,
    InputContainer,
    InputNumber,
    InputText,
    TextArea,
} from '../../../../../core';
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
    const itemRef = useRef<HTMLDivElement>(null);

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

        if (itemRef.current) {
            itemRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
                {dropdownValue === 'decoded' && (
                    <div key={index} className="flex flex-col gap-y-3">
                        <div key={index} className="flex flex-col gap-y-2">
                            <InputContainer
                                label="Value"
                                helpText="Amount of ETH to transfer to the smart contract"
                                id={`${index}`}
                            >
                                <InputNumber value={action.value ?? 0} disabled={true} />
                            </InputContainer>
                        </div>
                        {action.inputData &&
                            action.inputData.parameters.map((parameter, index) => (
                                <div key={index} className="flex flex-col gap-y-2">
                                    <InputContainer
                                        label={parameter.type}
                                        helpText="Natspec placeholder"
                                        id={`${index}`}
                                    >
                                        <InputText value={parameter.value} disabled={true} />
                                    </InputContainer>
                                </div>
                            ))}
                    </div>
                )}
                {dropdownValue === 'raw' && (
                    <div key={index} className="flex flex-col gap-y-3">
                        <div key={index} className="flex flex-col gap-y-2">
                            <InputContainer label="Value" id={`${index}`}>
                                <InputNumber value={action.value ?? 0} disabled={true} />
                            </InputContainer>
                            <InputContainer label="To" id={`${index}`}>
                                <InputText value={action.to} disabled={true} />
                            </InputContainer>
                            <InputContainer label="Data" id={`${index}`}>
                                <TextArea value={action.data} disabled={true} />
                            </InputContainer>
                            <Button
                                className="self-end"
                                variant="tertiary"
                                size="md"
                                onClick={() => clipboardUtils.copy(action.data)}
                            >
                                Copy data
                            </Button>
                        </div>
                    </div>
                )}
                <div className="mt-6 md:mt-8">
                    <Dropdown.Container label="View action as" size="sm" className="my-2">
                        <Dropdown.Item
                            onClick={() => handleDropdownChange('basic')}
                            disabled={dropdownValue === 'basic'}
                            selected={dropdownValue === 'basic'}
                        >
                            Basic
                        </Dropdown.Item>
                        <Dropdown.Item
                            onClick={() => handleDropdownChange('decoded')}
                            disabled={dropdownValue === 'decoded'}
                            selected={dropdownValue === 'decoded'}
                        >
                            Decoded
                        </Dropdown.Item>
                        <Dropdown.Item
                            onClick={() => handleDropdownChange('raw')}
                            disabled={dropdownValue === 'raw'}
                            selected={dropdownValue === 'raw'}
                        >
                            Raw
                        </Dropdown.Item>
                    </Dropdown.Container>
                </div>
            </Accordion.ItemContent>
        </Accordion.Item>
    );
};
