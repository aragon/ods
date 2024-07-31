import { Dropdown } from '../../../../../../core';
import { useOdsModulesContext } from '../../../../odsModulesProvider';

interface IProposalActionsActionViewAsMenuProps {
    /**
     * Value of the dropdown. @default 'basic'
     */
    dropdownValue: string;
    /**
     * Disable basic if there is no ActionComponent.
     */
    disableBasic: boolean;
    /**
     * Callback to handle dropdown change.
     */
    handleDropdownChange: (value: string) => void;
}

export const ProposalActionsActionViewAsMenu: React.FC<IProposalActionsActionViewAsMenuProps> = (props) => {
    const { dropdownValue, disableBasic, handleDropdownChange } = props;

    const { copy } = useOdsModulesContext();

    const basicEnabledClickHandler = () => {
        if (!disableBasic) {
            handleDropdownChange('basic');
        }
        return;
    };
    return (
        <div className="mt-6 md:mt-8">
            <Dropdown.Container label={copy.proposalActionsActionViewAsMenu.dropdownLabel} size="sm" className="my-2">
                <Dropdown.Item
                    onClick={basicEnabledClickHandler}
                    disabled={disableBasic}
                    selected={dropdownValue === 'basic'}
                >
                    {copy.proposalActionsActionViewAsMenu.basic}
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleDropdownChange('decoded')} selected={dropdownValue === 'decoded'}>
                    {copy.proposalActionsActionViewAsMenu.decoded}
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleDropdownChange('raw')} selected={dropdownValue === 'raw'}>
                    {copy.proposalActionsActionViewAsMenu.raw}
                </Dropdown.Item>
            </Dropdown.Container>
        </div>
    );
};
