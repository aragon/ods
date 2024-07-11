import type { ReactNode } from 'react';
import { Accordion, type IAccordionItemProps, StatePingAnimation, invariant } from '../../../../../core';

export interface IProposalVotingStageProps extends IAccordionItemProps {
    /**
     * Name of the proposal stage.
     */
    name: string;
    /**
     * Status of the stage.
     */
    status: 'active' | 'pending' | 'accepted' | 'rejected' | 'unreached';
    /**
     * Start date of the stage in timestamp or ISO format.
     */
    startDate: number | string;
    /**
     * Default tab displayed for the current stage.
     */
    defaultTab?: string; // TODO: tab type
    /**
     * Index of the stage.
     */
    index?: number;
    /**
     * Children of the component rendered as content of the Accordion.
     */
    children?: ReactNode;
}

export const ProposalVotingStage: React.FC<IProposalVotingStageProps> = (props) => {
    const { name, status, startDate, defaultTab, index, children, ...otherProps } = props;

    invariant(
        index != null,
        'ProposalVotingStage: component must be used inside a ProposalVotingContainer to work properly.',
    );

    return (
        <Accordion.Item {...otherProps}>
            <Accordion.ItemHeader>
                <div className="flex grow flex-row justify-between gap-4 md:gap-6">
                    <div className="flex flex-col gap-1">
                        <p className="text-lg font-normal leading-tight text-neutral-800">{name}</p>
                        <div className="flex flex-row items-center gap-2">
                            <p className="text-base font-normal leading-tight text-neutral-500">7 days left to vote</p>
                            <StatePingAnimation />
                        </div>
                    </div>
                    <p className="mt-1 text-sm font-normal leading-tight text-neutral-500">Stage {index + 1}</p>
                </div>
            </Accordion.ItemHeader>
            <Accordion.ItemContent>{children}</Accordion.ItemContent>
        </Accordion.Item>
    );
};
