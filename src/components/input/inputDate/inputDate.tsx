import { InputContainer, type IInputComponentProps } from '../inputContainer';
import { useInputProps } from '../useInputProps';

export interface IInputDateProps extends IInputComponentProps {}

export const InputDate: React.FC<IInputDateProps> = (props) => {
    const { containerProps, inputProps } = useInputProps(props);

    return (
        <InputContainer {...containerProps}>
            <input type="date" {...inputProps} />
        </InputContainer>
    );
};
