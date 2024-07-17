import { type HTMLAttributes } from 'react';
import { Heading, Icon, IconType } from '../../../../../core';
import { addressUtils } from '../../../../utils';
import type { IProposalAction, IProposalActionWithdrawToken } from '../proposalActionsTypes';
import { ProposalActionType } from '../proposalActionsTypes/proposalAction';

export interface IProposalActionsActionVerificationProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * Proposal action base
     */
    action: IProposalAction;
}

export const ProposalActionsActionVerification: React.FC<IProposalActionsActionVerificationProps> = (props) => {
    const { action } = props;

    let verificationLabel: string | undefined;
    let iconType = IconType.SUCCESS;
    let contractAddressClassName: string | undefined;
    let iconClassName: string | undefined;

    if (action.inputData == null) {
        iconType = IconType.WARNING;
        contractAddressClassName = 'text-warning-800';
        iconClassName = 'text-warning-500';
    } else {
        contractAddressClassName = 'text-neutral-500';
        iconClassName = 'text-primary-300';
        switch (action.type) {
            case ProposalActionType.WITHDRAW_TOKEN: {
                const withdrawAction = action as IProposalActionWithdrawToken;
                verificationLabel = withdrawAction.token.name;
                break;
            }

            default: {
                verificationLabel = 'Verified';
                break;
            }
        }
    }

    return (
        <div className="flex items-center gap-x-1.5">
            <Heading size="h5" className={contractAddressClassName}>
                {addressUtils.truncateAddress(action.contractAddress)}
            </Heading>
            {verificationLabel && (
                <Heading size="h5" className="text-primary-400">
                    {verificationLabel}
                </Heading>
            )}
            <Icon className={iconClassName} icon={iconType} />
        </div>
    );
};
