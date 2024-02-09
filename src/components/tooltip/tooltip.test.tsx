import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { Tooltip, type ITooltipProps } from './tooltip';

describe('<Tooltip/> component', () => {
    const originalResizeObserver = global.ResizeObserver;

    beforeAll(() => {
        // mocking ResizeObserver since it's not available in Jest test environment
        global.ResizeObserver = jest.fn().mockImplementation(() => ({
            observe: jest.fn(),
            unobserve: jest.fn(),
            disconnect: jest.fn(),
        }));
    });

    afterAll(() => {
        global.ResizeObserver = originalResizeObserver;
    });

    const createTestComponent = (props?: Partial<ITooltipProps>) => {
        const completeProps: ITooltipProps = { content: 'test-content', ...props };

        return <Tooltip {...completeProps} />;
    };

    it(`does not render the tooltip content by default`, () => {
        const content = 'test-content';

        render(createTestComponent({ content }));

        expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
        expect(screen.queryByText(content)).not.toBeInTheDocument();
    });

    it(`renders the tooltip content when the trigger is hovered on`, async () => {
        const trigger = 'test-trigger';
        const content = 'test-content';

        render(createTestComponent({ content, children: trigger }));

        await userEvent.hover(screen.getByText(trigger));
        const tooltip = await screen.findByRole('tooltip');

        expect(tooltip).toBeInTheDocument();
        expect(tooltip).toHaveTextContent(content);
    });

    it('calls onOpenChange with true and false when trigger hovered on and unhovered respectively', async () => {
        const handleOpenChange = jest.fn();
        const trigger = 'test-trigger';

        const { rerender } = render(
            createTestComponent({ children: trigger, onOpenChange: handleOpenChange, open: false }),
        );

        // hover
        await userEvent.hover(screen.getByText(trigger));
        await waitFor(() => expect(handleOpenChange).toHaveBeenCalledWith(true));

        // unhover
        rerender(createTestComponent({ children: trigger, onOpenChange: handleOpenChange, open: true }));
        await userEvent.unhover(screen.getByText(trigger));
        await waitFor(() => expect(handleOpenChange).toHaveBeenCalledWith(false));
    });
});
