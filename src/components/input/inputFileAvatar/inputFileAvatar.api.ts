import type { IInputComponentProps } from '../inputContainer';

export enum InputFileAvatarState {
    IDLE = 'idle',
    SELECTING = 'selecting',
    SUCCESS = 'success',
    ERROR = 'error',
    WARNING = 'warning',
    DISABLED = 'disabled',
}
export interface IInputFileAvatarProps
    extends Omit<
        IInputComponentProps,
        'maxLength' | 'onChange' | 'inputLength' | 'wrapperClassName' | 'invisible' | 'inputClassName'
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
     * Allowed file extensions. @default ['jpg', 'jpeg', 'png']
     */
    acceptedFileTypes?: Array<`.${string}`>;
    /**
     * Maximum file size in bytes. ex: 2097152 bytes | 2 * 1024 ** 2 = 2MiB. 0 = no constraint. @default 0
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
     * If true, only square images are accepted. @default true
     */
    onlySquare?: boolean;
}
