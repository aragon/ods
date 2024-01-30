import classNames from 'classnames';
import type React from 'react';
import { useState } from 'react';
import { Button } from '../../button';
import { IconType } from '../../icon';
import { useInputProps, useNumberMask, type IUseNumberMaskProps } from '../hooks';
import { InputContainer, type IInputComponentProps } from '../inputContainer';

export interface IInputNumberProps extends Omit<IInputComponentProps, 'onChange' | 'value' | 'step' | 'min' | 'max'> {
    /**
     * The minimum value that the number input accepts
     */
    min?: number;
    /**
     * The maximum value that the number input accepts
     */
    max?: number;
    /**
     * Specifies the granularity of the intervals for the input value
     */
    step?: number;
    /**
     * The value of the number input.
     */
    value?: string | number;
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
    const {
        suffix,
        onChange,
        max = Number.MAX_SAFE_INTEGER,
        min = Number.MIN_SAFE_INTEGER,
        step: inputStep = 1,
        value,
        ...otherProps
    } = props;

    const step = inputStep <= 0 ? 1 : inputStep;
    const { containerProps, inputProps } = useInputProps(otherProps);

    const { className: containerClassName, isDisabled, ...otherContainerProps } = containerProps;
    const { onBlur, onFocus, onKeyDown, className: inputClassName, ...otherInputProps } = inputProps;

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

        // increment directly to the minimum if value is less than the minimum
        if (parsedValue < min) {
            setValue(min.toString());
            return;
        }

        // ensure value is multiple of step
        const newValue = (Math.floor(parsedValue / step) + 1) * step;

        // ensure the new value is than the max
        setValue(Math.min(max, newValue).toString());
    };

    const handleDecrement = () => {
        const parsedValue = Number(unmaskedValue ?? 0);

        // decrement directly to the maximum if value is greater than the maximum
        if (parsedValue > max) {
            setValue(max.toString());
            return;
        }

        // ensure value is multiple of step
        const newValue = (Math.ceil(parsedValue / step) - 1) * step;

        // ensure the new value is than the max
        setValue(Math.max(min, newValue).toString());
    };

    return (
        <InputContainer className={containerClassName} {...otherContainerProps} isDisabled={isDisabled}>
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
