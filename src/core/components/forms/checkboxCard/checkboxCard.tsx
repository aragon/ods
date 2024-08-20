import * as RadixCheckbox from '@radix-ui/react-checkbox';
import classNames from 'classnames';
import { forwardRef, type ComponentProps } from 'react';
import { useRandomId } from '../../../hooks';
import { Avatar } from '../../avatars';
import { Icon, IconType } from '../../icon';
import { Tag, type ITagProps } from '../../tag';
import { type CheckboxState } from '../checkbox/checkbox';

export interface ICheckboxCardProps extends ComponentProps<'button'> {
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
    /**
     * The checked state of the checkbox.
     */
    checked?: CheckboxState;
    /**
     * Callback when the checked state changes.
     */
    onCheckedChange?: (checked: CheckboxState) => void;
    /**
     * Indicates if the checkbox is disabled.
     */
    disabled?: boolean;
    /**
     * Id of the checkbox.
     */
    id?: string;
}

export const CheckboxCard = forwardRef<HTMLButtonElement, ICheckboxCardProps>((props, ref) => {
    const { id, avatar, label, description, tag, className, checked, onCheckedChange, disabled, ...otherProps } = props;

    const randomId = useRandomId(id);
    const labelId = `${randomId}-label`;

    return (
        <RadixCheckbox.Root
            id={randomId}
            ref={ref}
            aria-labelledby={labelId}
            checked={checked}
            onCheckedChange={onCheckedChange}
            disabled={disabled}
            className={classNames(
                'group flex h-16 min-w-0 flex-row items-center gap-3 outline-none transition-all md:h-20', // Layout
                'rounded-xl border bg-neutral-0 px-4 py-3 md:gap-4 md:px-6 md:py-4', // Style
                'focus:outline-none focus-visible:ring focus-visible:ring-primary focus-visible:ring-offset', // Focus
                'border-primary-400 shadow-primary hover:shadow-primary-md', // Checked/indeterminate & hover
                'data-[state=unchecked]:enabled:border-neutral-100 data-[state=unchecked]:enabled:shadow-neutral-sm', // Unchecked
                'data-[state=unchecked]:enabled:hover:shadow-neutral', // Unchecked hover
                'disabled:border-neutral-300 disabled:bg-neutral-100 disabled:shadow-none', // Checked/indeterminate & disabled
                'disabled:data-[state=unchecked]:border-neutral-200', // Disabled & unchecked
                className,
            )}
            {...otherProps}
        >
            {avatar && <Avatar size="sm" responsiveSize={{ md: 'md' }} src={avatar} />}
            <div className="flex min-w-0 flex-1 flex-col items-start gap-0.5 text-sm font-normal leading-tight md:gap-1 md:text-base">
                <p
                    id={randomId}
                    className={classNames(
                        'max-w-full cursor-pointer truncate text-neutral-800 group-data-[state=unchecked]:text-neutral-800',
                        'group-data-[disabled]:cursor-default group-data-[disabled]:group-data-[state=unchecked]:text-neutral-300',
                    )}
                >
                    {label}
                </p>
                <p className="max-w-full truncate text-neutral-500 group-data-[disabled]:text-neutral-300">
                    {description}
                </p>
            </div>
            {tag && <Tag {...tag} className={classNames('self-start', tag.className)} />}
            <Icon
                icon={IconType.CHECKBOX}
                size="md"
                className={classNames(
                    'mt-0.5 hidden self-start text-neutral-400 group-data-[state=unchecked]:block group-data-[disabled]:text-neutral-300 md:mt-1',
                )}
            />
            <RadixCheckbox.Indicator className="mt-0.5 self-start text-primary-400 group-data-[disabled]:text-neutral-500 md:mt-1">
                <Icon icon={IconType.CHECKBOX_SELECTED} size="md" className="hidden group-data-[state=checked]:block" />
                <Icon
                    icon={IconType.CHECKBOX_INDETERMINATE}
                    size="md"
                    className="hidden group-data-[state=indeterminate]:block"
                />
            </RadixCheckbox.Indicator>
        </RadixCheckbox.Root>
    );
});

CheckboxCard.displayName = 'CheckboxCard';
