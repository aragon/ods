import classNames from 'classnames';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Button } from '../button';
import { Icon, IconType } from '../icon';
import { type ICollapsibleProps } from './collapsible.api';

const sizedCollapsedHeights = {
    sm: 128,
    md: 256,
    lg: 384,
};

export const Collapsible: React.FC<ICollapsibleProps> = ({
    collapsedSize = 'md',
    customCollapsedHeight,
    isOpen: controlledIsOpen,
    defaultOpen = false,
    buttonLabelOpened,
    buttonLabelClosed,
    buttonVariant,
    className,
    footerClassName,
    onToggle,
    onOverflow,
    children,
    ...otherProps
}) => {
    const [internalIsOpen, setInternalIsOpen] = useState(defaultOpen);
    const isControlled = controlledIsOpen !== undefined;
    const isOpen = isControlled ? controlledIsOpen : internalIsOpen;
    const [isOverflowing, setIsOverflowing] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);
    const [maxHeight, setMaxHeight] = useState<number | null>();
    const maxCollapsedHeight = customCollapsedHeight ?? sizedCollapsedHeights[collapsedSize];

    const toggle = useCallback(() => {
        const newIsOpen = !isOpen;
        if (!isControlled) {
            setInternalIsOpen(newIsOpen);
        }
        onToggle?.(newIsOpen);
    }, [isOpen, isControlled, onToggle]);

    useEffect(() => {
        const content = contentRef.current;

        const checkOverflow = () => {
            if (content) {
                const contentHeight = content.scrollHeight;
                const isContentOverflowing = contentHeight > maxCollapsedHeight;
                setIsOverflowing(isContentOverflowing);
                setMaxHeight(isContentOverflowing ? contentHeight : maxCollapsedHeight);
                onOverflow?.(isContentOverflowing);
            }
        };

        const observer = new ResizeObserver(() => checkOverflow());
        if (content) {
            observer.observe(content);
        }

        checkOverflow();

        return () => {
            observer.disconnect();
        };
    }, [maxCollapsedHeight, onOverflow]);

    const getMaxHeight = !isOpen ? `${maxCollapsedHeight}px` : `${maxHeight}px`;

    const contentClassNames = classNames(
        'overflow-hidden transition-all', // base
    );

    const baseFooterClassName = classNames({ 'mt-4': isOverflowing }, footerClassName);

    return (
        <div className={className} {...otherProps}>
            <div ref={contentRef} style={{ maxHeight: getMaxHeight }} className={contentClassNames}>
                {children}
            </div>
            {isOverflowing && (
                <div className={baseFooterClassName}>
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
            )}
        </div>
    );
};
