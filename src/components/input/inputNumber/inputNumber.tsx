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
     * Disables the increment spin button
     */
    disableIncrement?: boolean;
    /**
     * Disables the decrement spin button
     */
    disableDecrement?: boolean;
    /**
     * @see IUseNumberMaskProps['onChange']
     */
    onChange?: IUseNumberMaskProps['onChange'];
}

export const InputNumber: React.FC<IInputNumberProps> = (props) => {
    const { suffix, onChange, disableDecrement, disableIncrement, ...otherProps } = props;
    const { containerProps, inputProps } = useInputProps(otherProps);

    const { className: containerClassName, isDisabled, ...otherContainerProps } = containerProps;
    const {
        max,
        min,
        value,
        step: inputStep,
        onBlur,
        onFocus,
        onKeyDown,
        className: inputClassName,
        ...otherInputProps
    } = inputProps;

    const [isFocused, setIsFocused] = useState(false);
    const {
        ref: numberMaskRef,
        value: maskedValue,
        unmaskedValue,
        setValue,
    } = useNumberMask({
        min: min ?? Number.MIN_SAFE_INTEGER,
        max: max ?? Number.MAX_SAFE_INTEGER,
        value,
        onChange,
    });

    // ignore all values less zero one and use the default step value of one
    let step = Number(inputStep ?? 1);
    if (isNaN(step) || step <= 0) {
        step = 1;
    }

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
        const { parsedMax, parsedMin, parsedValue } = parseInputs(unmaskedValue, min, max);

        // return the input value if it's bigger than the max
        if (parsedValue > parsedMax) {
            setValue(parsedValue.toString());
            return;
        }

        // increment directly to the minimum if value is less than the minimum
        if (parsedValue < parsedMin) {
            setValue(parsedMin.toString());
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
        newValue = Math.max(parsedMin, Math.min(parsedMax, newValue));
        setValue(newValue.toString());
    };

    const handleDecrement = () => {
        const { parsedMax, parsedMin, parsedValue } = parseInputs(unmaskedValue, min, max);

        // if the current value is less than the min, don't decrement
        if (parsedValue < parsedMin) {
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
        newValue = Math.max(parsedMin, Math.min(parsedMax, newValue));
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
                    state={disableDecrement ? 'disabled' : undefined}
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
                    state={disableIncrement ? 'disabled' : undefined}
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
 * Parses the input values and returns an object with the parsed values as numbers.
 *
 * @param value - The value of the number input. Defaults to '0'.
 * @param min - The minimum value of the number input. Defaults to Number.MIN_SAFE_INTEGER.
 * @param max - The maximum value of the number input. Defaults to Number.MAX_SAFE_INTEGER.
 * @returns  An object with the parsed values.
 */
function parseInputs(
    value: string | number = '0',
    min: string | number = Number.MIN_SAFE_INTEGER,
    max: string | number = Number.MAX_SAFE_INTEGER,
) {
    const parsedMax = Number(max);
    const parsedMin = Number(min);
    const parsedValue = Number(value);

    return { parsedValue, parsedMin, parsedMax };
}
