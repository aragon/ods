import type { ComponentProps } from 'react';
import type { ToggleValue } from '../toggle';

export type ToggleActiveValue<TValue extends ToggleValue = ToggleValue> = TValue | TValue[] | undefined;

export interface IToggleGroupProps<TValue extends ToggleActiveValue = ToggleActiveValue>
    extends Omit<ComponentProps<'div'>, 'onChange'> {
    /**
     * Allows multiple toggles to be selected at the same time when set to true.
     */
    isMultiSelect?: boolean;
    /**
     * Current value of the toggle selection.
     */
    value: TValue;
    /**
     * Callback called on toggle selection change.
     */
    onChange: (value: TValue) => void;
}
