import { Dropdown } from '../../../../../../core';
import { useOdsModulesContext } from '../../../../odsModulesProvider';

interface IProposalActionsActionViewAsMenuProps {
    dropdownValue: string;
    disableBasic: boolean;
    handleDropdownChange: (value: string) => void;
}

export const ProposalActionsActionViewAsMenu: React.FC<IProposalActionsActionViewAsMenuProps> = (props) => {
    const { dropdownValue, disableBasic, handleDropdownChange } = props;

    const { copy } = useOdsModulesContext();

    // TODO: Should remove this and update Dropdown.Item disabled prop logic (APP-3488)
    const basicEnabledClickHandler = () => {
        if (disableBasic) {
            return;
        }

        handleDropdownChange('basic');
    };

    return (
        <div className="mt-6 md:mt-8">
            <Dropdown.Container label={copy.proposalActionsActionViewAsMenu.dropdownLabel} size="sm" className="my-2">
                <Dropdown.Item
                    href="#"
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
