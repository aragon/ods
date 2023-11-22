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
    /**
     * Class names for the input element.
     */
    inputClasses: string;
}

/**
 * Processes the InputComponent properties object to split it into container-specific and input-element-specific
 * properties. It also returns the class names to properly style the input element inside the InputContainer component.
 * @param props The InputComponent properties
 * @returns The InputContainer properties and the class names and properterties for the input element.
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
    };

    const inputProps = { id: processedId, ...inputElementProps };

    const inputClasses = classNames(
        'h-full w-full rounded-xl px-4 py-3 caret-neutral-500 outline-none', // Default
        'placeholder:text-base placeholder:font-normal placeholder:leading-tight placeholder:text-neutral-300', // Placeholder
        { 'cursor-not-allowed': isDisabled }, // Disabled
        inputClassName, // Prop
    );

    return { containerProps, inputProps, inputClasses };
};
