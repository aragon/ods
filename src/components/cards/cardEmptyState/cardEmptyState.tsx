import { EmptyState, type IEmptyStateProps } from '../../states/emptyState';
import { Card, type ICardProps } from '../card';

export interface ICardEmptyStateProps extends Omit<ICardProps, 'className'>, Omit<IEmptyStateProps, 'className'> {
    classNameCard?: string;
    classNameEmptyState?: string;
}

export const CardEmptyState: React.FC<ICardEmptyStateProps> = ({
    classNameCard,
    classNameEmptyState,
    humanIllustration,
    objectIllustration,
    ...otherProps
}) => {
    const emptyStateProps: Partial<IEmptyStateProps> = {
        ...otherProps,
        className: classNameEmptyState,
    };

    if (humanIllustration) {
        emptyStateProps.humanIllustration = humanIllustration;
    } else if (objectIllustration) {
        emptyStateProps.objectIllustration = objectIllustration;
    }

    return (
        <Card className={classNameCard}>
            <EmptyState {...(emptyStateProps as IEmptyStateProps)} />
        </Card>
    );
};
