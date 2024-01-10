import classNames from 'classnames';
import { useMemo } from 'react';
import { ToggleContextProvider } from '../toggleContext';
import type { IToggleGroupProps, ToggleActiveValue } from './toggleGroup.api';

export const ToggleGroup = <TValue extends ToggleActiveValue>(props: IToggleGroupProps<TValue>) => {
    const { value, onChange, isMultiSelect, className, ...otherProps } = props;

    const contextValues = useMemo(
        () => ({ isMultiSelect, value, onChange: onChange as (value: ToggleActiveValue) => void }),
        [isMultiSelect, value, onChange],
    );

    return (
        <ToggleContextProvider value={contextValues}>
            <div className={classNames('flex flex-row flex-wrap gap-2 md:gap-3', className)} {...otherProps} />
        </ToggleContextProvider>
    );
};
