import classNames from 'classnames';
import { Collapsible, type ICollapsibleProps } from '../../collapsible';
import { Card } from '../card';

export interface ICardCollapsibleProps extends Omit<ICollapsibleProps, 'buttonVariant' | 'className'> {
    /**
     * Additional class names to apply to the card.
     */
    className?: string;
}

export const CardCollapsible: React.FC<ICardCollapsibleProps> = (props) => {
    const { children, className, ...otherProps } = props;

    const cardCollapsibleClassName = classNames('p-4 md:p-6', className);

    return (
        <Card className={cardCollapsibleClassName}>
            <Collapsible buttonVariant="tertiary" showOverlay={true} {...otherProps}>
                {children}
            </Collapsible>
        </Card>
    );
};
