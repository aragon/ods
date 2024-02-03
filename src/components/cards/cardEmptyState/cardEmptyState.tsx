import {
    EmptyState,
    type IEmptyStateNonStacked,
    type IEmptyStateProps,
    type IEmptyStateStacked,
} from '../../emptyState';
import { Card, type ICardProps } from '../card/';

export interface ICardEmptyStateProps extends Omit<IEmptyStateProps, 'isStacked'>, ICardProps {
    isStacked?: boolean; // Optional to allow for dynamic setting
}

export const CardEmptyState: React.FC<ICardEmptyStateProps> = ({ isStacked = true, ...otherProps }) => {
    const emptyStateProps: IEmptyStateProps = isStacked
        ? ({ ...otherProps, isStacked: true as const } as IEmptyStateStacked)
        : ({ ...otherProps, isStacked: false as const } as IEmptyStateNonStacked);

    return (
        <Card {...otherProps}>
            <EmptyState {...emptyStateProps} />
        </Card>
    );
};
