import { createContext, useContext } from 'react';
import { type IToggleGroupProps } from '../toggleGroup/toggleGroup.api';

export type IToggleContext = Pick<IToggleGroupProps, 'isMultiSelect' | 'value' | 'onChange'>;

export const toggleContext = createContext<IToggleContext | null>(null);

export const ToggleContextProvider = toggleContext.Provider;

export const useToggleContext = (): IToggleContext => {
    const values = useContext(toggleContext);

    if (values == null) {
        throw new Error('useToggleContext: hook must be used inside a ToggleContextProvider to work properly');
    }

    return values;
};
