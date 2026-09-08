import { Arrow, Content, Portal, Provider, Root, Trigger } from '@radix-ui/react-tooltip';
import classNames from 'classnames';
import type React from 'react';
import { type ReactNode, type PointerEvent as ReactPointerEvent, useRef, useState } from 'react';
import { getIsKeyboardModality } from './keyboardModality';

export type TooltipVariant = 'neutral' | 'info' | 'warning' | 'critical' | 'success';

export interface ITooltipProps {
    /**
     * Content of the tooltip
     */
    content: ReactNode;
    /**
     * Defines the variant of the tooltip
     * @default neutral
     */
    variant?: TooltipVariant;
    /**
     * The open state of the tooltip when it is initially rendered. Use when you do not need to control its open state.
     */
    defaultOpen?: boolean;
    /**
     * The controlled open state of the tooltip. Must be used in conjunction with `onOpenChange`.
     */
    open?: boolean;
    /**
     * Event handler called when the open state of the tooltip changes.
     */
    onOpenChange?: (open: boolean) => void;
    /**
     * The duration from when the mouse enters the trigger until the tooltip opens.
     * @default 300
     */
    delayDuration?: number;
    /**
     * When `true`, hovering the content will keep the tooltip open.
     */
    disableHoverableContent?: boolean;
    /**
     * Additional class names for the tooltip content.
     */
    className?: string;
    /**
     * Children elements to trigger the tooltip.
     */
    children?: ReactNode;
    /**
     * When `true`, the tooltip will use children button as a trigger, to avoid a button inside a button.
     */
    triggerAsChild?: boolean;
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
        className,
        triggerAsChild,
        ...otherProps
    } = props;

    const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen ?? false);
    const isControlled = open != null;
    const isOpen = isControlled ? open : uncontrolledOpen;

    const isPointerOverTriggerRef = useRef(false);

    // Radix ignores touch pointers when opening on hover, so the trigger only counts as hovered for mouse and pen.
    const handleTriggerPointerMove = (event: ReactPointerEvent<HTMLElement>) => {
        if (event.pointerType === 'touch') {
            return;
        }

        isPointerOverTriggerRef.current = true;
    };

    const handleTriggerPointerLeave = () => {
        isPointerOverTriggerRef.current = false;
    };

    // Radix opens the tooltip on every focus, without telling a keyboard `Tab` apart from focus moved by script, so a
    // dialog autofocusing its first tabbable element opens the tooltip of whatever trigger it lands on. Radix's own
    // open is refused here rather than default-preventing the focus event: React shares one event object along the
    // whole propagation path, and every Radix primitive composes its handlers with `composeEventHandlers`, which
    // skips them once the event is default-prevented — a trigger passed through `triggerAsChild` would lose its own
    // focus handling. An open is honoured when the pointer is over the trigger, or when the last interaction was a
    // key press, which is the `:focus-visible` heuristic.
    const handleRootOpenChange = (nextOpen: boolean) => {
        if (nextOpen && !isPointerOverTriggerRef.current && !getIsKeyboardModality()) {
            return;
        }

        if (!isControlled) {
            setUncontrolledOpen(nextOpen);
        }

        onOpenChange?.(nextOpen);
    };

    return (
        <Provider>
            <Root
                delayDuration={delayDuration}
                disableHoverableContent={disableHoverableContent}
                onOpenChange={handleRootOpenChange}
                open={isOpen}
            >
                <Trigger
                    asChild={triggerAsChild}
                    onPointerLeave={handleTriggerPointerLeave}
                    onPointerMove={handleTriggerPointerMove}
                >
                    {children}
                </Trigger>
                <Portal>
                    <Content
                        className={classNames(
                            variantToContentClassName[variant],
                            'z-50 box-border flex min-h-6 max-w-[var(--radix-tooltip-content-available-width)] items-center whitespace-normal break-all rounded-md px-1.5 font-semibold text-sm leading-tight',
                            className,
                        )}
                        {...otherProps}
                    >
                        {content}
                        <Arrow className={classNames(variantToArrowFill[variant], 'h-1 w-3')} />
                    </Content>
                </Portal>
            </Root>
        </Provider>
    );
};
