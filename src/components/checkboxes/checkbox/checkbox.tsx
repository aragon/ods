import * as RadixCheckbox from '@radix-ui/react-checkbox';
import { useId } from 'react';
import { Icon, IconType } from '../../icon';

export interface ICheckboxProps extends RadixCheckbox.CheckboxProps {
    /**
     * Label of the checkbox.
     */
    label?: string;
}

export const Checkbox: React.FC<ICheckboxProps> = (props) => {
    const { label, id, ...otherProps } = props;

    const randomId = useId();
    const processedId = id ?? randomId;

    return (
        <RadixCheckbox.Root id={processedId} {...otherProps}>
            <RadixCheckbox.Indicator>
                <Icon icon={IconType.CHECKMARK} />
            </RadixCheckbox.Indicator>
            <label htmlFor={processedId}>{label}</label>
        </RadixCheckbox.Root>
    );
};
