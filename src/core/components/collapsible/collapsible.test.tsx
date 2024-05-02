import { fireEvent, render, screen } from '@testing-library/react';
import { Collapsible } from './collapsible'; // Ensure the correct path is used
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

    it('toggles open/close state when button is clicked', () => {
        const buttonLabelOpened = 'Open';
        const buttonLabelClosed = 'Closed';
        render(createTestComponent({ buttonLabelOpened, buttonLabelClosed }));

        const button = screen.getByText('Closed');
        fireEvent.click(button);
        expect(button.textContent).toBe('Open');
        fireEvent.click(button);
        expect(button.textContent).toBe('Closed');
    });

    it('applies customCollapsedSize when closed', () => {
        const children = 'Default Children';
        const customCollapsedSize = 150;
        render(createTestComponent({ children, customCollapsedSize }));

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

    it('handles the onToggle callback correctly', () => {
        const onToggle = jest.fn();
        render(createTestComponent({ onToggle }));

        const button = screen.getByRole('button');
        fireEvent.click(button);
        expect(onToggle).toHaveBeenCalledWith(true);
        fireEvent.click(button);
        expect(onToggle).toHaveBeenCalledWith(false);
    });

    it('renders custom button labels', () => {
        const buttonLabelOpened = 'Collapse';
        const buttonLabelClosed = 'Expand';
        render(createTestComponent({ buttonLabelOpened, buttonLabelClosed }));

        expect(screen.getByText('Expand')).toBeInTheDocument();
        fireEvent.click(screen.getByText('Expand'));
        expect(screen.getByText('Collapse')).toBeInTheDocument();
    });

    it('handles absence of buttonVariant using default button styles', () => {
        const buttonLabelOpened = 'Collapse';
        const buttonLabelClosed = 'Expand';
        render(createTestComponent({ buttonLabelOpened, buttonLabelClosed }));

        const button = screen.getByText('Expand');
        expect(button).toHaveClass(
            'group flex items-center text-primary-400 hover:text-primary-600 active:text-primary-800',
        );
        fireEvent.click(button);
        expect(screen.getByText('Collapse')).toHaveClass(
            'group flex items-center text-primary-400 hover:text-primary-600 active:text-primary-800',
        );
    });

    it('renders buttonVariant correctly', () => {
        const buttonVariant = 'primary';
        const buttonLabelOpened = 'Collapse';
        const buttonLabelClosed = 'Expand';
        render(createTestComponent({ buttonVariant, buttonLabelOpened, buttonLabelClosed }));

        const button = screen.getByRole('button');
        expect(button).toHaveClass('bg-primary-400');
        expect(screen.getByText('Expand')).toBeInTheDocument();
        fireEvent.click(button);
        expect(screen.getByText('Collapse')).toBeInTheDocument();
    });
});
