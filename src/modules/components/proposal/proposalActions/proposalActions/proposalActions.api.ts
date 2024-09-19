import type { ReactNode } from 'react';
import type { IconType } from '../../../../../core';
import type { IWeb3ComponentProps } from '../../../../types';
import type { IProposalAction, ProposalActionComponent } from '../proposalActionsTypes';

export interface IProposalActionsDropdownItem {
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
    onClick: (action: IProposalAction) => void;
}

export interface IProposalActionsProps extends IWeb3ComponentProps {
    /**
     * Actions to render.
     */
    actions: IProposalAction[];
    /**
     * Map of action-type <=> action-name displayed on the action header.
     */
    actionNames?: Record<string, string>;
    /**
     * Map of action-type <=> custom-component to customize how actions are displayed.
     */
    customActionComponents?: Record<string, ProposalActionComponent>;
    /**
     * Custom description for the empty state.
     */
    emptyStateDescription: string;
    /**
     * Items to be displayed insdie a dropdown for each proposal action (e.g. remove from list, move up, etc..)
     */
    dropdownItems?: IProposalActionsDropdownItem[];
    /**
     * Additional classes for the component.
     */
    className?: string;
    /**
     * Children of the component.
     */
    children?: ReactNode;
}
