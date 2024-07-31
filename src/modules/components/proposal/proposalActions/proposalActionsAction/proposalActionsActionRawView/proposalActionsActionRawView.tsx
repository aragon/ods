import { Button, clipboardUtils, InputContainer, InputNumber, InputText, TextArea } from '../../../../../../core';
import { useOdsModulesContext } from '../../../../odsModulesProvider';
import type { IProposalAction } from '../../proposalActionsTypes';

interface IProposalActionsActionRawViewProps {
    /**
     * Proposal action to render raw view for.
     */
    action: IProposalAction;
}

export const ProposalActionsActionRawView: React.FC<IProposalActionsActionRawViewProps> = (props) => {
    const { action } = props;

    const { copy } = useOdsModulesContext();

    return (
        <div className="flex flex-col gap-y-3">
            <div className="flex flex-col gap-y-2">
                <InputContainer label={copy.proposalActionsActionRawView.value} id="value">
                    <InputNumber value={action.value ?? 0} disabled={true} suffix="ETH" />
                </InputContainer>
                <InputContainer label={copy.proposalActionsActionRawView.to} id="to">
                    <InputText value={action.to} disabled={true} />
                </InputContainer>
                <InputContainer label={copy.proposalActionsActionRawView.data} id="data">
                    <TextArea value={action.data} disabled={true} />
                </InputContainer>
                <Button
                    className="self-end"
                    variant="tertiary"
                    size="md"
                    onClick={() => clipboardUtils.copy(action.data)}
                >
                    {copy.proposalActionsActionRawView.copyButton}
                </Button>
            </div>
        </div>
    );
};
