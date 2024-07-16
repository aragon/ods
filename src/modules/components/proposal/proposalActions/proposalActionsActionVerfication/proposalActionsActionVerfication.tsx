import { Heading, Icon, IconType } from '../../../../../core';
import { addressUtils } from '../../../../utils';
import type { IProposalAction, IProposalActionWithdrawToken } from '../proposalActionsTypes';

export interface IProposalActionsActionVerificationProps {
    /**
     * Proposal action base
     */
    action: IProposalAction;
}

export const ProposalActionsActionVerification: React.FC<IProposalActionsActionVerificationProps> = (props) => {
    const { action } = props;

    let verificationLabel: string | undefined = undefined;
    let iconType = IconType.SUCCESS;
    let contractAddressClassName = 'text-neutral-500';
    let iconClassName = 'text-primary-300';

    if (!action.inputData) {
        verificationLabel = undefined;
        iconType = IconType.WARNING;
        contractAddressClassName = 'text-warning-800';
        iconClassName = 'text-warning-500';
    } else {
        switch (action.type) {
            case 'withdrawToken': {
                const withdrawAction = action as IProposalActionWithdrawToken;
                verificationLabel = `${withdrawAction.token.name}`;

                break;
            }
            default: {
                verificationLabel = 'Verified Contract';
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
