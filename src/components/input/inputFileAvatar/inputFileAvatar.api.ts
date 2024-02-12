import type { IInputComponentProps } from '../inputContainer';

export const SelectState = {
    IDLE: 'idle',
    SELECTING: 'selecting',
    SUCCESS: 'success',
    ERROR: 'error',
} as const;

export type SelectState = (typeof SelectState)[keyof typeof SelectState];

export interface IInputFileAvatarProps
    extends Omit<
        IInputComponentProps,
        | 'maxLength'
        | 'onChange'
        | 'variant'
        | 'inputLength'
        | 'wrapperClassName'
        | 'invisible'
        | 'alert'
        | 'inputClassName'
    > {
    /**
     * Function that is called when a file is selected. Passes the file to the parent component.
     * If the file is rejected, the function is not called.
     * If the file is accepted, the function is called with the file as an argument.
     */
    onFileSelect?: (file: File) => void;
    /**
     * Allowed file extensions. Default ['jpg', 'jpeg', 'png']
     */
    acceptedFileTypes?: Array<`.${string}`>;
    /**
     * Maximum file size in MiB. The default 0 is unconstrained.
     */
    maxFileSize?: number;
    /**
     * Minimum dimension of the image in pixels. The default 0 is unconstrained.
     */
    minDimension?: number;
    /**
     * Maximum dimension of the image in pixels. The default 0 is unconstrained.
     */
    maxDimension?: number;
    /**
     * If true, only square images are accepted. Default is true.
     */
    onlySquare?: boolean;
}
