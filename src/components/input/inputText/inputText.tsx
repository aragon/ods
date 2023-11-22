import { InputContainer, type IInputComponentProps } from '../inputContainer';
import { useInputProps } from '../useInputProps';

export interface IInputTextProps extends Omit<IInputComponentProps, 'type'> {}

export const InputText: React.FC<IInputTextProps> = (props) => {
    const { containerProps, inputProps, inputClasses } = useInputProps(props);
    const { isDisabled } = props;

    return (
        <InputContainer {...containerProps}>
            <input type="text" className={inputClasses} disabled={isDisabled} {...inputProps} />
        </InputContainer>
    );
};
