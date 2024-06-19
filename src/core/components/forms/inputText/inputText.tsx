import classNames from 'classnames';
import { forwardRef } from 'react';
import { useInputProps } from '../hooks';
import { InputContainer, type InputVariant } from '../inputContainer';
import type { IInputTextProps } from './inputText.api';

const variantToAddonClassNames: Record<InputVariant | 'disabled', string> = {
    default: 'bg-neutral-50 border-neutral-100 text-neutral-500',
    warning: 'bg-warning-100 border-warning-600 text-warning-600',
    critical: 'bg-critical-100 border-critical-600 text-critical-600',
    disabled: 'bg-neutral-50 border-neutral-200 text-neutral-500',
};

export const InputText = forwardRef<HTMLInputElement, IInputTextProps>((props, ref) => {
    const { addonPosition = 'left', addon, ...otherProps } = props;
    const { containerProps, inputProps } = useInputProps(otherProps);

    const {
        wrapperClassName: containerWrapperClassName,
        variant = 'default',
        disabled,
        ...otherContainerProps
    } = containerProps;

    const showAddon = addon && addon.trim() !== '';

    const addonClasses = classNames(
        'flex h-full shrink-0 items-center justify-center px-3 text-base font-normal leading-tight',
        variantToAddonClassNames[disabled ? 'disabled' : variant],
        { 'border-r-[1px]': addonPosition === 'left' },
        { 'order-last border-l-[1px]': addonPosition === 'right' },
    );

    return (
        <InputContainer
            wrapperClassName={classNames('overflow-hidden', containerWrapperClassName)}
            variant={variant}
            disabled={disabled}
            {...otherContainerProps}
        >
            {showAddon && (
                <div className={addonClasses} data-testid="input-addon">
                    {addon}
                </div>
            )}
            <input type="text" ref={ref} {...inputProps} />
        </InputContainer>
    );
});

InputText.displayName = 'InputText';
