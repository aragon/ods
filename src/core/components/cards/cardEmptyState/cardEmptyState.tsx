import { EmptyState, type IEmptyStateProps } from '../../states/emptyState';
import { Card } from '../card';

export const CardEmptyState: React.FC<IEmptyStateProps> = (props) => {
    return (
        <Card className="mx-auto flex w-full justify-center">
            <EmptyState {...props} />
        </Card>
    );
};
