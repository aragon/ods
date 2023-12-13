import classNames from 'classnames';
import { useEffect, useId, useState, type ChangeEvent, type InputHTMLAttributes } from 'react';
import type { IInputComponentProps, IInputContainerProps } from './inputContainer';

export interface IUseInputPropsResult {
    /**
     * Properties for the InputContainer component.
     */
    containerProps: IInputContainerProps;
    /**
     * Properties for the input element.
     */
    inputProps: InputHTMLAttributes<HTMLInputElement>;
}

/**
 * Processes the InputComponent properties object to split it into container-specific and input-element-specific properties.
 * @param props The InputComponent properties
 * @returns The InputContainer and input element properties.
 */
export const useInputProps = (props: IInputComponentProps): IUseInputPropsResult => {
    const {
        label,
        variant,
        helpText,
        isOptional,
        alert,
        isDisabled,
        inputClassName,
        id,
        className,
        maxLength,
        onChange,
        value,
        ...inputElementProps
    } = props;

    // Set a random generated id to the input field when id property is not defined to properly link the
    // input with the label
    const randomId = useId();
    const processedId = id ?? randomId;

    const [inputLength, setInputLength] = useState(0);

    const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputLength(event.target.value.length);
        onChange?.(event);
    };

    const containerProps = {
        label,
        variant,
        helpText,
        isOptional,
        alert,
        isDisabled,
        id: processedId,
        maxLength,
        className,
        inputLength,
    };

    const inputClasses = classNames(
        'h-full w-full rounded-xl px-4 py-3 caret-neutral-500 outline-none', // Default
        'placeholder:text-base placeholder:font-normal placeholder:leading-tight placeholder:text-neutral-300', // Placeholder
        inputClassName, // Prop
    );

    const inputProps = {
        id: processedId,
        disabled: isDisabled,
        className: inputClasses,
        onChange: handleOnChange,
        maxLength,
        value,
        ...inputElementProps,
    };

    // Update input length on value change for controlled inputs
    useEffect(() => {
        setInputLength(value?.toString().length ?? 0);
    }, [value]);

    return { containerProps, inputProps };
};
