import { useInputProps } from '../hooks';
import { InputContainer, type IInputComponentProps } from '../inputContainer';

export interface IInputTextProps extends IInputComponentProps {}

export const InputText: React.FC<IInputTextProps> = (props) => {
    const { containerProps, inputProps } = useInputProps(props);

    return (
        <InputContainer {...containerProps}>
            <input type="text" {...inputProps} />
        </InputContainer>
    );
};
