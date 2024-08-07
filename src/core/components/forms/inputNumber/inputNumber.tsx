import classNames from 'classnames';
import type React from 'react';
import { forwardRef } from 'react';
import { mergeRefs } from '../../../utils';
import { Button } from '../../button';
import { IconType } from '../../icon';
import { useInputProps, useNumberMask, type IUseNumberMaskProps } from '../hooks';
import { InputContainer, type IInputComponentProps } from '../inputContainer';

export interface IInputNumberProps
    extends Omit<IInputComponentProps, 'onChange' | 'step' | 'min' | 'max' | 'maxLength'> {
    /**
     * The minimum value that the number input accepts.
     * @default Number.MIN_SAFE_INTEGER
     */
    min?: number;
    /**
     * The maximum value that the number input accepts.
     * @default Number.MAX_SAFE_INTEGER
     */
    max?: number;
    /**
     * Optional string prepended to the input value.
     */
    prefix?: string;
    /**
     * Specifies the granularity of the intervals for the input value.
     * @default 1
     */
    step?: number;
    /**
     * Optional string appended to the input value.
     */
    suffix?: string;
    /**
     * @see IUseNumberMaskProps['onChange']
     */
    onChange?: IUseNumberMaskProps['onChange'];
}

export const InputNumber = forwardRef<HTMLInputElement, IInputNumberProps>((props, ref) => {
    const {
        max = Number.MAX_SAFE_INTEGER,
        min = Number.MIN_SAFE_INTEGER,
        step = 1,
        prefix,
        suffix,
        onChange,
        ...otherProps
    } = props;

    const processedStep = step <= 0 ? 1 : step;
    const { containerProps, inputProps } = useInputProps(otherProps);

    const { className: containerClassName, disabled, ...otherContainerProps } = containerProps;
    const { onKeyDown, className: inputClassName, value, ...otherInputProps } = inputProps;

    const {
        ref: maskRef,
        unmaskedValue,
        setUnmaskedValue,
    } = useNumberMask({
        min,
        max,
        value,
        onChange,
        suffix,
        prefix,
    });

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'ArrowUp') {
            handleIncrement();
        } else if (e.key === 'ArrowDown') {
            handleDecrement();
        }

        onKeyDown?.(e);
    };

    const handleIncrement = () => {
        const parsedValue = Number(unmaskedValue ?? 0);

        // increment directly to the minimum if value is less than the minimum
        if (parsedValue < min) {
            setUnmaskedValue(min.toString());
            return;
        }

        // ensure value is multiple of step
        const newValue = (Math.floor(parsedValue / step) + 1) * step;

        // ensure the new value is than the max
        setUnmaskedValue(Math.min(max, newValue).toString());
    };

    const handleDecrement = () => {
        const parsedValue = Number(unmaskedValue ?? 0);

        // decrement directly to the maximum if value is greater than the maximum
        if (parsedValue > max) {
            setUnmaskedValue(max.toString());
            return;
        }

        // ensure value is multiple of step
        const newValue = (Math.ceil(parsedValue / step) - 1) * step;

        // ensure the new value is than the max
        setUnmaskedValue(Math.max(min, newValue).toString());
    };

    return (
        <InputContainer className={containerClassName} disabled={disabled} {...otherContainerProps}>
            {!disabled && (
                <Button
                    size="sm"
                    variant="tertiary"
                    onClick={handleDecrement}
                    iconLeft={IconType.MINUS}
                    className="ml-2 shrink-0"
                />
            )}
            <input
                ref={mergeRefs([maskRef, ref])}
                step={processedStep}
                max={max}
                min={min}
                inputMode="numeric"
                onKeyDown={handleKeyDown}
                className={classNames('text-center spin-buttons:appearance-none', inputClassName)}
                {...otherInputProps}
            />
            {!disabled && (
                <Button
                    size="sm"
                    variant="tertiary"
                    iconLeft={IconType.PLUS}
                    onClick={handleIncrement}
                    className="mr-2 shrink-0"
                />
            )}
        </InputContainer>
    );
});

InputNumber.displayName = 'InputNumber';
