import { InputContainer, InputNumber, InputText } from '../../../../../../core';
import type { IProposalAction } from '../../proposalActionsTypes';

interface IProposalActionsActionDecodedViewProps {
    /**
     * Proposal action to render decoded view for.
     */
    action: IProposalAction;
}

export const ProposalActionsActionDecodedView: React.FC<IProposalActionsActionDecodedViewProps> = (props) => {
    const { action } = props;
    return (
        <div className="flex flex-col gap-y-3">
            <div className="flex flex-col gap-y-2">
                <InputContainer label="Value" helpText="Amount of ETH to transfer to the smart contract" id="value">
                    <InputNumber value={action.value ?? 0} disabled={true} suffix="ETH" />
                </InputContainer>
            </div>
            {action.inputData &&
                action.inputData.parameters.map((parameter, index) => (
                    <div key={index} className="flex flex-col gap-y-2">
                        <InputContainer
                            label={parameter.type}
                            helpText="Natspec placeholder"
                            id={`${parameter.type + index}`}
                        >
                            <InputText value={parameter.value} disabled={true} />
                        </InputContainer>
                    </div>
                ))}
        </div>
    );
};
