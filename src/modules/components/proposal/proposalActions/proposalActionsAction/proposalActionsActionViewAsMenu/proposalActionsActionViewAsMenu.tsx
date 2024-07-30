import { Dropdown } from '../../../../../../core';

interface IProposalActionsActionViewAsMenuProps {
    /**
     * Value of the dropdown. @default 'basic'
     */
    dropdownValue: string;
    /**
     * Callback to handle dropdown change.
     */
    handleDropdownChange: (value: string) => void;
}

export const ProposalActionsActionViewAsMenu: React.FC<IProposalActionsActionViewAsMenuProps> = (props) => {
    const { dropdownValue, handleDropdownChange } = props;
    return (
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
    );
};
