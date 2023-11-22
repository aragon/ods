import classNames from 'classnames';
import type { InputHTMLAttributes } from 'react';
import type { IInputContainerInputProps, IInputContainerProps } from './inputContainer.api';

export interface IBuildInputClassesParams {
    /**
     * Additional classes for the input element.
     */
    inputClassName?: string;
    /**
     * Renders the input as disabled when set to true.
     */
    isDisabled?: boolean;
}

export interface IExtractContainerPropsResult {
    /**
     * Properties for the InputContainer component.
     */
    containerProps: IInputContainerProps;
    /**
     * Properties for the input element.
     */
    inputProps: InputHTMLAttributes<HTMLInputElement>;
}

class InputContainerUtils {
    /**
     * Processes the property object to return the container and input properties in two separate objects.
     * @param props The component properties
     * @returns A new object with the container and input properties split in two objects.
     */
    extractContainerProps = (props: IInputContainerInputProps): IExtractContainerPropsResult => {
        const {
            label,
            variant,
            helpText,
            isOptional,
            infoText,
            alertMessage,
            isDisabled,
            inputClassName,
            ...inputProps
        } = props;
        const containerProps = { label, variant, helpText, isOptional, infoText, alertMessage, isDisabled };

        return { containerProps, inputProps };
    };

    /**
     * Generates the class names for the input elements inside the InputContainer component
     * @param params Params to customise the input element
     * @returns The input class names
     */
    buildInputClasses = ({ inputClassName, isDisabled }: IBuildInputClassesParams): string => {
        const inputClasses = classNames(
            'h-full w-full rounded-xl px-4 py-3 caret-neutral-500 outline-none', // Default
            'placeholder:text-base placeholder:font-normal placeholder:leading-tight placeholder:text-neutral-300', // Placeholder
            { 'cursor-not-allowed': isDisabled }, // Disabled
            inputClassName, // Prop
        );

        return inputClasses;
    };
}

export const inputContainerUtils = new InputContainerUtils();
