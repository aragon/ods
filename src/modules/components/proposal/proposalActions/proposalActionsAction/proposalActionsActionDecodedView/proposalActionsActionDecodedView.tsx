import { InputNumber, InputText } from '../../../../../../core';
import { useOdsModulesContext } from '../../../../odsModulesProvider';
import type { IProposalAction } from '../../proposalActionsTypes';

export interface IProposalActionsActionDecodedViewProps {
    /**
     * Proposal action to render decoded view for.
     */
    action: IProposalAction;
}

export const ProposalActionsActionDecodedView: React.FC<IProposalActionsActionDecodedViewProps> = (props) => {
    const { action } = props;
    const { copy } = useOdsModulesContext();

    return (
        <div className="flex flex-col gap-y-3">
            <div className="flex flex-col gap-y-2">
                <InputNumber
                    label={copy.proposalActionsActionDecodedView.valueLabel}
                    helpText={copy.proposalActionsActionDecodedView.valueHelper}
                    value={action.value ?? 0}
                    disabled={true}
                    suffix="ETH"
                />
            </div>
            {action.inputData?.parameters.map((parameter) => (
                <InputText
                    key={parameter.name}
                    label={`${parameter.name} ${parameter.type && `(${parameter.type})`}`}
                    helpText={parameter.comment}
                    value={parameter.value}
                    disabled={true}
                />
            ))}
        </div>
    );
};
