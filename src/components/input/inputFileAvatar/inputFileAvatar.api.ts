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
    onFileSelect?: (file: File) => void;
}
