import { Button, clipboardUtils, InputContainer, InputNumber, InputText, TextArea } from '../../../../../../core';
import type { IProposalAction } from '../../proposalActionsTypes';

interface IProposalActionsActionRawViewProps {
    /**
     * Proposal action to render raw view for.
     */
    action: IProposalAction;
}

export const ProposalActionsActionRawView: React.FC<IProposalActionsActionRawViewProps> = (props) => {
    const { action } = props;
    return (
        <div className="flex flex-col gap-y-3">
            <div className="flex flex-col gap-y-2">
                <InputContainer label="Value" id="value">
                    <InputNumber value={action.value ?? 0} disabled={true} suffix="ETH" />
                </InputContainer>
                <InputContainer label="To" id="to">
                    <InputText value={action.to} disabled={true} />
                </InputContainer>
                <InputContainer label="Data" id="data">
                    <TextArea value={action.data} disabled={true} />
                </InputContainer>
                <Button
                    className="self-end"
                    variant="tertiary"
                    size="md"
                    onClick={() => clipboardUtils.copy(action.data)}
                >
                    Copy data
                </Button>
            </div>
        </div>
    );
};
