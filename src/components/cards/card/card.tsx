import classNames from 'classnames';
import type { HTMLAttributes } from 'react';

export interface ICardProps extends HTMLAttributes<HTMLDivElement> {}

export const Card: React.FC<ICardProps> = (props) => {
    const { className, ...otherProps } = props;

    return (
        <div className={classNames('rounded-xl border border-neutral-100 bg-neutral-0', className)} {...otherProps} />
    );
};
