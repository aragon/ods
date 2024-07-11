import classNames from 'classnames';
import React, { Children, type ComponentProps, type ReactNode } from 'react';
import { Accordion, Card, Heading } from '../../../../../core';

export interface IProposalVotingContainerProps extends ComponentProps<'div'> {
    /**
     * Title displayed on top.
     */
    title: string;
    /**
     * Description of the proposal voting.
     */
    description: string;
    /**
     * Children of the container.
     */
    children: ReactNode;
}

export const ProposalVotingContainer: React.FC<IProposalVotingContainerProps> = (props) => {
    const { title, description, className, children, ...otherProps } = props;

    const processedChildren = Children.toArray(children);
    const isMultiStage = processedChildren.length > 1;

    return (
        <Card className={classNames('flex flex-col', { '': isMultiStage }, className)} {...otherProps}>
            <div className="flex flex-col gap-3 p-4 md:p-6">
                <Heading size="h2">{title}</Heading>
                <p className="text-base font-normal leading-normal text-neutral-500">{description}</p>
                {/* TODO: start date for single stage proposals */}
            </div>
            {isMultiStage && (
                <Accordion.Container isMulti={false}>
                    {processedChildren.map((child, index) =>
                        React.isValidElement(child) ? React.cloneElement(child, { ...child.props, index }) : child,
                    )}
                </Accordion.Container>
            )}
            {!isMultiStage && <div className="px-12 pb-6 pt-1">{children}</div>}
        </Card>
    );
};
