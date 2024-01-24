import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { IconType } from '../icon';
import { Link } from './link';

describe('Link', () => {
    it('renders correctly with minimum props', () => {
        render(<Link label="Example" href="http://example.com" />);
        const linkElement = screen.getByTestId('link');
        expect(linkElement).toBeInTheDocument();
        expect(linkElement).toHaveAttribute('href', 'http://example.com');
        expect(screen.getByText('Example')).toBeInTheDocument();
    });

    it('applies correct classes based on variant and disabled props', () => {
        const { rerender } = render(<Link label="Primary Link" variant="primary" />);
        let linkElement = screen.getByTestId('link');
        expect(linkElement).toHaveClass('text-primary-400');

        rerender(<Link label="Neutral Link" variant="neutral" />);
        linkElement = screen.getByTestId('link');
        expect(linkElement).toHaveClass('text-neutral-500');

        rerender(<Link label="Disabled Link" disabled />);
        linkElement = screen.getByTestId('link');
        expect(linkElement).toHaveClass('truncate text-neutral-300 cursor-not-allowed');
    });

    it('prevents default behavior when clicked and disabled', () => {
        const handleClick = jest.fn();
        render(<Link label="Disabled Link" disabled onClick={handleClick} />);
        const linkElement = screen.getByTestId('link');
        fireEvent.click(linkElement);
        expect(handleClick).not.toHaveBeenCalled();
    });

    it('does not have href attribute when disabled', () => {
        render(<Link label="Disabled Link" disabled href="http://example.com" />);
        const linkElement = screen.getByTestId('link');
        expect(linkElement).not.toHaveAttribute('href', 'http://example.com');
    });

    it('has correct attributes when link is external', () => {
        render(<Link label="External Link" external href="http://example.com" />);
        const linkElement = screen.getByTestId('link');
        expect(linkElement).toHaveAttribute('target', '_blank');
        expect(linkElement).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('has correct aria attributes when disabled', () => {
        render(<Link label="Disabled Link" disabled />);
        const linkElement = screen.getByTestId('link');
        expect(linkElement).toHaveAttribute('aria-disabled', 'true');
        expect(linkElement).toHaveAttribute('tabIndex', '-1');
    });

    it('fires click event when not disabled', () => {
        const handleClick = jest.fn();
        render(<Link label="Clickable Link" href="http://example.com" onClick={handleClick} />);
        const linkElement = screen.getByTestId('link');
        fireEvent.click(linkElement);
        expect(handleClick).toHaveBeenCalled();
    });

    it.each(Object.values(IconType))('renders correctly with %s icon', async (icon) => {
        render(<Link label={`Link with ${icon} icon`} href="http://example.com" iconRight={icon} />);
        const iconElement = await screen.findByTestId(icon);
        expect(iconElement).toBeInTheDocument();
        expect(screen.getByText(`Link with ${icon} icon`)).toBeInTheDocument();
    });

    it('renders correctly with no icon', () => {
        const label = 'Link without icon';
        render(<Link label={label} href="http://example.com" />);
        const linkElement = screen.getByTestId('link');
        expect(linkElement).toHaveTextContent(label);
    });
    it('receives focus when tabbed to', () => {
        render(<Link label="Clickable Link" href="http://example.com" />);
        const linkElement = screen.getByTestId('link');
        fireEvent.keyDown(linkElement, { key: 'Tab', code: 'Tab' });
        expect(linkElement).toHaveClass('test-focus');
    });
});
