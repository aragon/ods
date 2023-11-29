import classNames from 'classnames';
import { useId, type InputHTMLAttributes } from 'react';
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
        infoText,
        alertMessage,
        isDisabled,
        inputClassName,
        id,
        className,
        ...inputElementProps
    } = props;

    const randomId = useId();
    const processedId = id ?? randomId;

    const containerProps = {
        label,
        variant,
        helpText,
        isOptional,
        infoText,
        alertMessage,
        isDisabled,
        id: processedId,
        className,
    };

    const inputClasses = classNames(
        'h-full w-full rounded-xl px-4 py-3 caret-neutral-500 outline-none', // Default
        'placeholder:text-base placeholder:font-normal placeholder:leading-tight placeholder:text-neutral-300', // Placeholder
        { 'cursor-not-allowed': isDisabled }, // Disabled
        inputClassName, // Prop
    );

    const inputProps = {
        id: processedId,
        disabled: isDisabled,
        className: inputClasses,
        ...inputElementProps,
    };

    return { containerProps, inputProps };
};
