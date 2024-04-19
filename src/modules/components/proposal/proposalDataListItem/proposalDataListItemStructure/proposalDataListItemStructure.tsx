import classNames from 'classnames';
import { useAccount } from 'wagmi';
import { DataList, Link, Tag } from '../../../../../core';
import { addressUtils } from '../../../../utils/addressUtils';
import { ApprovalThresholdResult } from '../approvalThresholdResult';
import { MajorityVotingResult } from '../majorityVotingResult';
import { ProposalDataListItemStatus } from '../proposalDataListItemStatus';
import { type IProposalDataListItemStructureProps, type IPublisher } from './proposalDataListItemStructure.api';

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
        status,
        summary,
        title,
        voted,
        ...otherProps
    } = props;

    const { address: connectedAddress, isConnected } = useAccount({ config });

    const ongoing = status === 'active' || status === 'challenged' || status === 'vetoed';

    const parsedPublisher = Array.isArray(publisher)
        ? publisher.map((p) => parsePublisher(p, isConnected, connectedAddress))
        : [parsePublisher(publisher, isConnected, connectedAddress)];

    return (
        <DataList.Item className={classNames('flex flex-col gap-y-4', className)} {...otherProps}>
            <ProposalDataListItemStatus date={date} status={status} voted={voted} />
            <div className="flex flex-col gap-y-1">
                <p className="line-clamp-1 text-lg leading-tight text-neutral-800 md:text-2xl">{title}</p>
                <p className="line-clamp-2 leading-normal text-neutral-500 md:text-lg">{summary}</p>
            </div>

            {ongoing && type === 'approvalThreshold' && result && <ApprovalThresholdResult {...result} />}

            {ongoing && type === 'majorityVoting' && result && <MajorityVotingResult {...result} />}

            <div className="flex items-center gap-x-4 md:gap-x-6">
                <div className="flex min-h-5 flex-1 items-center gap-x-0.5 text-sm leading-tight text-neutral-600 md:min-h-6 md:gap-x-1 md:text-base">
                    {/* TODO: apply internationalization [APP-2627] */}
                    By
                    {parsedPublisher.map(({ label, link }, index) => {
                        const separator = index < parsedPublisher.length - 1 ? ',' : '';

                        return (
                            <span key={label} className="flex">
                                {link != null && (
                                    //  using solution from https://kizu.dev/nested-links/ to nest anchor tags
                                    <object type="disregardType">
                                        <Link href={link}>{label}</Link>
                                    </object>
                                )}
                                {link == null && <span>{label}</span>}
                                {separator !== '' && separator}
                            </span>
                        );
                    })}
                </div>
                {tag && <Tag label={tag} variant="primary" />}
            </div>
        </DataList.Item>
    );
};

function parsePublisher(publisher: IPublisher, isConnected: boolean, connectedAddress: string | undefined) {
    const publisherIsConnected = isConnected && connectedAddress?.toLowerCase() === publisher.address.toLowerCase();
    const publisherLabel = publisherIsConnected
        ? 'You'
        : publisher.name ?? addressUtils.truncateAddress(publisher.address);

    return { label: publisherLabel, link: publisher.profileLink };
}
