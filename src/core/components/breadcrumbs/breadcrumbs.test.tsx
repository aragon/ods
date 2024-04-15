import { render, screen } from '@testing-library/react';
import { type TagVariant } from '../..';
import { Breadcrumbs, type IBreadcrumbsProps, type UpToThreeCrumbs } from './breadcrumbs'; // Adjust the import path as necessary

describe('<Breadcrumbs /> component', () => {
    const createTestComponent = (props?: Partial<IBreadcrumbsProps>) => {
        const completeProps: IBreadcrumbsProps = {
            breadcrumbOrder: [{ href: '/', label: 'Root' }],
            currentPage: 'Current Page',
            ...props,
        };

        return <Breadcrumbs {...completeProps} />;
    };

    it('renders all provided path links', () => {
        const breadcrumbOrder = [
            { href: '/root', label: 'Root' },
            { href: '/page', label: 'Page' },
            { href: '/subpage', label: 'Subpage' },
        ] as UpToThreeCrumbs;

        render(createTestComponent({ breadcrumbOrder }));

        const links = screen.getAllByRole('link');
        expect(links.length).toBe(3);
        expect(links[0]).toHaveTextContent('Root');
        expect(links[1]).toHaveTextContent('Page');
        expect(links[2]).toHaveTextContent('Subpage');
    });

    it('displays the current location', () => {
        const currentPage = 'This page';
        render(createTestComponent({ currentPage }));

        expect(screen.getByText('This page')).toBeInTheDocument();
        expect(screen.getByText('This page')).toHaveAttribute('aria-current', 'page');
    });

    it('renders with the Tag component when props provided', () => {
        const tag = { label: 'Tag', variant: 'info' as TagVariant };
        render(createTestComponent({ tag }));

        const pillText = screen.getByText('Tag');
        expect(pillText).toBeInTheDocument();
    });
});
