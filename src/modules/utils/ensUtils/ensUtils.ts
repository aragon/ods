class EnsUtils {
    // The pattern for a valid ENS domain:
    // - starts with an alphanumeric character (case-insensitive)
    // - followed by zero or more alphanumeric characters, hyphens, or underscores (case-insensitive)
    // - ends with '.eth'
    private ensPattern = /^(?:[a-z0-9]+(?:[-_][a-z0-9]+)*\.)*[a-z0-9]+(?:[-_][a-z0-9]+)*\.eth$/;

    isEnsName(ensName: string): boolean {
        return this.ensPattern.test(ensName);
    }
}

export const ensUtils = new EnsUtils();
