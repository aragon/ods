export const invariantError = 'Invariant';

export function invariant(condition: boolean, message: string): asserts condition {
    if (!condition) {
        const error = new Error(message);
        error.name = invariantError;

        throw error;
    }

    return;
}
