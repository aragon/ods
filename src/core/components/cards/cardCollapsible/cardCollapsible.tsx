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

    const collapsibleClassName = classNames('relative p-4 md:p-6');
    const innerContentWrapperClassName = classNames({ 'mb-14': isOverflowing });
    const footerClassName = classNames(
        'absolute bottom-0 left-0 z-10 flex h-28 w-full items-end rounded-xl bg-gradient-to-t from-neutral-0 from-[62%] to-transparent px-4 pb-4 md:h-32 md:px-6 md:pb-6',
        { 'h-auto md:h-auto': isOpen },
    );

    return (
        <Card className={className} {...otherProps}>
            <Collapsible
                className={collapsibleClassName}
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
