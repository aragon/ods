class EnsUtils {
    // The pattern for a valid ENS domain:
    // - starts with an alphanumeric character (case-insensitive)
    // - followed by zero or more alphanumeric characters, hyphens, or underscores (case-insensitive)
    // - ends with '.eth'
    private ensPattern = /^(?:[a-z0-9]+(?:[-_][a-z0-9]+)*\.)*[a-z0-9]+(?:[-_][a-z0-9]+)*\.eth$/;

    /**
     * Checks if the given value is a valid ENS name or not.
     * @param value The value to be checked.
     * @returns True when the given value is a valid ENS name, false otherwise.
     */
    isEnsName = (value?: string): boolean => (value != null && value.length > 6 ? this.ensPattern.test(value) : false);

    /**
     * Truncates the ENS name by displaying the first 5 characters and the eth suffix.
     * @param address The ENS name to truncate
     * @returns The truncated ENS name when the ens input is valid, the ENS input as is otherwise.
     */
    truncateEns = (ens = '') =>
        this.isEnsName(ens) && ens.length > 9 ? `${ens.slice(0, 5)}…${ens.slice(ens.length - 3, ens.length)}` : ens;
}

export const ensUtils = new EnsUtils();
