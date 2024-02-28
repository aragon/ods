import {
    Arrow,
    Content,
    Portal,
    Provider,
    Root,
    Trigger,
    type TooltipContentProps,
    type TooltipProps,
} from '@radix-ui/react-tooltip';
import classNames from 'classnames';
import type React from 'react';
import { type ReactNode } from 'react';

export type TooltipVariant = 'neutral' | 'info' | 'warning' | 'critical' | 'success';

export interface ITooltipProps extends Omit<TooltipProps, 'asChild'>, Omit<TooltipContentProps, 'content' | 'asChild'> {
    /**
     * Content of the tooltip
     */
    content: ReactNode;
    /**
     * Defines the variant of the tooltip
     * @default neutral
     */
    variant?: TooltipVariant;
}

const variantToArrowFill: Record<TooltipVariant, string> = {
    critical: 'fill-critical-300',
    info: 'fill-info-300',
    neutral: 'fill-neutral-800',
    success: 'fill-success-300',
    warning: 'fill-warning-300',
};

const variantToContentClassName: Record<TooltipVariant, string> = {
    critical: 'bg-critical-300 text-critical-900 shadow-critical-md',
    info: 'bg-info-300 text-info-900 shadow-info-md',
    neutral: 'bg-neutral-800 text-neutral-50 shadow-neutral-md',
    success: 'bg-success-300 text-success-900 shadow-success-md',
    warning: 'bg-warning-300 text-warning-900 shadow-warning-md',
};

/**
 * `Tooltip` component
 *
 * This component is based on the Radix-UI tooltip implementation.
 * An exhaustive list of its properties can be found in the corresponding Radix primitive
 * [documentation](https://www.radix-ui.com/primitives/docs/components/tooltip).
 */
export const Tooltip: React.FC<ITooltipProps> = (props) => {
    const {
        children,
        content,
        open,
        defaultOpen,
        delayDuration = 300,
        disableHoverableContent,
        variant = 'neutral',
        onOpenChange,
        ...contentProps
    } = props;

    const { className: contentClassName, ...otherContentProps } = contentProps;

    return (
        <Provider>
            <Root
                open={open}
                defaultOpen={defaultOpen}
                onOpenChange={onOpenChange}
                delayDuration={delayDuration}
                disableHoverableContent={disableHoverableContent}
            >
                <Trigger>{children}</Trigger>
                <Portal>
                    <Content
                        className={classNames(
                            variantToContentClassName[variant],
                            'flex min-h-6 items-center rounded px-1.5 text-sm font-semibold leading-tight',
                            contentClassName,
                        )}
                        sideOffset={1}
                        {...otherContentProps}
                    >
                        {content}
                        <Arrow className={classNames(variantToArrowFill[variant], 'h-1 w-3')} />
                    </Content>
                </Portal>
            </Root>
        </Provider>
    );
};
