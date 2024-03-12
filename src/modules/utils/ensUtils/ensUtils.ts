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
    isEnsName = (value?: string): boolean => (value != null ? this.ensPattern.test(value) : false);
}

export const ensUtils = new EnsUtils();
