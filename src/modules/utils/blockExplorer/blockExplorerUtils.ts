import { type Chain } from 'wagmi/chains';

class BlockExplorerUtils {
    getAddressUrl(address: string, network: Chain): string {
        if (network.blockExplorers?.default?.url) {
            return `${network.blockExplorers.default.url}/address/${address}`;
        }
        throw new Error(`Block explorer URL not found for network: ${network.name}`);
    }

    getTransactionUrl(transaction: string, network: Chain): string {
        if (network.blockExplorers?.default?.url) {
            return `${network.blockExplorers.default.url}/tx/${transaction}`;
        }
        throw new Error(`Block explorer URL not found for network: ${network.name}`);
    }

    getTokenUrl(token: string, network: Chain): string {
        if (network.blockExplorers?.default?.url) {
            return `${network.blockExplorers.default.url}/token/${token}`;
        }
        throw new Error(`Block explorer URL not found for network: ${network.name}`);
    }
}

export const blockExplorerUtils = new BlockExplorerUtils();
