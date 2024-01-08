import { ToggleContextProvider } from '../toggleContext';
import type { IToggleGroupProps, ToggleActiveValue } from './toggleGroup.api';

export const ToggleGroup = <TValue extends ToggleActiveValue>(props: IToggleGroupProps<TValue>) => {
    const { value, onChange, isMultiSelect, ...otherProps } = props;

    return (
        <ToggleContextProvider value={{ isMultiSelect, value, onChange: onChange as () => void }}>
            <div {...otherProps} />
        </ToggleContextProvider>
    );
};
