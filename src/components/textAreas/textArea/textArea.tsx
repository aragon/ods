import classNames from 'classnames';
import { InputContainer, type IInputComponentProps } from '../../input';
import { useInputProps } from '../../input/hooks';

export interface ITextAreaProps extends IInputComponentProps<HTMLTextAreaElement> {}

export const TextArea: React.FC<ITextAreaProps> = (props: ITextAreaProps) => {
    const { containerProps, inputProps } = useInputProps(props);
    const { className: inputClassName, ...otherInputProps } = inputProps;

    return (
        <InputContainer wrapperClassName="grow" {...containerProps}>
            <textarea type="text" className={classNames('min-h-[144px]', inputClassName)} {...otherInputProps} />
        </InputContainer>
    );
};
