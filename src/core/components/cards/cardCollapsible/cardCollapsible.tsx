import classNames from 'classnames';
import { useState } from 'react';
import { Collapsible, type ICollapsibleProps } from '../../collapsible';
import { Card } from '../card';

export interface ICardCollapsibleProps extends Omit<ICollapsibleProps, 'buttonVariant' | 'isOpen'> {}

export const CardCollapsible: React.FC<ICardCollapsibleProps> = (props) => {
    const {
        collapsedSize,
        children,
        className,
        buttonLabelOpened,
        buttonLabelClosed,
        defaultOpen,
        customCollapsedHeight,
        ...otherProps
    } = props;

    const [isOpen, setIsOpen] = useState(defaultOpen);
    const [isOverflowing, setIsOverflowing] = useState(false);

    const handleToggle = (toggle: boolean) => {
        setIsOpen(toggle);
    };
    const handleOverflow = (overflow: boolean) => {
        setIsOverflowing(overflow);
    };

    const cardCollapsibleClassName = classNames('relative px-4 pt-4 md:px-6 md:pt-6');
    const innerContentWrapperClassName = classNames({ 'mb-14': isOverflowing }, { 'mb-4 md:mb-6': !isOverflowing });
    const footerClassName = classNames(
        'absolute bottom-0 left-0 z-10 flex h-32 w-full items-end bg-gradient-to-t from-neutral-0 from-40% to-transparent px-4 md:px-6',
        { 'h-auto': isOpen },
    );

    return (
        <Card className={className} {...otherProps}>
            <Collapsible
                className={cardCollapsibleClassName}
                defaultOpen={defaultOpen}
                collapsedSize={collapsedSize}
                customCollapsedHeight={customCollapsedHeight}
                buttonLabelOpened={buttonLabelOpened}
                buttonLabelClosed={buttonLabelClosed}
                buttonVariant="tertiary"
                footerClassName={footerClassName}
                onToggle={handleToggle}
                onOverflow={handleOverflow}
            >
                <div className={innerContentWrapperClassName}>{children}</div>
            </Collapsible>
        </Card>
    );
};
