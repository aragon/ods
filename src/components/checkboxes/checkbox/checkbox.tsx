import * as RadixCheckbox from '@radix-ui/react-checkbox';
import classNames from 'classnames';
import { useEffect, useId, useState } from 'react';
import { Icon, IconType } from '../../icon';

export type CheckboxState = RadixCheckbox.CheckedState;

export interface ICheckboxProps extends RadixCheckbox.CheckboxProps {
    /**
     * Label of the checkbox.
     */
    label?: string;
    /**
     * Position of the label.
     * @default right
     */
    labelPosition?: 'right' | 'left';
}

export const Checkbox: React.FC<ICheckboxProps> = (props) => {
    const {
        label,
        labelPosition = 'right',
        id,
        className,
        checked: checkedProp,
        defaultChecked,
        onCheckedChange,
        disabled,
        ...otherProps
    } = props;

    const [checked, setIsChecked] = useState(checkedProp ?? defaultChecked);

    // Generate random id if id property is not set
    const randomId = useId();
    const processedId = id ?? randomId;

    const handleCheckedChange = (newValue: CheckboxState) => {
        setIsChecked(newValue);
        onCheckedChange?.(newValue);
    };

    // Update internal checked value on checked property change
    useEffect(() => {
        setIsChecked(checkedProp);
    }, [checkedProp]);

    return (
        <div
            className={classNames(
                'flex items-center gap-2',
                { 'text-neutral-400 hover:text-primary-400': !disabled },
                { 'text-neutral-300': disabled },
                { 'flex-row': labelPosition === 'right' },
                { 'flex-row-reverse': labelPosition === 'left' },
                className,
            )}
        >
            <RadixCheckbox.Root
                className="rounded-[4px] focus:outline-none focus-visible:ring focus-visible:ring-primary focus-visible:ring-offset"
                id={processedId}
                checked={checked}
                defaultChecked={defaultChecked}
                onCheckedChange={handleCheckedChange}
                disabled={disabled}
                {...otherProps}
            >
                <RadixCheckbox.Indicator forceMount={true}>
                    <Icon
                        icon={checked ? IconType.CHECKBOX_SELECTED : IconType.CHECKBOX_DEFAULT}
                        size="md"
                        className={classNames(
                            { 'text-neutral-300': checked && disabled },
                            { 'text-primary-400': checked && !disabled },
                        )}
                    />
                </RadixCheckbox.Indicator>
            </RadixCheckbox.Root>
            {label && (
                <label
                    htmlFor={processedId}
                    className={classNames(
                        'text-sm font-normal leading-tight md:text-base',
                        { 'text-neutral-500': !checked && !disabled },
                        { 'text-neutral-300': !checked && disabled },
                        { 'text-neutral-800': checked },
                    )}
                >
                    {label}
                </label>
            )}
        </div>
    );
};
