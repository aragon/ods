import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { Collapsible } from './collapsible';
import { type ICollapsibleProps } from './collapsible.api';

describe('<Collapsible />', () => {
    const createTestComponent = (props?: Partial<ICollapsibleProps>) => {
        const completeProps = { ...props };

        return <Collapsible {...completeProps} />;
    };

    it('renders without crashing', () => {
        const children = 'Default Children';
        render(createTestComponent({ children }));

        expect(screen.getByText('Default Children')).toBeInTheDocument();
    });

    it('toggles open/close state when button is clicked', async () => {
        const buttonLabelOpened = 'Open';
        const buttonLabelClosed = 'Closed';
        render(createTestComponent({ buttonLabelOpened, buttonLabelClosed }));

        const button = screen.getByText('Closed');
        await userEvent.click(button);
        expect(button.textContent).toBe('Open');
        await userEvent.click(button);
        expect(button.textContent).toBe('Closed');
    });

    it('applies customCollapsedSize when closed', () => {
        const children = 'Default Children';
        const customCollapsedHeight = 150;
        render(createTestComponent({ children, customCollapsedHeight }));

        const content = screen.getByText('Default Children');
        expect(content.style.height).toBe('150px');
    });

    it('uses default collapsedSize when closed', () => {
        const children = 'Default Children';
        const collapsedSize = 'sm';
        render(createTestComponent({ children, collapsedSize }));

        const content = screen.getByText('Default Children');
        expect(content.className).toContain('h-32');
    });

    it('renders open when defaultOpen is true', () => {
        const children = 'Default Children';
        const defaultOpen = true;
        render(createTestComponent({ children, defaultOpen }));
        const content = screen.getByText('Default Children');
        expect(content.className).toContain('h-auto');
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
});
