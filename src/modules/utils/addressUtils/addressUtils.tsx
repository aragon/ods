import type { Address } from 'viem';

class AddressUtils {
    truncateAddress = (address: Address) =>
        `${address.slice(0, 4)}...${address.slice(address.length - 4, address.length)}`;
}

export const addressUtils = new AddressUtils();
