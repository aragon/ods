import classNames from 'classnames';
import { useAccount } from 'wagmi';
import { DataList, Tag } from '../../../../../core';
import { addressUtils } from '../../../../utils/addressUtils';
import { ApprovalThresholdResult } from '../approvalThresholdResult';
import { MajorityVotingResult } from '../majorityVotingResult';
import { ProposalDataListItemStatus } from '../proposalDataListItemStatus';
import {
    type IApprovalThresholdResult,
    type IMajorityVotingResult,
    type IProposalDataListItemStructureProps,
} from './proposalDataListItemStructure.api';

/**
 * `ProposalDataListItemStructure` module component
 */
export const ProposalDataListItemStructure: React.FC<IProposalDataListItemStructureProps> = (props) => {
    const {
        wagmiConfig: config,
        chainId,
        type,
        result,
        date,
        protocolUpdate,
        publisher,
        publisherProfileLink,
        status,
        summary,
        title,
        voted,
        ...otherProps
    } = props;

    const { address: connectedAddress, isConnected } = useAccount({ config });

    const ongoing = status === 'active' || status === 'challenged' || status === 'vetoed';

    const publisherIsConnected = isConnected && connectedAddress?.toLowerCase() === publisher.address?.toLowerCase();
    const publisherLabel = publisherIsConnected
        ? 'You'
        : publisher.name ?? addressUtils.shortenAddress(publisher.address as string);

    return (
        <DataList.Item className="space-y-4" {...otherProps}>
            <ProposalDataListItemStatus date={date} status={status} voted={voted} />
            <div className="space-y-1">
                <p className="line-clamp-1 text-lg leading-tight text-neutral-800 md:text-2xl">{title}</p>
                <p className="line-clamp-2 leading-normal text-neutral-500 md:text-lg">{summary}</p>
            </div>

            {ongoing && props.type === 'approvalThreshold' && (
                <ApprovalThresholdResult {...(result as IApprovalThresholdResult)} />
            )}

            {ongoing && type === 'majorityVoting' && <MajorityVotingResult {...(result as IMajorityVotingResult)} />}

            <div className="flex items-center gap-x-4 md:gap-x-6">
                <div className="flex min-h-5 flex-1 items-center gap-x-0.5 text-sm leading-tight text-neutral-600 md:min-h-6 md:text-base">
                    {/* TODO: apply internationalization [APP-2627] */}
                    By
                    {/* using solution from https://kizu.dev/nested-links/ to nest anchor tags */}
                    <object type="disregardType" className="ml-0.5 md:ml-1">
                        <a
                            tabIndex={0}
                            href={publisherProfileLink}
                            className={classNames(
                                'text-primary-400',
                                'hover:text-primary-600', // Hover state
                                'active:text-primary-800', // Active state
                                'focus:outline-none focus-visible:ring focus-visible:ring-primary focus-visible:ring-offset', // Focus state
                            )}
                        >
                            {publisherLabel}
                        </a>
                    </object>
                </div>

                {/* TODO: apply internationalization [APP-2627] */}
                {protocolUpdate && <Tag label="OSx Update" variant="primary" />}
            </div>
        </DataList.Item>
    );
};
