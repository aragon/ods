import type { ComponentProps, ComponentType } from 'react';
import type { IProposalAction, IProposalActionInputDataParameter } from '../proposalActionsDefinitions';

export enum ProposalActionsDecoderView {
    DECODED = 'DECODED',
    RAW = 'RAW',
}

export enum ProposalActionsDecoderMode {
    READ = 'READ',
    EDIT = 'EDIT',
    WATCH = 'WATCH',
}

export interface IProposalActionsDecoderParameterComponentProps {
    /**
     * Parameter to edit.
     */
    parameter: IProposalActionInputDataParameter;
    /**
     * Name of the parameter value field.
     */
    fieldName: string;
    /**
     * Prefix prepended to the field name.
     */
    formPrefix?: string;
    /**
     * Current decoder mode.
     */
    mode?: ProposalActionsDecoderMode;
}

export type ProposalActionsDecoderParameterComponent = ComponentType<IProposalActionsDecoderParameterComponentProps>;

export interface IProposalActionsDecoderProps extends ComponentProps<'div'> {
    /**
     * Action to display the values for.
     */
    action: IProposalAction;
    /**
     * Prefix to be prepended to all the action values on edit mode.
     */
    formPrefix?: string;
    /**
     * Defines the behaviour of the decoder:
     * - READ: Displays the values as disabled using the values on the action property;
     * - EDIT: Displays the values as editable and updates the values on the form context;
     * - WATCH: Displays the values as disabled but each value listens to the changes on the form context;
     * @default READ
     */
    mode?: ProposalActionsDecoderMode;
    /**
     * Defines the action values to be displayed:
     * - DECODED: Displays the parameters of the action and the value field if the function is payable;
     * - RAW: Only displays the base values of the action (value and data);
     * @default RAW
     */
    view?: ProposalActionsDecoderView;
    /**
     * Custom editors for decoded top-level parameters, keyed by parameter index.
     * The custom editor writes to the supplied form field and the decoder keeps
     * the action calldata in sync.
     */
    customParameterComponents?: Partial<Record<number, ProposalActionsDecoderParameterComponent>>;
}
