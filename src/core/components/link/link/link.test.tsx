import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
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

    it('applies correct classes based on disabled prop', async () => {
        const user = userEvent.setup();
        const handleClick = jest.fn();
        render(createTestComponent({ children: 'TEST', disabled: true, onClick: handleClick }));

        // eslint-disable-next-line testing-library/no-node-access
        const linkElement = screen.getByText('TEST').closest('a')!;
        await user.click(linkElement);

        expect(linkElement).toHaveAttribute('aria-disabled', 'true');
        expect(linkElement).not.toHaveAttribute('href');
        expect(handleClick).not.toHaveBeenCalled();
    });

    it('renders correctly with no icon', () => {
        const children = 'Link without icon';
        render(createTestComponent({ children, href: 'http://example.com' }));
        const linkElement = screen.getByRole('link', { name: 'Link without icon' });
        expect(linkElement).toHaveTextContent(children);
    });
});
