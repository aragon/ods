import classNames from 'classnames';
import React, { type ComponentProps, type ReactElement } from 'react';
import { Accordion, Card, Heading } from '../../../../../core';
import type { IProposalVotingStageProps } from '../proposalVotingStage';

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
    children: Array<ReactElement<IProposalVotingStageProps>>;
}

export const ProposalVotingContainer: React.FC<IProposalVotingContainerProps> = (props) => {
    const { title, description, className, children, ...otherProps } = props;

    const isMultiStage = children.length > 1;

    return (
        <Card className={classNames('flex flex-col', { '': isMultiStage }, className)} {...otherProps}>
            <div className="flex flex-col gap-3 p-4 md:p-6">
                <Heading size="h2">{title}</Heading>
                <p className="text-base font-normal leading-normal text-neutral-500">{description}</p>
            </div>
            {isMultiStage && (
                <Accordion.Container isMulti={false}>
                    {children.map((child, index) => React.cloneElement(child, { ...child.props, index }))}
                </Accordion.Container>
            )}
            {!isMultiStage && children}
        </Card>
    );
};
