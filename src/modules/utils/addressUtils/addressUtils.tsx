import { isAddress } from 'viem';

class AddressUtils {
    truncateAddress = (address = '') =>
        isAddress(address, { strict: false })
            ? `${address.slice(0, 4)}...${address.slice(address.length - 4, address.length)}`
            : address;
}

export const addressUtils = new AddressUtils();
