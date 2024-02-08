import { EmptyState, type IEmptyStateProps } from '../../states/emptyState';
import { Card, type ICardProps } from '../card';

export type ICardEmptyStateProps = ICardProps & IEmptyStateProps;

export const CardEmptyState: React.FC<ICardEmptyStateProps> = (props) => {
    const { className, ...otherProps } = props;

    return (
        <Card className={className}>
            <EmptyState {...otherProps} />
        </Card>
    );
};
