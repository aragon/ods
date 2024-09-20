import type { ReactNode } from 'react';
import type { IconType } from '../../../../../core';
import type { IWeb3ComponentProps } from '../../../../types';
import type { IProposalAction, ProposalActionComponent } from '../proposalActionsTypes';

export interface IProposalActionsDropdownItem<TAction extends IProposalAction = IProposalAction> {
    /**
     * Label of the item.
     */
    label: string;
    /**
     * Icon of the item.
     */
    icon: IconType;
    /**
     * Callback called with the current action on item click.
     */
    onClick: (action: TAction, index: number) => void;
}

export interface IProposalActionsProps<TAction extends IProposalAction = IProposalAction> extends IWeb3ComponentProps {
    /**
     * Actions to render.
     */
    actions: TAction[];
    /**
     * Optional action attribute name to be used as a key, useful for using the component within a form library.
     * @default action-{index}
     */
    actionKey?: keyof TAction;
    /**
     * Map of action-type <=> action-name displayed on the action header.
     */
    actionNames?: Record<string, string>;
    /**
     * Map of action-type <=> custom-component to customize how actions are displayed.
     */
    customActionComponents?: Record<string, ProposalActionComponent<TAction>>;
    /**
     * Custom description for the empty state.
     */
    emptyStateDescription: string;
    /**
     * Items to be displayed inside a dropdown for each proposal action (e.g. remove from list, move up, etc..)
     */
    dropdownItems?: Array<IProposalActionsDropdownItem<TAction>>;
    /**
     * Additional classes for the component.
     */
    className?: string;
    /**
     * Children of the component.
     */
    children?: ReactNode;
}
