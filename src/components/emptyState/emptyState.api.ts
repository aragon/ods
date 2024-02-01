import type { IButtonProps } from '../button/button.api';
import type { ICardProps } from '../cards';
import type { IconType } from '../icon';
import type { IIllustrationHumanProps, IllustrationObjectType } from '../illustrations';

type HumanIllustrationProps = {
    /**
     * Type of illustration to be used in the empty state.
     */
    illustrationType: 'human';
    /**
     * Illustration details to be used based on type. Must be an object.
     * Minimum required props are: body and expression.
     */
    illustration: IIllustrationHumanProps;
};

type ObjectIllustrationProps = {
    /**
     * Type of illustration to be used in the empty state.
     */
    illustrationType: 'object';
    /**
     * Illustration details to be used based on type.
     * Must be a capitalized string from list. eg: 'LIGHTBULB'
     */
    illustration: IllustrationObjectType;
};

type ButtonPropsForEmptyState = Omit<IButtonProps, 'variant' | 'size'> & {
    /**
     * Button label to be rendered.
     */
    label: string;
    /**
     * Icon to be rendered on the left side of label.
     * eg: IconType.ADD
     */
    iconLeft?: IconType;
    /**
     * Icon to be rendered on the right side of label.
     * eg: IconType.RIGHT_CHEVRON
     */
    iconRight?: IconType;
};

type IEmptyStateStacked = ICardProps &
    (HumanIllustrationProps | ObjectIllustrationProps) & {
        /**
         * Renders the empty state as horizontal view when false.
         * @default true
         */
        isStacked: true;
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
        primaryButton?: ButtonPropsForEmptyState;

        /**
         * Optional secondary button configuration.
         * See <Button /> component for more details.
         */
        secondaryButton?: ButtonPropsForEmptyState;
    };

type IEmptyStateNonStacked = ICardProps &
    ObjectIllustrationProps & {
        /**
         * Renders the empty state as horizontal view when false.
         * @default true
         */
        isStacked: false;
        /**
         * Title to be rendered in the empty state.
         */
        title: string;
        /**
         * Description or content of the empty state.
         */
        description: string;
        /**
         * Primary button is not supported in non-stacked empty state.
         * Only available when isStacked is true.
         */
        primaryButton?: never;
        /**
         * Optional secondary button configuration.
         * See <Button /> component for more details.
         */
        secondaryButton?: ButtonPropsForEmptyState;
    };

export type IEmptyStateProps = IEmptyStateStacked | IEmptyStateNonStacked;
