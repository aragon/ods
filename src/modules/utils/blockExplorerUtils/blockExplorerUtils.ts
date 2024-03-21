import { type Hash } from 'viem';

export enum QueryType {
    TX = 'TX',
    BLOCK = 'BLOCK',
    ADDRESS = 'ADDRESS',
}

type ExplorerLinkCriteria = {
    chainId?: number;
    queryType?: QueryType;
    txHash?: Hash;
};

export function createBlockExplorerLink(criteria: ExplorerLinkCriteria): string | undefined {
    const { chainId, queryType, txHash } = criteria;

    if (chainId === undefined || queryType === undefined || txHash === undefined) {
        return undefined;
    }

    const baseUrls: { [key: number]: string } = {
        1: 'https://etherscan.io/',
        11155111: 'https://sepolia.etherscan.io/',
        137: 'https://polygonscan.com/',
        42161: 'https://arbiscan.io/',
        8453: 'https://basescan.org/',
    };
    const baseUrl = baseUrls[chainId];

    const typePaths: { [key in NonNullable<ExplorerLinkCriteria['queryType']>]?: string } = {
        TX: 'tx/',
        BLOCK: 'block/',
        ADDRESS: 'address/',
    };
    const path = typePaths[queryType];

    return `${baseUrl}${path}${txHash}`;
}
