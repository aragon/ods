import type { ComponentType } from 'react';
import type { IWeb3ComponentProps } from '../../../../types';
import type { IProposalAction } from './proposalAction';

export interface IProposalActionComponentProps<TAction = IProposalAction> extends IWeb3ComponentProps {
    /**
     * Action to be rendered.
     */
    action: TAction;
}

export type ProposalActionComponent<TAction = IProposalAction> = ComponentType<IProposalActionComponentProps<TAction>>;
