import classNames from 'classnames';
import type { ComponentProps } from 'react';

export interface IProposalVotingProgressContainerProps extends ComponentProps<'div'> {
    /**
     * Flex direction of the ProposalVotingProgress components. On small screens, the components will be rendered
     * in a flex column container regardeless.
     * @default row;
     */
    direction?: 'row' | 'col';
}

export const ProposalVotingProgressContainer: React.FC<IProposalVotingProgressContainerProps> = (props) => {
    const { direction = 'row', className, ...otherProps } = props;

    const colClassNames = 'flex-col *:pb-6 *:border-b *:border-b-neutral-100';
    const rowClassNames =
        'md:flex-row md:*:pr-6 md:*:border-r md:*:border-r-neutral-100 md:*:pb-0 md:*:border-b-neutral-0';

    const containerClassNames = classNames(
        'flex gap-6 rounded-xl border border-neutral-100 bg-neutral-0 px-4 py-3 shadow-neutral-sm md:p-6',
        '[&>*:last-child]:border-none [&>*:last-child]:p-0',
        colClassNames,
        direction === 'row' && rowClassNames,
        className,
    );

    return <div className={containerClassNames} {...otherProps} />;
};
