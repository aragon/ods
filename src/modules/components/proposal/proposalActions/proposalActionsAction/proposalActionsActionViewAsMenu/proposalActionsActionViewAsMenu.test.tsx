import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { modulesCopy } from '../../../../../assets';
import { ProposalActionsActionViewAsMenu } from './proposalActionsActionViewAsMenu';

describe('<ProposalActionsActionViewAsMenu /> component', () => {
    const mockHandleDropdownChange = jest.fn();

    const createTestComponent = (props?: Partial<React.ComponentProps<typeof ProposalActionsActionViewAsMenu>>) => {
        const defaultProps = {
            dropdownValue: 'basic',
            disableBasic: false,
            handleDropdownChange: mockHandleDropdownChange,
            ...props,
        };
        return <ProposalActionsActionViewAsMenu {...defaultProps} />;
    };

    it('calls handleDropdownChange with "basic" when basic item is clicked and not disabled', async () => {
        render(createTestComponent());
        await userEvent.click(screen.getByText(modulesCopy.proposalActionsActionViewAsMenu.dropdownLabel));
        const basicItem = screen.getByText(modulesCopy.proposalActionsActionViewAsMenu.basic);
        await userEvent.click(basicItem);
        expect(mockHandleDropdownChange).toHaveBeenCalledWith('basic');
    });

    // it('does not call handleDropdownChange with "basic" when basic item is clicked and disabled', async () => {
    //     render(createTestComponent({ disableBasic: true }));
    //     await userEvent.click(screen.getByText(modulesCopy.proposalActionsActionViewAsMenu.dropdownLabel));
    //     const basicItem = screen.getByText(modulesCopy.proposalActionsActionViewAsMenu.basic);
    //     await userEvent.click(basicItem);
    //     expect(mockHandleDropdownChange).not.toHaveBeenCalled();
    // });

    it('calls handleDropdownChange with "decoded" when decoded item is clicked', async () => {
        render(createTestComponent());
        await userEvent.click(screen.getByText(modulesCopy.proposalActionsActionViewAsMenu.dropdownLabel));
        const decodedItem = screen.getByText(modulesCopy.proposalActionsActionViewAsMenu.decoded);
        await userEvent.click(decodedItem);
        expect(mockHandleDropdownChange).toHaveBeenCalledWith('decoded');
    });

    it('calls handleDropdownChange with "raw" when raw item is clicked', async () => {
        render(createTestComponent());
        await userEvent.click(screen.getByText(modulesCopy.proposalActionsActionViewAsMenu.dropdownLabel));
        const rawItem = screen.getByText(modulesCopy.proposalActionsActionViewAsMenu.raw);
        await userEvent.click(rawItem);
        expect(mockHandleDropdownChange).toHaveBeenCalledWith('raw');
    });
});
