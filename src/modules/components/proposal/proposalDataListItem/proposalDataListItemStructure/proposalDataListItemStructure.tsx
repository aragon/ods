import classNames from 'classnames';
import { type KeyboardEvent } from 'react';
import { useAccount } from 'wagmi';
import { DataList, Tag } from '../../../../../core';
import { addressUtils } from '../../../../utils/addressUtils';
import { ProposalDataListItemResult } from '../proposalDataListItemResult';
import { ProposalDataListItemStatus } from '../proposalDataListItemStatus';
import {
    type IProposalDataListItemStructureProps,
    type IProposalListItemBaseProps,
} from './proposalDataListItemStructureApi';

/**
 * `ProposalDataListItemStructure` module component
 */
export const ProposalDataListItemStructure: React.FC<IProposalDataListItemStructureProps> = (props) => {
    const { wagmiConfig: config, chainId, ...nonWeb3Props } = props;
    const { address: connectedAddress, isConnected } = useAccount({ config });

    let otherComponentProps;
    let resultComponent;

    // pick the proper props upfront so that only the valid base props
    // are applied to the underlying DataListItem component
    if (nonWeb3Props.type === 'approvalThreshold') {
        const { approvalAmount, approvalThreshold, type, ...otherProps } = nonWeb3Props;
        otherComponentProps = otherProps;

        resultComponent = (
            <ProposalDataListItemResult
                approvalAmount={approvalAmount}
                approvalThreshold={approvalThreshold}
                type={type}
            />
        );
    } else if (nonWeb3Props.type === 'majorityVoting') {
        const { option, voteAmount, votePercentage, type, ...otherProps } = nonWeb3Props;
        otherComponentProps = otherProps;

        resultComponent = (
            <ProposalDataListItemResult
                option={option}
                voteAmount={voteAmount}
                votePercentage={votePercentage}
                type={type}
            />
        );
    }

    const {
        date,
        protocolUpdate,
        publisher,
        status,
        summary,
        title,
        voted,
        onPublisherClick,
        ...dataListItemBaseProps
    } = otherComponentProps as Omit<IProposalListItemBaseProps, 'type'>;

    const ongoing = status === 'active' || status === 'challenged' || status === 'vetoed';

    const publisherIsConnected = isConnected && connectedAddress?.toLowerCase() === publisher.address?.toLowerCase();
    const publisherLabel = publisherIsConnected
        ? 'You'
        : publisher.name ?? addressUtils.shortenAddress(publisher.address as string);

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            onPublisherClick?.(publisher);
        }
    };

    return (
        <DataList.Item className="space-y-4" {...dataListItemBaseProps}>
            <ProposalDataListItemStatus date={date} status={status} voted={voted} />
            <div className="space-y-1">
                <p className="line-clamp-1 text-lg leading-tight text-neutral-800 md:text-2xl">{title}</p>
                <p className="line-clamp-2 leading-normal text-neutral-500 md:text-lg">{summary}</p>
            </div>

            {ongoing && resultComponent}
            <div className="flex items-center gap-x-4 md:gap-x-6">
                <div className="flex min-h-5 flex-1 text-sm leading-tight text-neutral-600 md:min-h-6 md:text-base">
                    {/* TODO: apply internationalization [APP-2627] */}
                    By
                    {/* using a span here instead of an actual button so that the HTML stays valid 
                    since the DataList.Item is an anchor tag; must handle set role and handle appropriate keydown event */}
                    <span
                        role="button"
                        className={classNames(
                            'ml-0.5 rounded text-primary-400 md:ml-1',
                            'hover:text-primary-600', // Hover state
                            'active:text-primary-800', // Active state
                            'focus:outline-none focus-visible:ring focus-visible:ring-primary focus-visible:ring-offset', // Focus state
                        )}
                        onClick={() => onPublisherClick?.(publisher)}
                        onKeyDown={handleKeyDown}
                        tabIndex={0}
                    >
                        {publisherLabel}
                    </span>
                </div>

                {/* TODO: apply internationalization [APP-2627] */}
                {protocolUpdate && <Tag label="OSx Update" variant="primary" />}
            </div>
        </DataList.Item>
    );
};
