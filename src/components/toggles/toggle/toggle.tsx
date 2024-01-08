import classNames from 'classnames';
import type { ComponentProps } from 'react';
import { useToggleContext } from '../toggleContext';

export type ToggleValue = string | number;

export interface IToggleProps<TValue extends ToggleValue = ToggleValue>
    extends Omit<ComponentProps<'button'>, 'value'> {
    /**
     * Value of the toggle.
     */
    value: TValue;
    /**
     * Label of the toggle.
     */
    label: string;
}

export const Toggle = <TValue extends ToggleValue>(props: IToggleProps<TValue>) => {
    const { className, label, value, disabled, ...otherProps } = props;

    const { value: currentValue, onChange, isMultiSelect } = useToggleContext();

    const isActive =
        isMultiSelect && Array.isArray(currentValue) ? currentValue.includes(value) : value === currentValue;

    const toggleClasses = classNames(
        'flex h-10 items-center rounded-[40px] border border-neutral-100 px-4', // Default
        'focus:outline-none focus-visible:ring focus-visible:ring-primary focus-visible:ring-offset', // Focus state
        'hover:enabled:border-neutral-200 hover:enabled:shadow-primary-md', // Hover state
        { 'bg-neutral-0 text-neutral-600': !isActive && !disabled }, // Default state
        { 'bg-neutral-100 text-neutral-800': isActive && !disabled }, // Active state
        { 'bg-neutral-100 text-neutral-300': disabled }, // Disabled state
        className,
    );

    const handleToggleClick = () => {
        if (isMultiSelect) {
            const parsedSelection = Array.isArray(currentValue)
                ? currentValue
                : currentValue != null
                ? [currentValue]
                : [];

            const newSelection = parsedSelection.includes(value)
                ? parsedSelection.filter((field) => field !== value)
                : parsedSelection.concat(value);

            onChange(newSelection);
        } else {
            onChange(currentValue === value ? undefined : value);
        }
    };

    return (
        <button className={toggleClasses} onClick={handleToggleClick} disabled={disabled} {...otherProps}>
            <p className="text-sm font-semibold leading-normal md:text-base">{label}</p>
        </button>
    );
};
