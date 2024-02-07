import * as RadixSwitch from '@radix-ui/react-switch';
import classNames from 'classnames';
import { useId, type HtmlHTMLAttributes } from 'react';

const rootClassNames = classNames(
    'group peer w-10 cursor-default rounded-[40px] border border-neutral-200 bg-neutral-0 p-1', // Default
    'data-[state=checked]:border-primary-400 data-[state=checked]:shadow-primary-md', // State is checked
    'focus:outline-none focus-visible:ring focus-visible:ring-primary focus-visible:ring-offset', // Focus
    'disabled:bg-neutral-100 disabled:data-[state=checked]:border-neutral-200 disabled:data-[state=checked]:shadow-none', // Disabled
);

const thumbClassNames = classNames(
    'block size-4 rounded-full bg-neutral-300 transition-transform duration-100 will-change-transform', // Default
    'data-[state=checked]:translate-x-[14px] data-[state=checked]:bg-primary-400', // State is checked
    'group-disabled:bg-neutral-200 group-disabled:data-[state=checked]:bg-neutral-300', // Disabled
);

// using `peer` since the parent div is not focusable nor able to be disabled
const labelClassNames = classNames(
    'text-sm font-semibold leading-tight text-neutral-600 md:text-base', // Default
    'peer-disabled:text-neutral-300 peer-disabled:peer-data-[state=checked]:text-neutral-600', // Disabled
);

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
        <div className={classNames('inline-flex items-center gap-x-2 md:gap-x-3', className)} {...otherProps}>
            <RadixSwitch.Root className={rootClassNames} onCheckedChange={onCheckedChanged} {...switchProps}>
                <RadixSwitch.Thumb className={thumbClassNames} />
            </RadixSwitch.Root>
            {label && (
                <label htmlFor={id} className={labelClassNames}>
                    <span>{label}</span>
                </label>
            )}
        </div>
    );
};
