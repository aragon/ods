import { InputContainer, type IInputContainerProps } from '../inputContainer';

export interface IInputTextProps extends IInputContainerProps {}

export const InputText: React.FC<IInputTextProps> = (props) => {
    return (
        <InputContainer {...props}>
            <input />
        </InputContainer>
    );
};
