import classNames from 'classnames';
import type React from 'react';
import { useState } from 'react';
import { Button } from '../../button';
import { IconType } from '../../icon';
import { useInputProps, useNumberMask, type IUseNumberMaskProps } from '../hooks';
import { InputContainer, type IInputComponentProps } from '../inputContainer';

export interface IInputNumberProps extends Omit<IInputComponentProps, 'onChange'> {
    /**
     * Optional string appended to the input value.
     */
    suffix?: string;
    /**
     * @see IUseNumberMaskProps['onChange']
     */
    onChange?: IUseNumberMaskProps['onChange'];
}

export const InputNumber: React.FC<IInputNumberProps> = (props) => {
    const { suffix, onChange, ...otherProps } = props;
    const { containerProps, inputProps } = useInputProps(otherProps);

    const { className: containerClassName, isDisabled, ...otherContainerProps } = containerProps;
    const {
        max: inputMax,
        min: inputMin,
        step: inputStep,
        value: inputValue,
        onBlur,
        onFocus,
        onKeyDown,
        className: inputClassName,
        ...otherInputProps
    } = inputProps;

    const { step, min, max, value } = parseInputs(inputValue, inputStep, inputMin, inputMax);

    const [isFocused, setIsFocused] = useState(false);
    const {
        ref: numberMaskRef,
        value: maskedValue,
        unmaskedValue,
        setValue,
    } = useNumberMask({
        min,
        max,
        value,
        onChange,
    });

    const suffixedValue = maskedValue && suffix ? maskedValue + suffix : maskedValue;

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'ArrowUp') {
            handleIncrement();
        } else if (e.key === 'ArrowDown') {
            handleDecrement();
        }

        onKeyDown?.(e);
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(true);
        onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(false);
        onBlur?.(e);
    };

    const handleIncrement = () => {
        const parsedValue = Number(unmaskedValue ?? 0);

        // return the input value if it's bigger than the max
        if (parsedValue > max) {
            setValue(parsedValue.toString());
            return;
        }

        // increment directly to the minimum if value is less than the minimum
        if (parsedValue < min) {
            setValue(min.toString());
            return;
        }

        // round down to the nearest multiple of the step when the value
        // is not already a multiple of the step
        let newValue = parsedValue + step;
        if (parsedValue % step !== 0) {
            newValue = Math.floor(parsedValue / step) * step;
        }

        // increment value with step if it's smaller than the initial value
        if (newValue < parsedValue) {
            newValue += step;
        }

        // ensure the new value is within the min and max range
        newValue = Math.max(min, Math.min(max, newValue));
        setValue(newValue.toString());
    };

    const handleDecrement = () => {
        const parsedValue = Number(unmaskedValue ?? 0);

        // if the current value is less than the min, don't decrement
        if (parsedValue < min) {
            setValue(parsedValue.toString());
        }

        // decrement value by the step
        let newValue = parsedValue - step;

        // if the value is not a multiple of the step,
        // decrement to the biggest multiple of the step that is less than the value
        if (parsedValue % step !== 0) {
            newValue = Math.floor(parsedValue / step) * step;
        }

        // ensure the new value is within the min and max range
        newValue = Math.max(min, Math.min(max, newValue));
        setValue(newValue.toString());
    };

    return (
        <InputContainer
            className={classNames('relative', containerClassName)}
            {...otherContainerProps}
            isDisabled={isDisabled}
        >
            {!isDisabled && (
                <Button
                    size="sm"
                    variant="tertiary"
                    onClick={handleDecrement}
                    iconLeft={IconType.REMOVE}
                    className="ml-2 shrink-0"
                />
            )}
            <input
                ref={numberMaskRef}
                min={min}
                max={max}
                step={step}
                value={isFocused ? maskedValue : suffixedValue}
                onBlur={handleBlur}
                onFocus={handleFocus}
                disabled={isDisabled}
                inputMode="numeric"
                onKeyDown={handleKeyDown}
                className={classNames('text-center spin-buttons:appearance-none', inputClassName)}
                {...otherInputProps}
            />
            {!isDisabled && (
                <Button
                    size="sm"
                    variant="tertiary"
                    iconLeft={IconType.ADD}
                    onClick={handleIncrement}
                    className="mr-2 shrink-0"
                />
            )}
        </InputContainer>
    );
};

/**
 * Parses the input values and returns an object with the parsed values.
 *
 * @param value - The value of the number input. Defaults to '0'.
 * @param min - The minimum value of the number input. Defaults to Number.MIN_SAFE_INTEGER.
 * @param max - The maximum value of the number input. Defaults to Number.MAX_SAFE_INTEGER.
 * @returns  An object with the parsed values.
 */
function parseInputs(
    value: IInputNumberProps['value'] = '',
    step: IInputNumberProps['step'] = 1,
    min: IInputNumberProps['min'] = Number.MIN_SAFE_INTEGER,
    max: IInputNumberProps['max'] = Number.MAX_SAFE_INTEGER,
) {
    let parsedMax = Number(max);
    if (isNaN(parsedMax)) {
        parsedMax = Number.MAX_SAFE_INTEGER;
    }

    let parsedMin = Number(min);
    if (isNaN(parsedMin)) {
        parsedMin = Number.MIN_SAFE_INTEGER;
    }

    // ignore all values less zero one and use the default step value of one
    let parsedStep = Number(step);
    if (isNaN(parsedStep) || parsedStep <= 0) {
        parsedStep = 1;
    }

    let parsedValue: IInputNumberProps['value'] = Number(value);
    parsedValue = isNaN(parsedValue) ? '' : value;

    return { step: parsedStep, min: parsedMin, max: parsedMax, value: parsedValue };
}
