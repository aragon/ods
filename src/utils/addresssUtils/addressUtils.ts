class AddressUtils {
    // The pattern for a valid ENS domain:
    // - starts with an alphanumeric character (case-insensitive)
    // - followed by zero or more alphanumeric characters, hyphens, or underscores (case-insensitive)
    // - ends with '.eth'
    private ensRegex = /^(?:[a-z0-9]+(?:[-_][a-z0-9]+)*\.)*[a-z0-9]+(?:[-_][a-z0-9]+)*\.eth$/;
    private addressRegex = /^0x[a-fA-F0-9]{40}$/;

    isAddress(value: string | null | undefined): boolean {
        if (!value || typeof value !== 'string') {
            return false;
        }

        return this.addressRegex.test(value);
    }

    isEnsDomain(value: string | null | undefined): boolean {
        if (!value || typeof value !== 'string') {
            return false;
        }

        return this.ensRegex.test(value);
    }
}

export const addressUtils = new AddressUtils();
