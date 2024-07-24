import { DataList, DefinitionList, formatterUtils, Heading, NumberFormat } from '../../../../../../core';
import { modulesCopy } from '../../../../../assets';
import { MemberDataListItemStructure } from '../../../../member';
import { type IProposalActionComponentProps, type IProposalActionTokenMint } from '../../proposalActionsTypes';

export interface IProposalActionTokenMintProps extends IProposalActionComponentProps<IProposalActionTokenMint> {}

export const ProposalActionTokenMint: React.FC<IProposalActionTokenMintProps> = (props) => {
    const { action } = props;

    const newTokens = action.receivers.reduce((sum, receiver) => {
        /* For each receiver, calculate the difference between the new balance and the current balance. Keep track of the difference to get the total number of new tokens distributed */
        return sum + (receiver.newBalance - receiver.currentBalance);
    }, 0);

    const newHolders = action.receivers.reduce((count, receiver) => {
        /* Check if the receiver's current balance is 0, which means they are a new holder. If true, increment the count by 1. */
        return count + (receiver.currentBalance === 0 ? 1 : 0);
    }, 0);

    const formattedNewTokens = formatterUtils.formatNumber(newTokens, {
        format: NumberFormat.TOKEN_AMOUNT_SHORT,
        withSign: true,
    });
    const formattedNewHolders = formatterUtils.formatNumber(newHolders, {
        format: NumberFormat.GENERIC_SHORT,
        withSign: true,
    });
    const formattedTotalTokenSupply =
        formatterUtils.formatNumber(action.tokenSupply, { format: NumberFormat.TOKEN_AMOUNT_SHORT }) ?? 0;
    const formattedTotalTokenHolders =
        formatterUtils.formatNumber(action.holdersCount, { format: NumberFormat.GENERIC_SHORT }) ?? 0;

    return (
        <div className="flex w-full flex-col gap-8">
            <DataList.Root entityLabel="proposalActionTokenMintReceivers">
                <DataList.Container className="grid grid-cols-1 gap-2 md:grid-cols-2">
                    {action.receivers.map(({ address, newBalance, currentBalance }) => (
                        <MemberDataListItemStructure
                            key={address}
                            className="w-full"
                            address={address}
                            tokenAmount={newBalance - currentBalance}
                            tokenSymbol={action.tokenSymbol}
                            hideLabelTokenVoting={true}
                        />
                    ))}
                </DataList.Container>
            </DataList.Root>
            <div className="flex flex-col gap-2">
                <Heading size="h4">{modulesCopy.proposalActionsTokenMint.summaryHeading}</Heading>
                <DefinitionList.Container>
                    <DefinitionList.Item term={modulesCopy.proposalActionsTokenMint.newTokensTerm}>
                        <p className="text-base leading-tight text-neutral-800">{`${formattedNewTokens} ${action.tokenSymbol}`}</p>
                    </DefinitionList.Item>
                    <DefinitionList.Item term={modulesCopy.proposalActionsTokenMint.newHoldersTerm}>
                        <p className="text-base leading-tight text-neutral-800">{formattedNewHolders}</p>
                    </DefinitionList.Item>
                    <DefinitionList.Item term={modulesCopy.proposalActionsTokenMint.totalTokenSupplyTerm}>
                        <p className="text-base leading-tight text-neutral-800">{`${formattedTotalTokenSupply} ${action.tokenSymbol}`}</p>
                    </DefinitionList.Item>
                    <DefinitionList.Item term={modulesCopy.proposalActionsTokenMint.totalHoldersTerm}>
                        <p className="text-base leading-tight text-neutral-800">{formattedTotalTokenHolders}</p>
                    </DefinitionList.Item>
                </DefinitionList.Container>
            </div>
        </div>
    );
};
