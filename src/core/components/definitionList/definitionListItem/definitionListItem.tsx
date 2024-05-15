import classNames from 'classnames';
import { type ComponentPropsWithRef } from 'react';
import { useDefinitionListContext } from '../definitionListContext'; // Correct import path to your context file

export interface IDefinitionListItemProps extends ComponentPropsWithRef<'div'> {
    label: string;
}

export const DefinitionListItem: React.FC<IDefinitionListItemProps> = (props) => {
    const { label, children, className, ...otherProps } = props;
    useDefinitionListContext();

    return (
        <div
            className={classNames(
                'flex w-full flex-col items-start justify-between gap-y-2 border-b border-neutral-100 py-3 last:border-none md:flex md:flex-row md:gap-x-6 md:py-4',
                className,
            )}
            {...otherProps}
        >
            <dt className="shrink-0 text-base font-normal leading-tight md:w-40">{label}</dt>
            <dd className="size-full">{children}</dd>
        </div>
    );
};
