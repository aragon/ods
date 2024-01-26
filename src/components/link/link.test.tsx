import { fireEvent, render, screen } from '@testing-library/react';
import { Link, type ILinkProps } from '.';

describe('<Link /> component', () => {
    const createTestComponent = (props?: Partial<ILinkProps>) => {
        const completeProps: ILinkProps = { children: 'Default children', href: 'http://default.com', ...props };

        return <Link {...completeProps} />;
    };

    it('renders correctly with minimum props', () => {
        render(createTestComponent({ children: 'Example', href: 'http://example.com' }));
        const linkElement = screen.getByRole('link', { name: 'Example' });
        expect(linkElement).toBeInTheDocument();
        expect(linkElement).toHaveAttribute('href', 'http://example.com');
    });

    it('applies correct classes based on disabled prop', () => {
        render(createTestComponent({ children: 'Disabled Link', disabled: true }));
        const linkElement = screen.getByLabelText('Disabled Link');
        expect(linkElement).toHaveClass('truncate text-neutral-300 cursor-not-allowed');
    });

    it('prevents default behavior when clicked and disabled', () => {
        const handleClick = jest.fn();
        render(createTestComponent({ children: 'Disabled Link', disabled: true, onClick: handleClick }));
        const linkElement = screen.getByLabelText('Disabled Link');
        fireEvent.click(linkElement);
        expect(handleClick).not.toHaveBeenCalled();
    });

    it('does not have href attribute when disabled', () => {
        render(createTestComponent({ children: 'Disabled Link', disabled: true, href: 'http://example.com' }));
        const linkElement = screen.getByLabelText('Disabled Link');
        expect(linkElement).not.toHaveAttribute('href', 'http://example.com');
    });

    it('has correct aria attributes when disabled', () => {
        render(createTestComponent({ children: 'Disabled Link', disabled: true }));
        const linkElement = screen.getByLabelText('Disabled Link');
        expect(linkElement).toHaveAttribute('aria-disabled', 'true');
        expect(linkElement).toHaveAttribute('tabIndex', '-1');
    });

    it('renders correctly with no icon', () => {
        const children = 'Link without icon';
        render(createTestComponent({ children, href: 'http://example.com' }));
        const linkElement = screen.getByRole('link', { name: 'Link without icon' });
        expect(linkElement).toHaveTextContent(children);
    });
});
