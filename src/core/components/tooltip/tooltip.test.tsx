import { act, render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { type ITooltipProps, Tooltip } from './tooltip';

describe('<Tooltip/> component', () => {
    const createTestComponent = (props?: Partial<ITooltipProps>) => {
        const completeProps: ITooltipProps = { content: 'test-content', ...props };

        return <Tooltip {...completeProps} />;
    };

    it('does not render the tooltip content by default', () => {
        const content = 'test-content';

        render(createTestComponent({ content }));

        expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
        expect(screen.queryByText(content)).not.toBeInTheDocument();
    });

    it('renders the tooltip content when the trigger is hovered on', async () => {
        const user = userEvent.setup();
        const trigger = 'test-trigger';
        const content = 'test-content';

        render(createTestComponent({ content, children: trigger }));

        await user.hover(screen.getByText(trigger));
        const tooltip = await screen.findByRole('tooltip');

        expect(tooltip).toBeInTheDocument();
        expect(tooltip).toHaveTextContent(content);
    });

    it('calls onOpenChange with true on trigger hover', async () => {
        const user = userEvent.setup();
        const handleOpenChange = jest.fn();
        const trigger = 'test-trigger';

        render(createTestComponent({ children: trigger, onOpenChange: handleOpenChange }));

        await user.hover(screen.getByText(trigger));
        await waitFor(() => expect(handleOpenChange).toHaveBeenCalledWith(true));
    });

    it('renders the tooltip content when the trigger is focused with the keyboard', async () => {
        const user = userEvent.setup();
        const content = 'test-content';

        render(
            createTestComponent({
                content,
                triggerAsChild: true,
                children: <button type="button">test-trigger</button>,
            }),
        );

        await user.tab();

        expect(screen.getByRole('button')).toHaveFocus();
        expect(await screen.findByRole('tooltip')).toHaveTextContent(content);
    });

    it('does not render the tooltip content when the trigger is focused without a preceding key press', async () => {
        const user = userEvent.setup();

        render(
            createTestComponent({
                triggerAsChild: true,
                children: <button type="button">test-trigger</button>,
            }),
        );

        const trigger = screen.getByRole('button');

        // A pointer interaction makes the focus that follows pointer-driven, the way a dialog opened by click does.
        await user.click(document.body);
        await act(() => {
            trigger.focus();
        });

        expect(trigger).toHaveFocus();
        expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    });
});
