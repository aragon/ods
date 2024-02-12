import * as RadixSwitch from '@radix-ui/react-switch';
import classNames from 'classnames';
import { useId, type HtmlHTMLAttributes } from 'react';

export interface ISwitchProps extends HtmlHTMLAttributes<HTMLDivElement> {
    /**
     * Indicates whether the switch is checked
     */
    checked?: boolean;
    /**
     * CSS class name
     */
    className?: string;
    /**
     * The default checked state of the switch
     * @default false
     */
    defaultChecked?: boolean;
    /**
     * Indicates whether the switch is disabled
     * @default false
     */
    disabled?: boolean;
    /**
     * The ID of the switch
     */
    id?: string;
    /**
     * The label of the switch
     */
    label?: string;
    /**
     * The name of the switch
     */
    name?: string;
    /**
     * Event handler for when the checked state changes
     * @param checked - The new checked state
     */
    onCheckedChanged?: (checked: boolean) => void;
}

/**
 * Switch component
 */
export const Switch: React.FC<ISwitchProps> = (props) => {
    const {
        checked,
        className,
        defaultChecked = false,
        disabled = false,
        id: propId,
        label,
        name,
        onCheckedChanged,
        ...otherProps
    } = props;

    // use randomly generated id when non provided
    const internalId = useId();
    const id = propId ?? internalId;

    const switchProps = {
        id,
        name,
        checked,
        disabled,
        defaultChecked,
    };

    return (
        <div className={classNames('inline-flex items-center', className)} {...otherProps}>
            <RadixSwitch.Root
                onCheckedChange={onCheckedChanged}
                className={classNames(
                    'group peer w-10 cursor-default rounded-[40px] border border-neutral-200 bg-neutral-0 p-1', // Default
                    'data-[state=checked]:border-primary-400 data-[state=checked]:shadow-primary', // Checked
                    'focus:outline-none focus-visible:ring focus-visible:ring-primary focus-visible:ring-offset', // Focus
                    'disabled:bg-neutral-100 disabled:data-[state=checked]:border-neutral-200 disabled:data-[state=checked]:shadow-none', // Disabled
                )}
                {...switchProps}
            >
                <RadixSwitch.Thumb
                    className={classNames(
                        'block size-4 rounded-full bg-neutral-300 transition-transform duration-100 will-change-transform', // Default
                        'data-[state=checked]:translate-x-[14px] data-[state=checked]:bg-primary-400', // Checked
                        'group-disabled:bg-neutral-200 group-disabled:data-[state=checked]:bg-neutral-300', // Disabled
                    )}
                />
            </RadixSwitch.Root>
            {label && (
                <label
                    htmlFor={id}
                    className={classNames(
                        'pl-2 text-sm font-normal leading-tight text-neutral-500 md:pl-3 md:text-base', // Default
                        'peer-data-[state=checked]:text-neutral-800', // Checked
                        'peer-disabled:text-neutral-300 peer-disabled:peer-data-[state=checked]:text-neutral-800', // Disabled
                    )}
                >
                    <span>{label}</span>
                </label>
            )}
        </div>
    );
};
