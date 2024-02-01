import classNames from 'classnames';
import type { HTMLAttributes } from 'react';
import { EmptyState } from '../../emptyState';

export interface ICardProps extends HTMLAttributes<HTMLDivElement> {}

export const Card: React.FC<ICardProps> = (props) => {
    const { className, ...otherProps } = props;

    return (
        <div className={classNames('rounded-xl border border-neutral-100 bg-neutral-0', className)} {...otherProps}>
            <EmptyState
                illustrationType="object"
                illustration="BUILD"
                title="Title"
                description="Description"
                primaryButton={{ size: 'sm', variant: 'secondary', children: 'Secondary' }}
                secondaryButton={{ size: 'sm', variant: 'primary', children: 'Secondary' }}
                isStacked={true}
            />
        </div>
    );
};
