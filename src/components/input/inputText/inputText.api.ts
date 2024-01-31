import type { IInputComponentProps } from '../inputContainer';

export interface IInputTextProps extends IInputComponentProps {
    /**
     * Text to be rendered beside the input field.
     */
    addon?: string;

    /**
     * Position of the addon element in relation to the input field.
     * @default 'left'
     */
    addonPosition?: 'left' | 'right';
}
