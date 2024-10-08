import { render, screen } from '@testing-library/react';
import { DaoDataListItem, type IDaoDataListItemSkeletonProps } from '../../daoDataListItem';

describe('<DaoDataListItem.Skeleton /> component', () => {
    const createTestComponent = (props?: Partial<IDaoDataListItemSkeletonProps>) => {
        const completeProps: IDaoDataListItemSkeletonProps = { ...props };

        return <DaoDataListItem.Skeleton {...completeProps} />;
    };
    it('has correct accessibility attributes', () => {
        render(createTestComponent());
        const listItem = screen.getByLabelText('loading');
        expect(listItem).toHaveAttribute('aria-busy', 'true');
        expect(listItem).toHaveAttribute('tabIndex', '0');
    });
});
