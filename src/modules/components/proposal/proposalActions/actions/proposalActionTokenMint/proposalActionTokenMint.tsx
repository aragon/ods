import { DataList } from '../../../../../../core';
import { MemberDataListItemStructure } from '../../../../member';
import { type IProposalActionComponentProps, type IProposalActionTokenMint } from '../../proposalActionsTypes';

export interface IProposalActionTokenMintProps extends IProposalActionComponentProps<IProposalActionTokenMint> {}

export const ProposalActionTokenMint: React.FC<IProposalActionTokenMintProps> = (props) => {
    const { action } = props;
    const { tokenSymbol, receiver } = action;
    const { currentBalance, newBalance, address, name, avatarSrc } = receiver;

    const mintedTokenAmount = +newBalance - +currentBalance;

    return (
        <div className="flex w-full flex-col gap-8">
            <DataList.Root entityLabel="proposalActionTokenMintReceivers">
                <DataList.Container>
                    <MemberDataListItemStructure
                        className="w-full"
                        address={address}
                        ensName={name}
                        avatarSrc={avatarSrc}
                        tokenAmount={mintedTokenAmount}
                        tokenSymbol={tokenSymbol}
                        hideLabelTokenVoting={true}
                    />
                </DataList.Container>
            </DataList.Root>
        </div>
    );
};
