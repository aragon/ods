import { fireEvent, render, screen } from '@testing-library/react';
import { CardCollapsible, type ICollapsibleCardProps } from './cardCollapsible'; // Ensure the correct path is used

describe('<CardCollapsible />', () => {
    const createTestComponent = (props?: Partial<ICollapsibleCardProps>) => {
        const completeProps = { ...props };

        return <CardCollapsible {...completeProps} />;
    };

    it('renders without crashing', () => {
        const children = 'Content of the card';
        render(createTestComponent({ children }));
        expect(screen.getByText('Content of the card')).toBeInTheDocument();
    });

    it('passes initial open state correctly', () => {
        const defaultOpen = true;
        const buttonLabelOpened = 'Open';
        render(createTestComponent({ defaultOpen, buttonLabelOpened }));

        expect(screen.getByText('Open')).toBeInTheDocument();
    });

    it('toggles visibility on button click', () => {
        render(createTestComponent({ buttonLabelOpened: 'Open', buttonLabelClosed: 'Closed' }));
        const button = screen.getByText('Closed');
        fireEvent.click(button);
        expect(button.textContent).toBe('Open');
        fireEvent.click(button);
        expect(button.textContent).toBe('Closed');
    });

    it('applies custom styles when toggled', () => {
        const children = 'Content of the card';
        render(createTestComponent({ children }));
        const button = screen.getByRole('button');
        fireEvent.click(button);
        // eslint-disable-next-line testing-library/no-node-access
        const blinder = button.parentElement as HTMLElement;

        expect(blinder.className).toContain('h-32');
    });

    it('renders with the correct collapsedCard class', () => {
        const children = 'Content of the card';
        render(createTestComponent({ children }));
        // eslint-disable-next-line testing-library/no-node-access
        const content = screen.getByText('Content of the card').parentNode?.parentNode as HTMLElement;
        screen.debug(content);
        expect(content.className).toContain('relative px-4 pt-4 transition-all duration-300 md:px-6 md:pt-6');
    });

    it('handles custom collapsed size', () => {
        const children = 'Content of the card';
        const customCollapsedSize = 200;
        render(createTestComponent({ children, customCollapsedSize }));
        // eslint-disable-next-line testing-library/no-node-access
        const content = screen.getByText('Content of the card').parentNode as HTMLElement;

        expect(content.style.height).toBe(`${customCollapsedSize}px`);
    });
});
