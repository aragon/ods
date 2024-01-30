import type { IInputComponentProps } from '../inputContainer';

export interface IInputTextProps extends IInputComponentProps {
    /**
     * @property {string} [addon] - Text to be rendered inside the addon. If empty or undefined, no addon will be rendered.
     */
    addon?: string;

    /**
     * @property {string} [addonPos] - Position of the addon. Must be selected if addon is anything but undefined.
     * @default 'left'
     */
    addonPosition?: 'left' | 'right';
}
