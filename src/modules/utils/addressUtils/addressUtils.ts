import { isAddress } from 'viem/utils';

class AddressUtils {
    isAddress(address: string): boolean {
        return isAddress(address);
    }

    shortenAddress(address: string): string {
        if (isAddress(address)) {
            return `${address.substring(0, 5)}…${address.substring(address.length - 4, address.length)}`;
        }

        return address;
    }
}

export const addressUtils = new AddressUtils();
