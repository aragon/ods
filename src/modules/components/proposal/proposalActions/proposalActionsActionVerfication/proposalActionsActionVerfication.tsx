import { type ComponentProps } from 'react';
import { Heading, Icon, IconType } from '../../../../../core';
import { addressUtils } from '../../../../utils';
import { type IProposalAction } from '../proposalActionsTypes';

export interface IProposalActionsActionVerificationProps extends ComponentProps<'div'> {
    /**
     * Proposal action base
     */
    action: IProposalAction;
}

export const ProposalActionsActionVerification: React.FC<IProposalActionsActionVerificationProps> = (props) => {
    const { action } = props;

    const contractClassName = action.inputData == null ? 'text-warning-800' : 'text-neutral-500';
    const contractName = action.inputData?.contract;
    const icon =
        action.inputData == null
            ? { className: 'text-warning-500', icon: IconType.WARNING }
            : { className: 'text-primary-300', icon: IconType.SUCCESS };

    return (
        <div className="flex items-center gap-x-1.5">
            <Heading size="h5" className={contractClassName}>
                {addressUtils.truncateAddress(action.contractAddress)}
            </Heading>
            {contractName && (
                <Heading size="h5" className="text-primary-400">
                    {contractName}
                </Heading>
            )}
            <Icon className={icon.className} icon={icon.icon} />
        </div>
    );
};
