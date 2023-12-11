import { useState, type ChangeEvent } from 'react';
import { InputContainer, type IInputComponentProps } from '../inputContainer';
import { useInputProps } from '../useInputProps';

export interface IInputTextProps extends IInputComponentProps {}

export const InputText: React.FC<IInputTextProps> = (props) => {
    const { containerProps, inputProps } = useInputProps(props);
    const { value, onChange, ...otherInputProps } = inputProps;

    const [inputLength, setInputLength] = useState(0);

    const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputLength(event.target.value.length);
        onChange?.(event);
    };

    return (
        <InputContainer inputLength={inputLength} {...containerProps}>
            <input type="text" value={value} onChange={handleOnChange} {...otherInputProps} />
        </InputContainer>
    );
};
