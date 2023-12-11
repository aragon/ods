import { useRef } from 'react';
import { InputContainer, type IInputComponentProps } from '../inputContainer';
import { useInputProps } from '../useInputProps';

export interface IInputTextProps extends IInputComponentProps {}

export const InputText: React.FC<IInputTextProps> = (props) => {
    const { containerProps, inputProps } = useInputProps(props);
    const { value, ...otherInputProps } = inputProps;

    const inputRef = useRef<HTMLInputElement>(null);
    const inputLength = value?.toString().length ?? inputRef.current?.value.length;

    console.log({
        inputLength,
        valueLength: inputProps.value?.toString().length,
        refLength: inputRef.current?.value.length,
    });

    return (
        <InputContainer inputLength={inputLength} {...containerProps}>
            <input type="text" ref={inputRef} value={value} {...otherInputProps} />
        </InputContainer>
    );
};
