import classNames from 'classnames';
import { useAccount } from 'wagmi';
import { DataList, Link, Tag } from '../../../../../core';
import { addressUtils } from '../../../../utils/addressUtils';
import { ApprovalThresholdResult } from '../approvalThresholdResult';
import { MajorityVotingResult } from '../majorityVotingResult';
import { ProposalDataListItemStatus } from '../proposalDataListItemStatus';
import { type IProposalDataListItemStructureProps } from './proposalDataListItemStructure.api';

/**
 * `ProposalDataListItemStructure` module component
 */
export const ProposalDataListItemStructure: React.FC<IProposalDataListItemStructureProps> = (props) => {
    const {
        wagmiConfig: config,
        chainId,
        className,
        type,
        result,
        date,
        tag,
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

    const publisherIsConnected = isConnected && connectedAddress?.toLowerCase() === publisher.address.toLowerCase();
    const publisherLabel = publisherIsConnected
        ? 'You'
        : publisher.name ?? addressUtils.truncateAddress(publisher.address);

    return (
        <DataList.Item className={classNames('flex flex-col gap-y-4', className)} {...otherProps}>
            <ProposalDataListItemStatus date={date} status={status} voted={voted} />
            <div className="flex flex-col gap-y-1">
                <p className="line-clamp-1 text-lg leading-tight text-neutral-800 md:text-2xl">{title}</p>
                <p className="line-clamp-2 leading-normal text-neutral-500 md:text-lg">{summary}</p>
            </div>

            {ongoing && type === 'approvalThreshold' && <ApprovalThresholdResult {...result} />}

            {ongoing && type === 'majorityVoting' && <MajorityVotingResult {...result} />}

            <div className="flex items-center gap-x-4 md:gap-x-6">
                <div className="flex min-h-5 flex-1 items-center gap-x-0.5 text-sm leading-tight text-neutral-600 md:min-h-6 md:text-base">
                    {/* TODO: apply internationalization [APP-2627] */}
                    By
                    {/* using solution from https://kizu.dev/nested-links/ to nest anchor tags */}
                    <object type="disregardType" className="ml-0.5 md:ml-1">
                        <Link href={publisherProfileLink}>{publisherLabel}</Link>
                    </object>
                </div>
                {tag && <Tag label={tag} variant="primary" />}
            </div>
        </DataList.Item>
    );
};
