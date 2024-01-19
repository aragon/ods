import { useEffect, type ComponentProps } from 'react';
import { useIMask } from 'react-imask';

export interface IUseNumberMaskProps extends Pick<ComponentProps<'input'>, 'min' | 'max' | 'value'> {
    /**
     * Callback called on value change.
     */
    onChange?: (value: string) => void;
}

export interface IUseNumberMaskResult extends ReturnType<typeof useIMask<HTMLInputElement>> {}

export const useNumberMask = (props: IUseNumberMaskProps): IUseNumberMaskResult => {
    const { min, max, onChange, value } = props;

    const result = useIMask<HTMLInputElement>(
        {
            mask: Number,
            radix: '.',
            thousandsSeparator: ' ',
            max: Number(max),
            scale: 100,
            min: Number(min),
        },
        { onAccept: (_value, mask) => onChange?.(mask.unmaskedValue) },
    );

    const { setValue } = result;

    // Update the masked value on value property change
    useEffect(() => {
        const parsedValue = value?.toString() ?? '';
        setValue(parsedValue);
    }, [setValue, value]);

    return result;
};
