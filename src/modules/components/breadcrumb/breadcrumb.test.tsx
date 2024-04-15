import { render, screen } from '@testing-library/react';
import { type TagVariant } from '../../../core';
import { Breadcrumb, type IBreadcrumbProps, type UpToThreePaths } from './breadcrumb'; // Adjust the import path as necessary

describe('Breadcrumb', () => {
    const createTestComponent = (props?: Partial<IBreadcrumbProps>) => {
        const completeProps: IBreadcrumbProps = {
            pathOrder: [{ href: '/', label: 'Root' }],
            currentPage: 'Current Page',
            ...props,
        };

        return <Breadcrumb {...completeProps} />;
    };

    it('renders all provided path links', () => {
        const pathOrder = [
            { href: '/root', label: 'Root' },
            { href: '/page', label: 'Page' },
            { href: '/subpage', label: 'Subpage' },
        ] as UpToThreePaths;

        render(createTestComponent({ pathOrder }));

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
