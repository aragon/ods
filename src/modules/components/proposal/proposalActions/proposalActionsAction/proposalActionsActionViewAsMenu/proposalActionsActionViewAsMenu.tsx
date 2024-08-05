import { Dropdown } from '../../../../../../core';
import { useOdsModulesContext } from '../../../../odsModulesProvider';
import { ProposalActionViewMode } from '../proposalActionsAction';

export interface IProposalActionsActionViewAsMenuProps {
    /**
     * Current selected view mode for the action.
     */
    viewMode: string;
    /**
     * Flag to disable basic view mode.
     */
    disableBasic: boolean;
    /**
     * Flag to disable decoded view mode.
     */
    disableDecoded: boolean;
    /**
     * Callback to handle dropdown value change.
     */
    onViewModeChange: (value: ProposalActionViewMode) => void;
}

export const ProposalActionsActionViewAsMenu: React.FC<IProposalActionsActionViewAsMenuProps> = (props) => {
    const { viewMode, disableBasic, disableDecoded, onViewModeChange } = props;

    const { copy } = useOdsModulesContext();

    return (
        <Dropdown.Container label={copy.proposalActionsActionViewAsMenu.dropdownLabel} size="sm">
            <Dropdown.Item
                onSelect={() => !disableBasic && onViewModeChange(ProposalActionViewMode.BASIC_VIEW)}
                disabled={disableBasic}
                selected={viewMode === 'basic'}
            >
                {copy.proposalActionsActionViewAsMenu.basic}
            </Dropdown.Item>
            <Dropdown.Item
                onSelect={() => onViewModeChange(ProposalActionViewMode.DECODED_VIEW)}
                disabled={disableDecoded}
                selected={viewMode === ProposalActionViewMode.DECODED_VIEW}
            >
                {copy.proposalActionsActionViewAsMenu.decoded}
            </Dropdown.Item>
            <Dropdown.Item
                onSelect={() => onViewModeChange(ProposalActionViewMode.RAW_VIEW)}
                selected={viewMode === ProposalActionViewMode.RAW_VIEW}
            >
                {copy.proposalActionsActionViewAsMenu.raw}
            </Dropdown.Item>
        </Dropdown.Container>
    );
};
