import { isAddress } from 'viem';

export interface IIsAddressParams {
    /**
     * Whether or not to compare the address against its checksum.
     * @default false
     */
    strict?: boolean;
}

class AddressUtils {
    /**
     * Checks if the given address is a valid address or not
     * @param address The address to be checked
     * @param options Options for the address check (@see IIsAddressParams)
     * @returns True when the given address is a valid address, false otherwise.
     */
    isAddress = (address = '', options: IIsAddressParams = { strict: false }) => isAddress(address, options);

    /**
     * Truncates the input address by displaying the first and last 4 characters.
     * @param address The address to truncate
     * @returns The truncated address when the address input is valid, the address input as is otherwise.
     */
    truncateAddress = (address = '') =>
        this.isAddress(address)
            ? `${address.slice(0, 4)}...${address.slice(address.length - 4, address.length)}`
            : address;
}

export const addressUtils = new AddressUtils();
