import { InputContainer, inputContainerUtils, type IInputContainerInputProps } from '../inputContainer';

export interface IInputTextProps extends Omit<IInputContainerInputProps, 'type'> {}

export const InputText: React.FC<IInputTextProps> = (props) => {
    const { containerProps, inputProps } = inputContainerUtils.extractContainerProps(props);
    const { isDisabled, inputClassName } = props;

    const inputClasses = inputContainerUtils.buildInputClasses({ isDisabled, inputClassName });

    return (
        <InputContainer {...containerProps}>
            <input type="text" className={inputClasses} disabled={isDisabled} {...inputProps} />
        </InputContainer>
    );
};
