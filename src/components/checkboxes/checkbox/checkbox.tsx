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
    const { label, labelPosition = 'right', id, className, ...otherProps } = props;

    // Generate random id if id property is not set
    const randomId = useId();
    const processedId = id ?? randomId;

    return (
        <div
            className={classNames(
                'group/root flex items-center',
                { 'flex-row': labelPosition === 'right' },
                { 'flex-row-reverse': labelPosition === 'left' },
                className,
            )}
        >
            <RadixCheckbox.Root
                id={processedId}
                className={classNames(
                    'group/checkbox peer rounded-[4px]',
                    'focus:outline-none focus-visible:ring focus-visible:ring-primary focus-visible:ring-offset',
                )}
                {...otherProps}
            >
                <Icon
                    icon={IconType.CHECKBOX_DEFAULT}
                    size="md"
                    className={classNames(
                        'hidden text-neutral-400 group-data-[state=unchecked]/checkbox:block',
                        'group-hover/root:text-primary-400 group-data-[disabled]/checkbox:text-neutral-300',
                    )}
                />
                <RadixCheckbox.Indicator>
                    <Icon
                        icon={IconType.CHECKBOX_SELECTED}
                        size="md"
                        className="text-primary-400 group-data-[disabled]/checkbox:text-neutral-300"
                    />
                </RadixCheckbox.Indicator>
            </RadixCheckbox.Root>
            {label && (
                <label
                    htmlFor={processedId}
                    className={classNames(
                        'cursor-pointer pl-2 text-sm font-normal leading-tight text-neutral-500 md:text-base',
                        'group-hover/root:text-neutral-800',
                        'peer-data-[disabled]:peer-data-[state=unchecked]:text-neutral-300 peer-data-[disabled]:text-neutral-500',
                    )}
                >
                    {label}
                </label>
            )}
        </div>
    );
};
