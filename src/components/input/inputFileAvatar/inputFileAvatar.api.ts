import { type Accept } from 'react-dropzone';
import { type IInputComponentProps } from '../inputContainer';

export enum InputFileAvatarState {
    IDLE = 'idle',
    SELECTING = 'selecting',
    SUCCESS = 'success',
    ERROR = 'error',
    WARNING = 'warning',
    DISABLED = 'disabled',
}

export enum InputFileAvatarError {
    SQUARE_ONLY = 'square-only',
    WRONG_DIMENSION = 'wrong-dimension',
    UNKNOWN_ERROR = 'unknown-file-error',
}

export interface IInputFileAvatarProps
    extends Omit<
        IInputComponentProps,
        | 'maxLength'
        | 'onChange'
        | 'inputLength'
        | 'wrapperClassName'
        | 'useCustomWrapper'
        | 'inputClassName'
        | 'multiple'
    > {
    /**
     * Function that is called when a file is selected. Passes the file to the parent component.
     * If the file is rejected, the function is not called.
     * If the file is accepted, the function is called with the file as an argument.
     */
    onFileSelect?: (file: File) => void;
    /**
     * Function that is called when a file is rejected. Passes the error message to the parent component.
     */
    onFileError?: (error: string | undefined) => void;
    /**
     * Allowed file extensions, it must be an object with the keys set to the MIME type
     * and the values an array of file extensions (see https://developer.mozilla.org/en-US/docs/Web/API/window/showOpenFilePicker#accept)
     * @default { "image/*": [".png", ".gif", ".jpeg", ".jpg"] }
     */
    acceptedFileTypes?: Accept;
    /**
     * Maximum file size in bytes (e.g. 2097152 bytes | 2 * 1024 ** 2 = 2MiB).
     */
    maxFileSize?: number;
    /**
     * Minimum dimension of the image in pixels. 0 = no constraint. @default 0
     */
    minDimension?: number;
    /**
     * Maximum dimension of the image in pixels.0 = no constraint. @default 0
     */
    maxDimension?: number;
    /**
     * If true, only square images are accepted.
     */
    onlySquare?: boolean;
}
