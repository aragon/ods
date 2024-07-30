import { Dropdown } from '../../../../../../core';

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

    const basicEnabledClickHandler = () => {
        if (!disableBasic) {
            handleDropdownChange('basic');
        }
        return;
    };
    return (
        <div className="mt-6 md:mt-8">
            <Dropdown.Container label="View action as" size="sm" className="my-2">
                <Dropdown.Item
                    onClick={basicEnabledClickHandler}
                    disabled={disableBasic}
                    selected={dropdownValue === 'basic'}
                >
                    Basic
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleDropdownChange('decoded')} selected={dropdownValue === 'decoded'}>
                    Decoded
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleDropdownChange('raw')} selected={dropdownValue === 'raw'}>
                    Raw
                </Dropdown.Item>
            </Dropdown.Container>
        </div>
    );
};
