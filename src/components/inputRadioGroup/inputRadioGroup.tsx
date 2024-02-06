import * as RadixRadioGroup from '@radix-ui/react-radio-group';
import classNames from 'classnames';
import { forwardRef, type ComponentPropsWithoutRef } from 'react';

export interface IInputRadioGroupProps extends Omit<ComponentPropsWithoutRef<'div'>, 'dir' | 'onChange'> {
    /**
     * Default value of the radio group. This value is used when the component is initially
     * rendered and no `value` prop is provided.
     */
    defaultValue?: string;
    /**
     * Disables all radio buttons in the group.
     */
    disabled?: boolean;
    /**
     * Loops focus from the last radio button to the first (and vice versa)
     * when navigating with the keyboard
     */
    loop?: boolean;
    /**
     * Name of the group
     */
    name?: string;
    /**
     * Currently selected value in the radio group. Providing this property allows
     * the component to be controlled.
     */
    value?: string;
    /**
     *  Callback function that is called when the selected value changes
     * @param value - new selected radio button value
     */
    onValueChange?: (value: string) => void;
}

/**
 * `InputRadioGroup` component
 */
export const InputRadioGroup = forwardRef<HTMLDivElement, IInputRadioGroupProps>(({ className, ...rest }, ref) => {
    return <RadixRadioGroup.Root {...rest} ref={ref} className={classNames('flex flex-col gap-2.5', className)} />;
});

InputRadioGroup.displayName = 'RadioGroup';
