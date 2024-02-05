import * as RadioGroup from '@radix-ui/react-radio-group';
import classNames from 'classnames';
import type React from 'react';
import { useId, type ComponentPropsWithoutRef } from 'react';
import { Icon, IconType } from '../../icon';

export interface IInputRadioProps extends ComponentPropsWithoutRef<'button'> {
    /**
     * Radio label
     */
    label: string;
    /**
     * Indicates whether the radio input is disabled
     */
    disabled?: boolean;
    /**
     * Value of the radio input
     */
    value: string;
    /**
     * Variant indicating the label positioning
     * @default right
     */
    variant?: 'left' | 'right';
}

/**
 * Input Radio component
 *
 * **NOTE**: The component must be used inside a `<RadioGroup />` component in order to work properly.
 */
export const InputRadio: React.FC<IInputRadioProps> = ({ label, variant = 'right', id, value, className, ...rest }) => {
    const randomId = useId();
    const processedId = id ?? randomId;

    const itemClasses = classNames(
        'group peer rounded-full outline-none',
        'focus:outline-none focus-visible:ring focus-visible:ring-primary focus-visible:ring-offset', // Focus state'
        { 'order-2': variant === 'left' },
    );

    const labelClasses = classNames(
        'text-base leading-tight text-neutral-500', // default
        'peer-data-[state=checked]:text-neutral-800', // checked
        'peer-disabled:peer-data-[state=unchecked]:text-neutral-300', // unchecked and disabled
    );

    return (
        <div className={classNames('flex items-center gap-2 rounded px-0.5 md:gap-3', className)}>
            <RadioGroup.Item id={processedId} value={value} className={itemClasses} {...rest}>
                <Icon
                    icon={IconType.RADIO_DEFAULT}
                    className="text-neutral-300 group-hover:text-primary-400 group-disabled:text-neutral-300 group-data-[state=checked]:hidden"
                />
                <RadioGroup.Indicator className="text-primary-400 group-disabled:text-neutral-300">
                    <Icon icon={IconType.RADIO_SELECTED} />
                </RadioGroup.Indicator>
            </RadioGroup.Item>
            <label className={labelClasses} htmlFor={processedId}>
                {label}
            </label>
        </div>
    );
};
