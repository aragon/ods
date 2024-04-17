import { render, screen } from '@testing-library/react';
import { Breadcrumbs, type IBreadcrumbsProps } from './breadcrumbs'; // Adjust the import path as necessary

describe('<Breadcrumbs /> component', () => {
    const createTestComponent = (props?: Partial<IBreadcrumbsProps>) => {
        const completeProps: IBreadcrumbsProps = {
            links: [{ href: '/', label: 'Root' }],
            ...props,
        };

        return <Breadcrumbs {...completeProps} />;
    };

    it('renders all provided path links', () => {
        const links = [
            { href: '/', label: 'Root' },
            { href: '/page', label: 'Page' },
            { href: '/page/subpage', label: 'Subpage' },
            { href: '/page/subpage/current/', label: 'Current page' },
        ];
        render(createTestComponent({ links }));

        const renderedLinks = screen.getAllByRole('link');
        expect(renderedLinks.length).toBe(3);
        expect(renderedLinks[0]).toHaveTextContent('Root');
        expect(renderedLinks[1]).toHaveTextContent('Page');
        expect(renderedLinks[2]).toHaveTextContent('Subpage');
    });

    it('displays the current location correctly', () => {
        const links = [
            { label: 'Root', href: '/' },
            { label: 'This page', href: '/current' },
        ];
        render(createTestComponent({ links }));

        const currentPage = screen.getByText('This page');
        expect(currentPage).toBeInTheDocument();
        expect(currentPage).toHaveAttribute('aria-current', 'page');
        expect(currentPage).not.toHaveAttribute('href');
    });

    it('renders with the Tag component when props provided', () => {
        const tag = { label: 'Tag', variant: 'info' as const };
        render(createTestComponent({ tag }));

        const pillText = screen.getByText('Tag');
        expect(pillText).toBeInTheDocument();
    });
});
