import { InputContainer, InputNumber, InputText } from '../../../../../../core';
import { useOdsModulesContext } from '../../../../odsModulesProvider';
import type { IProposalAction } from '../../proposalActionsTypes';

interface IProposalActionsActionDecodedViewProps {
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
                <InputContainer label="Value" helpText={copy.proposalActionsActionDecodedView.valueHelper} id="value">
                    <InputNumber value={action.value ?? 0} disabled={true} suffix="ETH" />
                </InputContainer>
            </div>
            {action.inputData &&
                action.inputData.parameters.map((parameter) => (
                    <InputContainer
                        key={parameter.name}
                        label={parameter.name}
                        helpText={parameter.comment}
                        id={`${parameter.name}`}
                    >
                        <InputText value={parameter.value} disabled={true} />
                    </InputContainer>
                ))}
        </div>
    );
};
