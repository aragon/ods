import classNames from 'classnames';
import { Button } from '../../button';
import { type ButtonVariant } from '../../button/button.api';
import { InputContainer, type IInputComponentProps, type InputVariant } from '../inputContainer';
import { useInputProps } from '../useInputProps';
import { useNumberMask, type IUseNumberMaskProps } from '../useNumberMask';

export interface IInputNumberMaxProps extends Omit<IInputComponentProps, 'maxLength' | 'onChange'> {
    /**
     * Maximum number set on max button click.
     */
    max: number;
    /**
     * @see IUseNumberMaskProps['onChange']
     */
    onChange?: IUseNumberMaskProps['onChange'];
}

const inputVariantToButtonVariant: Record<InputVariant, ButtonVariant> = {
    critical: 'critical',
    default: 'tertiary',
    warning: 'warning',
};

export const InputNumberMax: React.FC<IInputNumberMaxProps> = (props) => {
    const { max, onChange, ...otherProps } = props;
    const { containerProps, inputProps } = useInputProps(otherProps);

    const { variant, ...otherContainerProps } = containerProps;
    const { className: inputClassName, value, min, ...otherInputProps } = inputProps;

    const { ref, setValue } = useNumberMask({ min, max, value, onChange });

    const handleMaxClick = () => setValue(max.toString());

    return (
        <InputContainer variant={variant} {...otherContainerProps}>
            <input
                className={classNames('spin-buttons:appearance-none', inputClassName)}
                ref={ref}
                max={max}
                min={min}
                inputMode="decimal"
                {...otherInputProps}
            />
            <Button
                size="sm"
                variant={inputVariantToButtonVariant[variant ?? 'default']}
                className="mr-2"
                onClick={handleMaxClick}
            >
                {/* TODO: apply internationalisation to Max label [APP-2627] */}
                Max
            </Button>
        </InputContainer>
    );
};
