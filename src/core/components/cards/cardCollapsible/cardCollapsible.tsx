import classNames from 'classnames';
import { useState } from 'react';
import { Collapsible, type ICollapsibleProps } from '../../collapsible';
import { Card } from '../card';

export type CollapsedSize = 'sm' | 'md' | 'lg';

export interface ICollapsibleCardProps extends Omit<ICollapsibleProps, 'useODSButton'> {}

export const CardCollapsible: React.FC<ICollapsibleCardProps> = (props) => {
    const {
        collapsedSize,
        children,
        className,
        triggerLabelOpen,
        triggerLabelClosed,
        customCollapsedSize,
        ...otherProps
    } = props;
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = (toggle: boolean) => {
        setIsOpen(toggle);
    };

    const blinderClassNames = classNames(
        'absolute bottom-0 left-0 z-10 flex w-full items-end overflow-hidden rounded-b-xl bg-gradient-to-t from-neutral-0 from-[48%] to-transparent p-4 transition-all duration-300 md:from-[52%]  md:p-6',
        { 'h-36': !isOpen },
    );
    const collapsedCardClassName = classNames('relative px-6 pt-6 transition-all duration-300');

    return (
        <Card className={className} {...otherProps}>
            <Collapsible
                blinderClassName={blinderClassNames}
                triggerLabelOpen={triggerLabelOpen}
                triggerLabelClosed={triggerLabelClosed}
                collapsedSize={collapsedSize}
                className={collapsedCardClassName}
                customCollapsedSize={customCollapsedSize}
                useODSButton={true}
                onToggle={handleToggle}
            >
                <div className="mb-24">{children}</div>
            </Collapsible>
        </Card>
    );
};
