import type { IButtonProps } from '../../button/button.api';
import type { IIllustrationHumanProps, IIllustrationObjectProps } from '../../illustrations';

export interface IEmptyStateBaseProps {
    /**
     * Title of the empty state.
     */
    heading: string;
    /**
     * Description of the empty state.
     */
    description: string;
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

export interface IEmptyStateButton extends Omit<IButtonProps, 'variant' | 'size' | 'children'> {
    /**
     * Button label to be rendered.
     */
    label: string;
}

export type IEmptyStateProps =
    /**
     * @see IIllustrationHumanProps
     * Empty state with human illustration.
     */
    | (IEmptyStateBaseProps & {
          illustrationProps: IIllustrationHumanProps;
      })
    /**
     * @see IIllustrationObjectProps
     * Empty state with object illustration.
     */
    | (IEmptyStateBaseProps & {
          illustrationProps: IIllustrationObjectProps;
      });
