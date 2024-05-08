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

    return (
        <Card className={classNames('p-4 md:p-6', className)}>
            <Collapsible showOverlay={true} {...otherProps}>
                {children}
            </Collapsible>
        </Card>
    );
};
