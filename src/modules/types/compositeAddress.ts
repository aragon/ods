export interface ICompositeAddress {
    /**
     * Address of the blockchain entity.
     */
    address: string;
    /**
     * Name (e.g. ENS name) linked to the address.
     */
    name?: string;
    /**
     * URL of the avatar (e.g. ENS avatar) linked to the address.
     */
    avatarSrc?: string;
}
