import * as RadixCheckbox from '@radix-ui/react-checkbox';
import classNames from 'classnames';
import { useId } from 'react';
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
    const { label, labelPosition = 'right', id, className, checked, disabled, ...otherProps } = props;

    // Generate random id if id property is not set
    const randomId = useId();
    const processedId = id ?? randomId;

    return (
        <div
            className={classNames(
                'flex items-center gap-2 rounded-[4px] outline-1', // Defaults
                '[&:has(:focus-visible)]:ring [&:has(:focus-visible)]:ring-primary [&:has(:focus-visible)]:ring-offset', // Focus
                { 'text-neutral-400 hover:text-primary-400': !disabled },
                { 'text-neutral-300': disabled },
                { 'flex-row': labelPosition === 'right' },
                { 'flex-row-reverse': labelPosition === 'left' },
                className,
            )}
        >
            <RadixCheckbox.Root
                className="focus:outline-none"
                id={processedId}
                checked={checked}
                disabled={disabled}
                {...otherProps}
            >
                {!checked && <Icon icon={IconType.CHECKBOX_DEFAULT} size="md" />}
                <RadixCheckbox.Indicator>
                    <Icon
                        className={disabled ? 'text-neutral-300' : 'text-primary-400'}
                        icon={IconType.CHECKBOX_SELECTED}
                        size="md"
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
