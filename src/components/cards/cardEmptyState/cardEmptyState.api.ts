import type { IButtonProps } from '../../button/button.api';
import type { IllustrationObjectType } from '../../illustrations';
import type { ICardProps } from '../card/card';

export interface ICardEmptyStateProps extends ICardProps {
    illustration: IllustrationObjectType;
    title: string;
    description: string;
    primaryButton: IButtonProps;
    secondaryButton?: IButtonProps;
}
