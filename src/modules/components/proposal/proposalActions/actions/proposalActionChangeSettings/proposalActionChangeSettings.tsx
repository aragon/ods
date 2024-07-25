import { useState } from 'react';
import { DataList, DefinitionList, Toggle, ToggleGroup } from '../../../../../../core';
import { MemberDataListItem } from '../../../../member';
import { ProposalActionType, type IProposalActionComponentProps } from '../../proposalActionsTypes';
import {
    type IProposalActionChangeSettings,
    type IProposalActionChangeSettingsMultisig,
    type IProposalActionChangeSettingsTokenVote,
} from '../../proposalActionsTypes/proposalActionChangeSettings';

export interface IProposalActionChangeSettingsProps
    extends IProposalActionComponentProps<IProposalActionChangeSettings> {
    action: IProposalActionChangeSettings;
}

const ProposalActionChangeSettingsMultisigComponent: React.FC<{
    settings: IProposalActionChangeSettingsMultisig['existingSettings' | 'proposedSettings'];
}> = ({ settings }) => (
    <>
        <DefinitionList.Item term="Threshold">{settings.threshold}</DefinitionList.Item>
        <DefinitionList.Item term="Proposers">
            {settings.proposers.length === settings.currentMembers ? (
                'Any wallet'
            ) : (
                <DataList.Root entityLabel="Members">
                    <DataList.Container>
                        {settings.proposers.map((member) => (
                            <MemberDataListItem.Structure
                                key={member.address}
                                address={member.address}
                                ensName={member.name}
                            />
                        ))}
                    </DataList.Container>
                </DataList.Root>
            )}
        </DefinitionList.Item>
        {settings.additionalSettings?.map((setting, index) => (
            <DefinitionList.Item term={setting.term} key={index}>
                {setting.definition}
            </DefinitionList.Item>
        ))}
    </>
);

const ProposalActionChangeSettingsTokenVoteComponent: React.FC<{
    settings: IProposalActionChangeSettingsTokenVote['existingSettings' | 'proposedSettings'];
}> = ({ settings }) => (
    <>
        <DefinitionList.Item term="Token Symbol">{settings.tokenSymbol}</DefinitionList.Item>
        <DefinitionList.Item term="Support Threshold">{settings.supportThreshold}</DefinitionList.Item>
        <DefinitionList.Item term="Proposal Threshold">{settings.proposalThreshold}</DefinitionList.Item>
        <DefinitionList.Item term="Minimum Duration">{settings.minimumDuration}</DefinitionList.Item>
        <DefinitionList.Item term="Early Execution">{settings.earlyExecution ? 'Yes' : 'No'}</DefinitionList.Item>
        <DefinitionList.Item term="Vote Changes">{settings.voteChanges ? 'Yes' : 'No'}</DefinitionList.Item>
        {settings.additionalSettings?.map((setting, index) => (
            <DefinitionList.Item term={setting.term} key={index}>
                {setting.definition}
            </DefinitionList.Item>
        ))}
    </>
);

export const ProposalActionChangeSettings: React.FC<IProposalActionChangeSettingsProps> = (props) => {
    const { action } = props;
    const [toggleValue, setToggleValue] = useState<string | undefined>('existingSettings');
    const { proposedSettings, existingSettings } = action;
    const settingsToDisplay = toggleValue === 'proposedSettings' ? proposedSettings : existingSettings;

    return (
        <section className="p-4 md:p-6">
            <ToggleGroup value={toggleValue} onChange={setToggleValue} isMultiSelect={false}>
                <Toggle label="Existing" value="existingSettings" />
                <Toggle label="Proposed" value="proposedSettings" />
            </ToggleGroup>

            <DefinitionList.Container>
                {action.type === ProposalActionType.CHANGE_SETTINGS_MULTISIG && (
                    <ProposalActionChangeSettingsMultisigComponent
                        settings={
                            settingsToDisplay as IProposalActionChangeSettingsMultisig[
                                | 'existingSettings'
                                | 'proposedSettings']
                        }
                    />
                )}
                {action.type === ProposalActionType.CHANGE_SETTINGS_TOKENVOTE && (
                    <ProposalActionChangeSettingsTokenVoteComponent
                        settings={
                            settingsToDisplay as IProposalActionChangeSettingsTokenVote[
                                | 'existingSettings'
                                | 'proposedSettings']
                        }
                    />
                )}
            </DefinitionList.Container>
        </section>
    );
};
