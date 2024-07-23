class SsrUtils {
    /**
     * Checks if code is running on a server environment.
     */
    isServer = () => typeof window === 'undefined';
}

export const ssrUtils = new SsrUtils();
