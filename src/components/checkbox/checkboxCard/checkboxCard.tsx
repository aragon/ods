import * as RadixCheckbox from '@radix-ui/react-checkbox';
import { forwardRef, useId } from 'react';
import type { ITagProps } from '../../tag';

export interface ICheckboxCardProps extends Omit<RadixCheckbox.CheckboxProps, 'asChild'> {
    /**
     * Avatar of the checkbox card.
     */
    avatar?: string;
    /**
     * Label of the checkbox.
     */
    label: string;
    /**
     * Description of the checkbox.
     */
    description: string;
    /**
     * Optional tag for the checkbox.
     */
    tag?: ITagProps;
}

export const CheckboxCard = forwardRef<HTMLButtonElement, ICheckboxCardProps>((props, ref) => {
    const { id, ...otherProps } = props;

    // Generate random id if id property is not set
    const randomId = useId();
    const processedId = id ?? randomId;

    return (
        <RadixCheckbox.Root
            id={processedId}
            ref={ref}
            className="rounded-xl border border-neutral-100 bg-neutral-0 px-4 py-3 md:px-6 md:py-4"
            {...otherProps}
        >
            <p>test</p>
        </RadixCheckbox.Root>
    );
});

CheckboxCard.displayName = 'CheckboxCard';
