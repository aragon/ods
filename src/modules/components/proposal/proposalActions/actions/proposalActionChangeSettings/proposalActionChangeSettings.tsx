import { useState } from 'react';
import { DefinitionList, Toggle, ToggleGroup } from '../../../../../../core';
import { useOdsModulesContext } from '../../../../odsModulesProvider';
import { type IProposalActionChangeSettings, type IProposalActionComponentProps } from '../../proposalActionsTypes';

export interface IProposalActionChangeSettingsProps
    extends IProposalActionComponentProps<IProposalActionChangeSettings> {}

export const ProposalActionChangeSettings: React.FC<IProposalActionChangeSettingsProps> = (props) => {
    const { action } = props;

    const { copy } = useOdsModulesContext();

    const [toggleValue, setToggleValue] = useState<string | undefined>('existingSettings');
    const settingsToDisplay = toggleValue === 'proposedSettings' ? proposedSettings : existingSettings;

    const { proposedSettings, existingSettings } = action;

    return (
        <div className="flex w-full flex-col gap-2">
            <ToggleGroup value={toggleValue} onChange={setToggleValue} isMultiSelect={false}>
                <Toggle label={copy.proposalActionsChangeSettings.existingToggle} value="existingSettings" />
                <Toggle label={copy.proposalActionsChangeSettings.proposedToggle} value="proposedSettings" />
            </ToggleGroup>

            <DefinitionList.Container>
                {settingsToDisplay.map((setting, index) => (
                    <DefinitionList.Item term={setting.term} key={index}>
                        {setting.definition}
                    </DefinitionList.Item>
                ))}
            </DefinitionList.Container>
        </div>
    );
};
