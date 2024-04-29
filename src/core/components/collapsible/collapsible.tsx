import classNames from 'classnames';
import { useState, type ComponentProps } from 'react';
import { Button } from '../button';
import { Icon, IconType } from '../icon';

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
     * Custom size for the collapsible container that will override collapsedSize prop. See 'Spacing' docs for valid input values.
     */
    customCollapsedSize?: number;
    /**
     * Whether or not to render a Button component as the trigger. @default false
     */
    useODSButton?: boolean;
    /**
     * Additional class names to apply to the blinder container (area that obscures the rest of the content).
     */
    blinderClassName?: string;
    /**
     * Callback function that is called when the collapsible container is toggled.
     */
    onToggle?: (isOpen: boolean) => void;
}

const collapsedSizeVariants = {
    sm: 'h-32',
    md: 'h-64',
    lg: 'h-96',
};

export const Collapsible: React.FC<ICollapsibleProps> = ({
    collapsedSize = 'md',
    customCollapsedSize,
    triggerLabelOpen,
    triggerLabelClosed,
    useODSButton = false,
    className,
    blinderClassName,
    onToggle,
    children,
    ...otherProps
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen((prev) => {
            const toggleState = !prev;
            if (onToggle) {
                onToggle(toggleState);
            }
            return toggleState;
        });
    };

    const customHeightClass = customCollapsedSize ? `h-${customCollapsedSize}` : '';

    const contentClassNames = classNames(
        'overflow-hidden ease-in-out',
        isOpen ? 'h-auto' : customHeightClass || collapsedSizeVariants[collapsedSize],
        { 'line-clamp-none': isOpen },
    );

    const blinderClassNames = classNames('py-4 md:py-6', blinderClassName);

    return (
        <div className={className} {...otherProps}>
            <div className={contentClassNames}>{children}</div>
            <div className={blinderClassNames}>
                {useODSButton ? (
                    <Button
                        onClick={toggle}
                        variant="tertiary"
                        size="md"
                        iconRight={isOpen ? IconType.CHEVRON_UP : IconType.CHEVRON_DOWN}
                    >
                        {isOpen ? triggerLabelOpen : triggerLabelClosed}
                    </Button>
                ) : (
                    <button onClick={toggle} className="flex items-center text-primary-400">
                        {isOpen ? triggerLabelOpen : triggerLabelClosed}
                        <Icon
                            icon={isOpen ? IconType.CHEVRON_UP : IconType.CHEVRON_DOWN}
                            size="sm"
                            className="ml-2 text-primary-300"
                        />
                    </button>
                )}
            </div>
        </div>
    );
};
