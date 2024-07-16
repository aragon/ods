import classNames from 'classnames';
import { Icon, IconType, Link } from '../../../../../core';
import { ChainEntityType, useBlockExplorer } from '../../../../hooks';
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

    const explorerUrl = useBlockExplorer();

    let verificationLabel: string | undefined = undefined;
    let verificationLink: string | undefined = undefined;
    let iconType = IconType.SUCCESS;
    let contractAddressClassName = 'text-neutral-500';

    if (!action.inputData) {
        verificationLabel = 'Not verified';
        iconType = IconType.WARNING;
        contractAddressClassName = 'text-warning-800';
    } else {
        switch (action.type) {
            case 'withdrawToken': {
                const withdrawAction = action as IProposalActionWithdrawToken;
                verificationLabel = `${withdrawAction.token.name}`;
                verificationLink = explorerUrl.getChainEntityUrl({
                    chainId: 1,
                    type: ChainEntityType.ADDRESS,
                    id: withdrawAction.token.address,
                });
                break;
            }
            default: {
                verificationLabel = 'Verified Contract';
                verificationLink = explorerUrl.getChainEntityUrl({
                    // TODO - get chain id from the action if coming from the backend
                    chainId: 1,
                    type: ChainEntityType.ADDRESS,
                    id: action.contractAddress,
                });
            }
        }
    }

    const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.stopPropagation();
    };

    return (
        <div className="flex items-center gap-2">
            <p className={classNames(contractAddressClassName)}>
                {addressUtils.truncateAddress(action.contractAddress)}
            </p>
            {verificationLink ? (
                <>
                    <Link href={verificationLink} onClick={handleLinkClick} target="_blank">
                        {verificationLabel}
                    </Link>
                    <Icon className="text-primary-300" icon={iconType} />
                </>
            ) : (
                <Icon className="text-warning-500" icon={iconType} />
            )}
        </div>
    );
};
