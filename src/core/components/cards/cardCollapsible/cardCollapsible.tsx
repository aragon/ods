import classNames from 'classnames';
import { useState } from 'react';
import { Collapsible, type ICollapsibleProps } from '../../collapsible';
import { Card } from '../card';

export type CollapsedSize = 'sm' | 'md' | 'lg';

export interface ICollapsibleCardProps extends Omit<ICollapsibleProps, 'buttonVariant'> {}

export const CardCollapsible: React.FC<ICollapsibleCardProps> = (props) => {
    const {
        collapsedSize,
        children,
        className,
        buttonLabelOpen,
        buttonLabelClosed,
        customCollapsedSize,
        ...otherProps
    } = props;
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = (toggle: boolean) => {
        setIsOpen(toggle);
    };

    const collapsedCardClassName = classNames('relative px-4 pt-4 transition-all duration-300 md:px-6 md:pt-6');
    const blinderClassNames = classNames(
        'absolute bottom-0 left-0 z-10 flex w-full items-end bg-gradient-to-t from-neutral-0 from-40% to-transparent px-4 transition-all duration-300 md:px-6',
        { 'h-32': !isOpen },
    );

    return (
        <Card className={className} {...otherProps}>
            <Collapsible
                className={collapsedCardClassName}
                collapsedSize={collapsedSize}
                customCollapsedSize={customCollapsedSize}
                buttonLabelOpen={buttonLabelOpen}
                buttonLabelClosed={buttonLabelClosed}
                buttonVariant="tertiary"
                blinderClassName={blinderClassNames}
                onToggle={handleToggle}
            >
                <div className="mb-14">{children}</div>
            </Collapsible>
        </Card>
    );
};
