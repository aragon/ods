import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { modulesCopy } from '../../../../../assets';
import { ProposalActionViewMode } from '../proposalActionsAction';
import { ProposalActionsActionViewAsMenu } from './proposalActionsActionViewAsMenu';

describe('<ProposalActionsActionViewAsMenu /> component', () => {
    const onViewModeChange = jest.fn();

    const createTestComponent = (props?: Partial<React.ComponentProps<typeof ProposalActionsActionViewAsMenu>>) => {
        const defaultProps = {
            viewMode: ProposalActionViewMode.BASIC_VIEW,
            disableBasic: false,
            disableDecoded: false,
            onViewModeChange: onViewModeChange,
            ...props,
        };

        return <ProposalActionsActionViewAsMenu {...defaultProps} />;
    };

    beforeEach(() => {
        onViewModeChange.mockClear();
    });

    it('calls ViewModeChange with "basic" when basic item is clicked and not disabled', async () => {
        render(createTestComponent());
        await userEvent.click(screen.getByText(modulesCopy.proposalActionsActionViewAsMenu.dropdownLabel));
        const basicItem = screen.getByText(modulesCopy.proposalActionsActionViewAsMenu.basic);
        await userEvent.click(basicItem);
        expect(onViewModeChange).toHaveBeenCalledWith(ProposalActionViewMode.BASIC_VIEW);
    });

    it('does not call ViewModeChange with "basic" when basic item is clicked and disabled', async () => {
        render(createTestComponent({ disableBasic: true }));
        await userEvent.click(screen.getByText(modulesCopy.proposalActionsActionViewAsMenu.dropdownLabel));
        const basicItem = screen.getByText(modulesCopy.proposalActionsActionViewAsMenu.basic);
        await userEvent.click(basicItem);
        expect(onViewModeChange).not.toHaveBeenCalled();
    });

    it('calls ViewModeChange with "decoded" when decoded item is clicked', async () => {
        render(createTestComponent());
        await userEvent.click(screen.getByText(modulesCopy.proposalActionsActionViewAsMenu.dropdownLabel));
        const decodedItem = screen.getByText(modulesCopy.proposalActionsActionViewAsMenu.decoded);
        await userEvent.click(decodedItem);
        expect(onViewModeChange).toHaveBeenCalledWith(ProposalActionViewMode.DECODED_VIEW);
    });

    it('calls ViewModeChange with "raw" when raw item is clicked', async () => {
        render(createTestComponent());
        await userEvent.click(screen.getByText(modulesCopy.proposalActionsActionViewAsMenu.dropdownLabel));
        const rawItem = screen.getByText(modulesCopy.proposalActionsActionViewAsMenu.raw);
        await userEvent.click(rawItem);
        expect(onViewModeChange).toHaveBeenCalledWith(ProposalActionViewMode.RAW_VIEW);
    });
});
