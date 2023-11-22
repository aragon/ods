import classNames from 'classnames';
import { type InputHTMLAttributes } from 'react';
import { InputContainer, type IInputContainerProps } from '../inputContainer';

export interface IInputTextProps extends Omit<IInputContainerProps, 'children'>, InputHTMLAttributes<HTMLInputElement> {
    /**
     * Classes for the input element.
     */
    inputClassName?: string;
}

export const InputText: React.FC<IInputTextProps> = (props) => {
    const { label, variant, helpText, isOptional, infoText, alertMessage, inputClassName, ...inputProps } = props;
    const containerProps = { label, variant, helpText, isOptional, infoText, alertMessage };

    const inputClasses = classNames(
        'h-full w-full rounded-xl px-4 py-3 outline-none', // Default
        'placeholder:text-base placeholder:font-normal placeholder:leading-tight placeholder:text-neutral-300', // Placeholder
        inputClassName, // Prop
    );

    return (
        <InputContainer {...containerProps}>
            <input className={inputClasses} {...inputProps} />
        </InputContainer>
    );
};
