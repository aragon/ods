import type { IEmptyStateProps } from '../../emptyState';
import type { ICardProps } from '../card/';

export interface ICardEmptyStateProps extends Omit<IEmptyStateProps, 'isStacked'>, ICardProps {
    isStacked?: boolean;
}
