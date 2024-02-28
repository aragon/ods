import type { IconType } from '../../icon';
import type { ICardProps } from '../card/card';

export interface ICardSummaryAction {
    /**
     * Label of the summary action.
     */
    label: string;
    /**
     * Callback called on summary action click.
     */
    onClick?: () => void;
    /**
     * Link of the action summary.
     */
    href?: string;
}

export interface ICardSummaryProps extends ICardProps {
    /**
     * Icon displayed on the card.
     */
    icon: IconType;
    /**
     * Value of the summary.
     */
    value: string;
    /**
     * Description of the summary.
     */
    description: string;
    /**
     * Action of the summary.
     */
    action: ICardSummaryAction;
    /**
     * Renders the action as stacked when set to true.
     * @default true
     */
    isStacked?: boolean;
}
