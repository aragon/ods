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
        buttonLabelOpened,
        buttonLabelClosed,
        defaultOpen,
        customCollapsedSize,
        ...otherProps
    } = props;

    const [isOpen, setIsOpen] = useState(defaultOpen);

    const handleToggle = (toggle: boolean) => {
        setIsOpen(toggle);
    };

    const cardCollapsibleClassName = classNames('relative px-4 pt-4 transition-all duration-300 md:px-6 md:pt-6');
    const blinderClassNames = classNames(
        'absolute bottom-0 left-0 z-10 flex h-32 w-full items-end bg-gradient-to-t from-neutral-0 from-40% to-transparent px-4 transition-all duration-300 md:px-6',
        { 'h-auto': isOpen },
    );

    return (
        <Card className={className} {...otherProps}>
            <Collapsible
                className={cardCollapsibleClassName}
                defaultOpen={defaultOpen}
                collapsedSize={collapsedSize}
                customCollapsedSize={customCollapsedSize}
                buttonLabelOpened={buttonLabelOpened}
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
