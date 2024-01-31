import type { IButtonProps } from '../button/button.api';
import { ICardProps } from '../cards';
import type { IIllustrationHumanProps, IllustrationObjectType } from '../illustrations';

export interface IEmptyStateProps extends ICardProps {
    /**
     * Type of illustration to be used in the empty state.
     */
    illustrationType: 'object' | 'human';
    /**
     * Type of illustration props to be used based on type.
     */
    illustration: IllustrationObjectType | IIllustrationHumanProps;
    /**
     * Title to be rendered in the empty state.
     */
    title: string;

    /**
     * Description or content of the empty state.
     */
    description: string;

    /**
     * Optional primary button configuration.
     * See <Button /> component for more details.
     */
    primaryButton?: IButtonProps;

    /**
     * Optional secondary button configuration.
     * See <Button /> component for more details.
     */
    secondaryButton?: IButtonProps;
    /**
     * Renders the empty state as horizontal view when false.
     * @default true
     */
    isStacked?: boolean;
}
