import classNames from 'classnames';
import { InputContainer, type IInputComponentProps } from '../../input';
import { useInputProps } from '../../input/hooks';

export interface ITextAreaProps extends IInputComponentProps<HTMLTextAreaElement> {}

export const TextArea: React.FC<ITextAreaProps> = (props: ITextAreaProps) => {
    const { containerProps, inputProps } = useInputProps(props);

    const { className: inputClassName, ...otherInputProps } = inputProps;
    const { wrapperClassName: containerWrapperClassName, ...otherContainerProps } = containerProps;

    return (
        <InputContainer
            wrapperClassName={classNames('grow overflow-auto', containerWrapperClassName)}
            {...otherContainerProps}
        >
            <textarea type="text" className={classNames('min-h-[144px]', inputClassName)} {...otherInputProps} />
        </InputContainer>
    );
};
