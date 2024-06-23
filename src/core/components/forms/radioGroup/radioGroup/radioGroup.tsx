import { RadioGroup as PrimitiveRadioGroup } from '@radix-ui/react-radio-group';
import classNames from 'classnames';
import { forwardRef, type ComponentProps } from 'react';

export interface IRadioGroupProps extends Omit<ComponentProps<'div'>, 'orientation' | 'dir'> {
    /**
     * The value of the selected radio item.
     */
    value?: string;
    /**
     * The default value of the selected radio item.
     */
    defaultValue?: string;
    /**
     * Callback when the value changes.
     */
    onValueChange?: (value: string) => void;
    /**
     * The name of the radio group.
     */
    name?: string;
    /**
     * Whether the radio group is disabled.
     */
    disabled?: boolean;
}

export const RadioGroup = forwardRef<HTMLDivElement, IRadioGroupProps>((props, ref) => {
    const { className, value, defaultValue, onValueChange, name, disabled, ...rest } = props;
    return (
        <PrimitiveRadioGroup
            ref={ref}
            value={value}
            defaultValue={defaultValue}
            onValueChange={onValueChange}
            name={name}
            disabled={disabled}
            className={classNames('flex min-w-0 flex-col gap-y-2 md:gap-y-3', className)}
            {...rest}
        />
    );
});

RadioGroup.displayName = 'RadioGroup';
