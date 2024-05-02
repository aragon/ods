import classNames from 'classnames';
import { useCallback, useState } from 'react';
import { Button } from '../button';
import { Icon, IconType } from '../icon';
import { type ICollapsibleProps } from './collapsible.api';

const collapsedSizeVariants = {
    sm: 'h-32',
    md: 'h-64',
    lg: 'h-96',
};

export const Collapsible: React.FC<ICollapsibleProps> = ({
    collapsedSize = 'md',
    customCollapsedSize,
    defaultOpen = false,
    buttonLabelOpened,
    buttonLabelClosed,
    buttonVariant,
    className,
    blinderClassName,
    onToggle,
    children,
    ...otherProps
}) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    const toggle = useCallback(() => {
        setIsOpen((prev) => {
            const newState = !prev;
            onToggle?.(newState);
            return newState;
        });
    }, [onToggle]);

    const contentClassNames = classNames(
        'mb-4 overflow-hidden ease-in-out md:mb-6',
        isOpen ? 'h-auto' : collapsedSizeVariants[collapsedSize],
    );

    return (
        <div className={className} {...otherProps}>
            <div
                style={{ height: !isOpen && customCollapsedSize ? `${customCollapsedSize}px` : undefined }}
                className={contentClassNames}
            >
                {children}
            </div>
            <div className={blinderClassName}>
                {buttonVariant ? (
                    <Button
                        onClick={toggle}
                        variant={buttonVariant}
                        size="md"
                        iconRight={isOpen ? IconType.CHEVRON_UP : IconType.CHEVRON_DOWN}
                    >
                        {isOpen ? buttonLabelOpened : buttonLabelClosed}
                    </Button>
                ) : (
                    <button
                        onClick={toggle}
                        className="group flex items-center text-primary-400 hover:text-primary-600 active:text-primary-800"
                    >
                        {isOpen ? buttonLabelOpened : buttonLabelClosed}
                        <Icon
                            icon={isOpen ? IconType.CHEVRON_UP : IconType.CHEVRON_DOWN}
                            size="sm"
                            className="ml-2 text-primary-300 group-hover:text-primary-500 group-active:text-primary-700"
                        />
                    </button>
                )}
            </div>
        </div>
    );
};
