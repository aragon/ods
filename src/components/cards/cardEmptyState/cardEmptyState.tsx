import { EmptyState, type IEmptyStateProps } from '../../states/emptyState';
import { Card, type ICardProps } from '../card';

export type CardEmptyStateProps = ICardProps & IEmptyStateProps;

export const CardEmptyState: React.FC<CardEmptyStateProps> = (props) => {
    return (
        <Card {...props}>
            <EmptyState {...props} />
        </Card>
    );
};
