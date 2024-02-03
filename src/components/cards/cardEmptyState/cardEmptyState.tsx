import {
    EmptyState,
    type IEmptyStateNonStacked,
    type IEmptyStateProps,
    type IEmptyStateStacked,
} from '../../emptyState';
import { Card, type ICardProps } from '../card';

export interface ICardEmptyStateProps extends Omit<IEmptyStateProps, 'isStacked'>, ICardProps {
    isStacked?: boolean;
}

export const CardEmptyState: React.FC<ICardEmptyStateProps> = ({ isStacked = true, ...otherProps }) => {
    const { primaryButton, secondaryButton, illustration, illustrationType, heading, description, ...remainingProps } =
        otherProps;
    const emptyStateProps: IEmptyStateProps = isStacked
        ? ({
              heading,
              description,
              illustration,
              illustrationType,
              primaryButton,
              secondaryButton,
              isStacked: true as const,
          } as IEmptyStateStacked)
        : ({
              heading,
              description,
              illustration,
              illustrationType,
              primaryButton,
              secondaryButton,
              isStacked: false as const,
          } as IEmptyStateNonStacked);

    return (
        <Card {...remainingProps}>
            <EmptyState {...emptyStateProps} />
        </Card>
    );
};
