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
        step,
        value,
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
        const { parsedMax, parsedMin, parsedStep, parsedValue } = parseInputs(unmaskedValue, step, min, max);

        // return the input value if it's bigger than the max
        if (parsedValue > parsedMax) {
            // Note: dispatching event instead of setting value via imask 'setValue'
            // function to avoid noticeable rerender
            dispatchChangeEvent(numberMaskRef.current, parsedValue);
        }

        // increment value with step
        let newValue = parsedValue + parsedStep;

        // round down to the nearest multiple of the step when the value
        // is not already a multiple of the step
        if (parsedValue % parsedStep !== 0) {
            newValue = Math.floor(parsedValue / parsedStep) * parsedStep;
        }

        // ensure the new value is within the min and max range
        newValue = Math.max(parsedMin, Math.min(parsedMax, newValue));
        dispatchChangeEvent(numberMaskRef.current, newValue);
    };

    const handleDecrement = () => {
        const { parsedMax, parsedMin, parsedStep, parsedValue } = parseInputs(unmaskedValue, step, min, max);

        // if the current value is less than the min, don't decrement
        if (parsedValue < parsedMin) {
            dispatchChangeEvent(numberMaskRef.current, parsedValue);
        }

        // decrement value by the step
        let newValue = parsedValue - parsedStep;

        // if the value is not a multiple of the step,
        // decrement to the biggest multiple of the step that is less than the value
        if (parsedValue % parsedStep !== 0) {
            newValue = Math.floor(parsedValue / parsedStep) * parsedStep;
        }

        // ensure the new value is within the min and max range
        newValue = Math.max(parsedMin, Math.min(parsedMax, newValue));
        dispatchChangeEvent(numberMaskRef.current, newValue);
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
                value={isFocused ? maskedValue : suffixedValue}
                onBlur={handleBlur}
                onFocus={handleFocus}
                disabled={isDisabled}
                inputMode="numeric"
                onKeyDown={handleKeyDown}
                className={classNames('text-center spin-buttons:appearance-none', inputClassName, 'rounded-[0px]')}
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
 * Triggers an 'input' event on the given HTMLInputElement with a new value.
 *
 * @param inputElement - The input element to dispatch the event on.
 * @param value - The new value for the input element.
 */
function dispatchChangeEvent(inputElement: HTMLInputElement | null, value: number) {
    if (inputElement) {
        Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set?.call(inputElement, value);
        inputElement.dispatchEvent(new Event('input', { bubbles: true }));
    }
}

/**
 * Parses the input values and returns an object with the parsed values as numbers.
 *
 * @param value - The value of the number input. Defaults to '0'.
 * @param step - The step value of the number input. Defaults to 1.
 * @param min - The minimum value of the number input. Defaults to Number.MIN_SAFE_INTEGER.
 * @param max - The maximum value of the number input. Defaults to Number.MAX_SAFE_INTEGER.
 * @returns  An object with the parsed values.
 */
function parseInputs(
    value: string | number = '0',
    step: string | number = 1,
    min: string | number = Number.MIN_SAFE_INTEGER,
    max: string | number = Number.MAX_SAFE_INTEGER,
) {
    let parsedStep = Number(step) || 1;
    const parsedMax = Number(max);
    const parsedMin = Number(min);
    const parsedValue = Number(value);

    // ignore all values less than one and use the default step value of one
    parsedStep = parsedStep <= 0 ? 1 : parsedStep;

    return { parsedValue, parsedStep, parsedMin, parsedMax };
}
