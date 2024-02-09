import type { IButtonBaseProps, IButtonElementProps } from '../../button';
import type { IIllustrationHumanProps, IIllustrationObjectProps } from '../../illustrations';

export interface IEmptyStateBaseProps {
    /**
     * Title of the empty state.
     */
    heading: string;
    /**
     * Description of the empty state.
     */
    description?: string;
    /**
     * Renders the state as horitontal when set to false.
     * @default true
     */
    isStacked?: boolean;
    /**
     * Primary button of the empty state. The primary button is only rendered on the stacked variant.
     */
    primaryButton?: IEmptyStateButton;
    /**
     * Secondary button of the empty state.
     */
    secondaryButton?: IEmptyStateButton;
    /**
     * Additional class names to be added to the empty state.
     */
    className?: string;
}

export type IEmptyStateButton = Omit<IButtonBaseProps, 'variant' | 'size' | 'children'> &
    IButtonElementProps & {
        /**
         * Button label to be rendered.
         */
        label: string;
    };

export interface IEmptyStateHumanIllustrationProps extends IEmptyStateBaseProps {
    /**
     * @see IIllustrationHumanProps
     */
    humanIllustration: IIllustrationHumanProps;
    objectIllustration?: never;
}

export interface IEmptyStateObjectIllustrationProps extends IEmptyStateBaseProps {
    /**
     * @see IIllustrationObjectProps
     */
    objectIllustration: IIllustrationObjectProps;
    humanIllustration?: never;
}

export type IEmptyStateProps = IEmptyStateHumanIllustrationProps | IEmptyStateObjectIllustrationProps;
