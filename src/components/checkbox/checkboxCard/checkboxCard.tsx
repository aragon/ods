import * as RadixCheckbox from '@radix-ui/react-checkbox';
import classNames from 'classnames';
import { forwardRef, useId } from 'react';
import { Avatar } from '../../avatars';
import { Icon, IconType } from '../../icon';
import { Tag, type ITagProps } from '../../tag';

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
    const { id, avatar, label, description, tag, className, ...otherProps } = props;

    // Generate random id if id property is not set
    const randomId = useId();
    const processedId = id ?? randomId;

    return (
        <RadixCheckbox.Root
            id={processedId}
            ref={ref}
            className={classNames(
                'group flex h-16 grow flex-row items-center gap-3 md:h-20', // Layout
                'rounded-xl border border-neutral-100 bg-neutral-0 px-4 py-3 md:gap-4 md:px-6 md:py-4', // Style
                'focus:outline-none focus-visible:ring focus-visible:ring-primary focus-visible:ring-offset', // Focus
                'hover:border-neutral-200 hover:shadow-neutral-md', // Hover
                'data-[state=checked]:enabled:border-primary-400 data-[state=checked]:enabled:shadow-primary', // Checked
                'data-[state=checked]:hover:enabled:shadow-primary-md', // Checked hover
                'disabled:border-neutral-200 disabled:bg-neutral-100 disabled:shadow-none', // Disabled
                className,
            )}
            {...otherProps}
        >
            {avatar && <Avatar size="sm" responsiveSize={{ md: 'md' }} src={avatar} />}
            <div className="flex min-w-0 flex-1 flex-col items-start gap-0.5 text-sm font-normal leading-tight md:gap-1 md:text-base">
                <label
                    className={classNames(
                        'max-w-full cursor-pointer truncate text-neutral-800 group-data-[state=unchecked]:text-neutral-500',
                        'group-data-[disabled]:cursor-default group-data-[disabled]:group-data-[state=unchecked]:text-neutral-300',
                    )}
                >
                    {label}
                </label>
                <p className="max-w-full truncate text-neutral-500 group-data-[disabled]:text-neutral-300">
                    {description}
                </p>
            </div>
            {tag && <Tag {...tag} className={classNames('self-start', tag.className)} />}
            <Icon
                icon={IconType.CHECKBOX_DEFAULT}
                size="md"
                className={classNames(
                    'hidden self-start text-neutral-400 group-data-[state=unchecked]:block group-data-[disabled]:text-neutral-300',
                )}
            />
            <RadixCheckbox.Indicator className="self-start text-primary-400 group-data-[disabled]:text-neutral-500">
                <Icon icon={IconType.CHECKBOX_SELECTED} size="md" className="hidden group-data-[state=checked]:block" />
                <Icon
                    icon={IconType.CHECKBOX_MULTI}
                    size="md"
                    className="hidden group-data-[state=indeterminate]:block"
                />
            </RadixCheckbox.Indicator>
        </RadixCheckbox.Root>
    );
});

CheckboxCard.displayName = 'CheckboxCard';
