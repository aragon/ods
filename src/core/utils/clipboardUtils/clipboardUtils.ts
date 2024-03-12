export interface IClipboardUtilsParams {
    /**
     * Callback called on paste error.
     */
    onError?: (error: unknown) => void;
}

class ClipboardUtils {
    copy = async (value: string, params: IClipboardUtilsParams = {}): Promise<void> => {
        const { onError } = params;

        try {
            await navigator.clipboard.writeText(value);
        } catch (error: unknown) {
            onError?.(error);
        }
    };

    paste = async (params: IClipboardUtilsParams = {}): Promise<string> => {
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
