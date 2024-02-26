import { EmptyState, type IEmptyStateProps } from '../../states/emptyState';
import { Card } from '../card';

export const CardEmptyState: React.FC<IEmptyStateProps> = (props) => {
    return (
        <Card className="flex justify-center">
            <EmptyState {...props} />
        </Card>
    );
};
