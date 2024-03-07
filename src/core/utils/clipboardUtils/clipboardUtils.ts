export interface IPasteParams {
    /**
     * Callback called on paste error.
     */
    onError?: (error: unknown) => void;
}

class ClipboardUtils {
    copy = () => {
        //
    };

    paste = async (params: IPasteParams = {}): Promise<string> => {
        const { onError } = params;
        let clipboardText = '';

        try {
            clipboardText = await navigator.clipboard.readText();
        } catch (error: unknown) {
            onError?.(error);
        }

        return clipboardText;
    };
}

export const clipboardUtils = new ClipboardUtils();
