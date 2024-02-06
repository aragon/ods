import * as RadioGroup from '@radix-ui/react-radio-group';
import classNames from 'classnames';
import { useId, type ComponentPropsWithoutRef } from 'react';
import { Avatar } from '../../avatars';
import { Icon, IconType } from '../../icon';
import { Tag, type ITagProps } from '../../tag';

export interface IRadioCardProps extends ComponentPropsWithoutRef<'button'> {
    disabled?: boolean;
    label: string;
    description: string;
    value: string;
    tag?: ITagProps;
    avatar?: string;
}

export const RadioCard: React.FC<IRadioCardProps> = (props) => {
    const { value, id, className, tag, avatar, label, description, ...rest } = props;

    const randomId = useId();
    const processedId = id ?? randomId;

    const containerClasses = classNames(
        'group h-16 truncate rounded-xl border border-neutral-100 bg-neutral-0 px-4 py-3 md:h-20 md:rounded-2xl md:px-6 md:py-4', // default
        'data-[state=checked]:border-primary-400 data-[state=checked]:shadow-primary', // checked
        'focus:outline-none focus-visible:ring focus-visible:ring-primary focus-visible:ring-offset', // focus
        'hover:border-neutral-200 hover:shadow-neutral-md hover:data-[state=checked]:shadow-primary-md', // hover
        'disabled:border-neutral-300 disabled:bg-neutral-100 disabled:shadow-none', // disabled
        'disabled:data-[state=checked]:border-neutral-300 disabled:data-[state=checked]:shadow-none', // disabled & checked
        className,
    );

    const baseTextClasses =
        'text-sm leading-tight text-left text-neutral-500 md:text-base w-full group-disabled:text-neutral-300 truncate';

    const labelClasses = classNames(
        baseTextClasses,
        'group-data-[state=checked]:text-neutral-800 group-disabled:group-data-[state=checked]:text-neutral-800',
    );

    return (
        <RadioGroup.Item value={value} {...rest} id={processedId} className={containerClasses}>
            <div className="flex h-full items-center gap-x-3 md:gap-x-4">
                {avatar && <Avatar responsiveSize={{ sm: 'sm', md: 'md' }} src={avatar} className="" />}
                <div className="flex min-w-0 flex-1 gap-x-0.5 md:gap-x-4">
                    <div className="flex min-w-0 flex-1 flex-col gap-y-0.5 md:gap-y-1">
                        <p className={labelClasses}>{label}</p>
                        <p className={baseTextClasses}>{description}</p>
                    </div>
                    {tag?.label && <Tag {...tag} />}
                </div>
                <span className="h-full">
                    <Icon
                        icon={IconType.RADIO_DEFAULT}
                        className="text-neutral-300 group-data-[state=checked]:hidden"
                    />
                    <RadioGroup.Indicator asChild>
                        <Icon
                            icon={IconType.RADIO_CHECK}
                            className="text-primary-400 group-disabled:text-neutral-500"
                        />
                    </RadioGroup.Indicator>
                </span>
            </div>
        </RadioGroup.Item>
    );
};
