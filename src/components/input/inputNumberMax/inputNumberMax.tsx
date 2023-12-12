import classNames from 'classnames';
import { useRef } from 'react';
import { Button } from '../../button';
import { type ButtonVariant } from '../../button/button.api';
import { InputContainer, type IInputComponentProps, type InputVariant } from '../inputContainer';
import { useInputProps } from '../useInputProps';

export interface IInputNumberMaxProps extends Omit<IInputComponentProps, 'maxLength'> {
    /**
     * Maximum number set on max button click.
     */
    max: number;
}

const inputVariantToButtonVariant: Record<InputVariant, ButtonVariant> = {
    critical: 'critical',
    default: 'tertiary',
    warning: 'warning',
};

// Needed to trigger a native onChange event on clear input click (see https://stackoverflow.com/a/46012210)
const nativeValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;

export const InputNumberMax: React.FC<IInputNumberMaxProps> = (props) => {
    const { max, ...otherProps } = props;
    const { containerProps, inputProps } = useInputProps(otherProps);

    const { className: inputClassName, ...otherInputProps } = inputProps;

    const inputRef = useRef<HTMLInputElement>(null);

    const handleMaxClick = () => {
        if (inputRef.current == null) {
            return;
        }

        nativeValueSetter?.call(inputRef.current, max);
        const event = new Event('input', { bubbles: true });
        inputRef.current.dispatchEvent(event);
    };

    return (
        <InputContainer {...containerProps}>
            <input
                type="number"
                className={classNames('spin-buttons:appearance-none', inputClassName)}
                ref={inputRef}
                max={max}
                {...otherInputProps}
            />
            <Button
                size="sm"
                variant={inputVariantToButtonVariant[containerProps.variant ?? 'default']}
                className="mr-2"
                onClick={handleMaxClick}
            >
                {/* TODO: apply internationalisation to Max label [APP-2627] */}
                Max
            </Button>
        </InputContainer>
    );
};
