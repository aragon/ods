import { useEffect, type ComponentProps } from 'react';
import { useIMask } from 'react-imask';
import { NumberFormat, formatterUtils } from '../../utils';

export interface IUseNumberMaskProps extends Pick<ComponentProps<'input'>, 'min' | 'max' | 'value'> {
    /**
     * Callback called on value change. Override the default onChange callback to only emit the updated value because
     * the library in use formats the user input and emit the valid number when valid.
     */
    onChange?: (value: string) => void;
}

export interface IUseNumberMaskResult extends ReturnType<typeof useIMask<HTMLInputElement>> {}

const getNumberSeparators = () => {
    const match = formatterUtils
        .formatNumber(100_000.1, { format: NumberFormat.TOKEN_AMOUNT_LONG })
        ?.match(/([^0-9])/g);

    const thousandsSeparator = match?.shift();
    const radix = match?.pop();

    return { thousandsSeparator, radix };
};

// The imask.js library requires us to set a "scale" property as max decimal places otherwise it defaults to 0.
const maxDecimalPlaces = 30;

export const useNumberMask = (props: IUseNumberMaskProps): IUseNumberMaskResult => {
    const { min, max, onChange, value } = props;

    const { thousandsSeparator, radix } = getNumberSeparators();

    const result = useIMask<HTMLInputElement>(
        {
            mask: Number,
            radix,
            thousandsSeparator,
            scale: maxDecimalPlaces,
            max: max ? Number(max) : undefined,
            min: min ? Number(min) : undefined,
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
