import {
    EmptyState,
    type IEmptyStateNonStacked,
    type IEmptyStateProps,
    type IEmptyStateStacked,
} from '../../emptyState';
import { Card } from '../card/';

interface CardEmptyStateProps extends Omit<IEmptyStateProps, 'isStacked'> {
    className?: string;
    isStacked?: boolean;
}

export const CardEmptyState: React.FC<CardEmptyStateProps> = ({ className, isStacked = true, ...otherProps }) => {
    const emptyStateProps: IEmptyStateProps = isStacked
        ? ({ ...otherProps, isStacked: true as const } as IEmptyStateStacked)
        : ({ ...otherProps, isStacked: false as const } as IEmptyStateNonStacked);

    return (
        <Card className={className}>
            <EmptyState {...emptyStateProps} />
        </Card>
    );
};
