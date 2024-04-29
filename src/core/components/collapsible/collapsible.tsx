import classNames from 'classnames';
import { useState, type ComponentProps } from 'react';
import { Button } from '../button';
import { IconType } from '../icon';

export type CollapsedSize = 'sm' | 'md' | 'lg';

export interface ICollapsibleProps extends ComponentProps<'div'> {
    /**
     * The initial height of the collapsible container while closed. @default 'md'
     */
    collapsedSize?: CollapsedSize;
    /**
     * The label to display on the trigger button when the collapsible container is closed.
     */
    triggerLabelClosed: string;
    /**
     * The label to display on the trigger button when the collapsible container is open.
     */
    triggerLabelOpen: string;
    /**
     * Whether the trigger button should be right-aligned. @default false
     */
    buttonIsRight?: boolean;
}

const contentHeightVariants = {
    sm: 'h-32',
    md: 'h-64',
    lg: 'h-128',
};

export const Collapsible: React.FC<ICollapsibleProps> = ({
    collapsedSize = 'md',
    triggerLabelOpen,
    triggerLabelClosed,
    children,
    buttonIsRight = false,
    ...otherProps
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen((prev) => !prev);

    const containerClassNames = classNames('relative overflow-hidden');

    const contentClassNames = classNames(
        'transition-all',
        isOpen ? 'mb-20 md:mb-24' : 'mb-0',
        isOpen ? 'h-fit' : contentHeightVariants[collapsedSize],
    );

    const blinderClassNames = classNames(
        'absolute bottom-0 left-0 z-10 flex w-full items-end bg-gradient-to-t from-neutral-0 to-transparent py-4 md:py-6',
        {
            'justify-end': buttonIsRight,
            'justify-start': !buttonIsRight,
        },
        {
            'h-32': !isOpen,
        },
    );

    return (
        <div className={containerClassNames} {...otherProps}>
            <div className={contentClassNames}>{children}</div>
            <div className={blinderClassNames}>
                <Button
                    size="md"
                    variant="tertiary"
                    onClick={toggle}
                    iconRight={isOpen ? IconType.CHEVRON_UP : IconType.CHEVRON_DOWN}
                >
                    {isOpen ? triggerLabelOpen : triggerLabelClosed}
                </Button>
            </div>
        </div>
    );
};
