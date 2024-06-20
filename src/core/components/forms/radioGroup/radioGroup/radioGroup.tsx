import { RadioGroup as PrimitiveRadioGroup, type RadioGroupProps } from '@radix-ui/react-radio-group';
import classNames from 'classnames';
import { forwardRef } from 'react';

export interface IRadioGroupProps extends Omit<RadioGroupProps, 'orientation'> {}

/**
 * `RadioGroup` component
 *
 * This component is based on the Radix-UI radio group implementation.
 * An exhaustive list of its properties can be found in the corresponding Radix primitive
 * [documentation](https://www.radix-ui.com/primitives/docs/components/radio-group#root).
 */
export const RadioGroup = forwardRef<HTMLDivElement, IRadioGroupProps>(({ className, ...rest }, ref) => {
    return (
        <PrimitiveRadioGroup
            ref={ref}
            className={classNames('flex min-w-0 flex-col gap-y-2 md:gap-y-3', className)}
            {...rest}
        />
    );
});

RadioGroup.displayName = 'RadioGroup';
