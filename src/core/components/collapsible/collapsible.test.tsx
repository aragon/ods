import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { Collapsible } from './collapsible';
import { type ICollapsibleProps } from './collapsible.api';

describe('<Collapsible /> component', () => {
    const createTestComponent = (props?: Partial<ICollapsibleProps>) => {
        const completeProps = { ...props };

        return <Collapsible {...completeProps} />;
    };

    let originalResizeObserver: typeof global.ResizeObserver;

    beforeAll(() => {
        originalResizeObserver = global.ResizeObserver;
        global.ResizeObserver = class {
            observe() {}
            unobserve() {}
            disconnect() {}
        };
    });

    afterAll(() => {
        global.ResizeObserver = originalResizeObserver;
    });

    beforeEach(() => {
        jest.spyOn(HTMLElement.prototype, 'scrollHeight', 'get').mockReturnValue(500);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('renders without crashing', () => {
        const children = 'Default Children';
        render(createTestComponent({ children }));

        expect(screen.getByText('Default Children')).toBeInTheDocument();
    });

    it('uses default collapsedSize on collapsible content', () => {
        const children = 'Default Children';
        render(createTestComponent({ children }));

        const content = screen.getByText('Default Children');
        expect(content.style.maxHeight).toBe('256px');
    });

    it('applies customCollapsedHeight correctly', () => {
        const children = 'Default Children';
        const customCollapsedHeight = 150;
        render(createTestComponent({ children, customCollapsedHeight }));

        const content = screen.getByText('Default Children');
        expect(content.style.maxHeight).toBe('150px');
    });

    it('handles non-overflowing content correctly', () => {
        const children = 'Default Children';
        const customCollapsedHeight = 300;
        const buttonLabelOpened = 'Open';
        const buttonLabelClosed = 'Closed';
        jest.spyOn(HTMLElement.prototype, 'scrollHeight', 'get').mockReturnValue(200);
        render(createTestComponent({ children, customCollapsedHeight, buttonLabelClosed, buttonLabelOpened }));
        const content = screen.getByText('Default Children');
        expect(content.style.maxHeight).toBe('300px');
        expect(screen.queryByText(buttonLabelOpened)).not.toBeInTheDocument();
        expect(screen.queryByText(buttonLabelClosed)).not.toBeInTheDocument();
    });

    it('toggles opened/closed state when button is clicked', async () => {
        const buttonLabelOpened = 'Open';
        const buttonLabelClosed = 'Closed';

        render(createTestComponent({ buttonLabelOpened, buttonLabelClosed }));

        const button = screen.getByText('Closed');
        await userEvent.click(button);
        expect(button.textContent).toBe('Open');
        await userEvent.click(button);
        expect(button.textContent).toBe('Closed');
    });

    it('renders open when defaultOpen is true', () => {
        const children = 'Default Children';
        const defaultOpen = true;
        const buttonLabelOpened = 'Open';
        const buttonLabelClosed = 'Closed';
        render(createTestComponent({ children, buttonLabelOpened, buttonLabelClosed, defaultOpen }));
        const button = screen.getByRole('button');
        expect(button.textContent).toBe(buttonLabelOpened);
        expect(button.textContent).not.toBe(buttonLabelClosed);
    });

    it('calls the onToggle callback with the new state', async () => {
        const onToggle = jest.fn();
        render(createTestComponent({ onToggle }));

        const button = screen.getByRole('button');
        await userEvent.click(button);
        expect(onToggle).toHaveBeenCalledWith(true);
        await userEvent.click(button);
        expect(onToggle).toHaveBeenCalledWith(false);
    });

    it('renders custom button labels', async () => {
        const buttonLabelOpened = 'Collapse';
        const buttonLabelClosed = 'Expand';
        render(createTestComponent({ buttonLabelOpened, buttonLabelClosed }));

        expect(screen.getByText('Expand')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Expand'));
        expect(screen.getByText('Collapse')).toBeInTheDocument();
    });

    it('handles absence of buttonVariant using default button styles', async () => {
        const buttonLabelOpened = 'Collapse';
        const buttonLabelClosed = 'Expand';
        render(createTestComponent({ buttonLabelOpened, buttonLabelClosed }));

        const button = screen.getByRole('button');

        await userEvent.click(button);
        expect(button).toHaveTextContent('Collapse');
    });

    it('renders buttonVariant correctly', () => {
        const buttonVariant = 'primary';
        const buttonLabelClosed = 'Expand';
        render(createTestComponent({ buttonVariant, buttonLabelClosed }));

        const button = screen.getByRole('button');
        expect(button).toHaveClass('bg-primary-400');
        expect(button).toHaveTextContent('Expand');
    });

    it('shows overlay correctly instead of base footer when enabled', () => {
        const showOverlay = true;
        render(createTestComponent({ showOverlay }));
        const button = screen.getByRole('button');
        // eslint-disable-next-line testing-library/no-node-access
        expect(button.parentElement).not.toHaveClass('mt-4');
    });
});
