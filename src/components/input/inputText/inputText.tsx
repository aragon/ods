import classNames from 'classnames';
import type { IInputTextProps } from '.';
import { useInputProps } from '../hooks';
import { InputContainer, type InputVariant } from '../inputContainer';

/**
 * TO-DO: border will look too dark here until we adjust inputContainer.tsx to new design specs for border-{variant}-200
 * re: QA -- also needs variant specific focus rings on the container
 **/
const variantToClassNames: Record<InputVariant | 'disabled', string[]> = {
    default: ['bg-neutral-100 border-neutral-200 text-neutral-600'],
    warning: ['bg-warning-100 border-warning-600 text-warning-600'],
    critical: ['bg-critical-100 border-critical-600 text-critical-600'],
    disabled: ['bg-neutral-50 border-neutral-200'],
};

export const InputText: React.FC<IInputTextProps> = ({ children, addonPos, addon, ...otherProps }) => {
    const { containerProps, inputProps } = useInputProps(otherProps);
    const variant = otherProps.variant ?? 'default';
    const processedVariant = otherProps.isDisabled ? 'disabled' : variant;
    const showAddon = addon && addon.trim() !== '';

    const addonClasses = classNames(
        'flex h-full shrink-0 items-center justify-center px-3 text-base font-normal leading-tight',
        variantToClassNames[processedVariant],
        addonPos === 'left' && 'border-r-[1px]',
        addonPos === 'right' && 'border-l-[1px]',
    );

    return (
        <InputContainer wrapperClassName="overflow-hidden" {...containerProps}>
            {showAddon && addonPos === 'left' && <div className={addonClasses}>{addon}</div>}
            <input type="text" {...inputProps} />
            {showAddon && addonPos === 'right' && <div className={addonClasses}>{addon}</div>}
        </InputContainer>
    );
};

InputText.displayName = 'InputText';
