import type { IInputComponentProps } from '../inputContainer';

/**
 * @typedef {object} IInputTextProps
 * @property {string} [addonPos] -  Leave undefined if no addon is to be rendered.
 * @property {string} [addon] - Leave undefined if no addon is to be rendered.
 */
interface NoAddonProps extends IInputComponentProps {
    addon?: never;
    addonPos?: never;
}

/**
 * @typedef {object} IInputTextProps
 * @property {string} [addon] - Text to be rendered inside the addon. If empty or undefined, no addon will be rendered.
 * @property {string} [addonPos] - Position of the addon. Must be selected if addon is anything but undefined.
 */
interface WithAddonProps extends IInputComponentProps {
    addon: string;
    addonPos: 'left' | 'right';
}

export type IInputTextProps = NoAddonProps | WithAddonProps;
