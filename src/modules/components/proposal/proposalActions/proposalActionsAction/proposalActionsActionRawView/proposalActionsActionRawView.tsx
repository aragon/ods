import { Button, clipboardUtils, InputNumber, InputText, TextArea } from '../../../../../../core';
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
                <InputNumber
                    label={copy.proposalActionsActionRawView.value}
                    value={action.value ?? 0}
                    disabled={true}
                    suffix="ETH"
                />

                <InputText label={copy.proposalActionsActionRawView.to} value={action.to} disabled={true} />

                <TextArea label={copy.proposalActionsActionRawView.data} value={action.data} disabled={true} />

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
