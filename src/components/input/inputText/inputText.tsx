import classNames from 'classnames';
import type { IInputTextProps } from '.';
import { useInputProps } from '../hooks';
import { InputContainer, type InputVariant } from '../inputContainer';

/**
 * TO-DO: border will look too dark here until we adjust inputContainer.tsx to new design specs for border-{variant}-200
 * re: QA -- also needs variant specific focus rings on the container
 **/
const variantToAddonClassNames: Record<InputVariant | 'disabled', string[]> = {
    default: ['bg-neutral-100 border-neutral-200 text-neutral-600'],
    warning: ['bg-warning-100 border-warning-600 text-warning-600'],
    critical: ['bg-critical-100 border-critical-600 text-critical-600'],
    disabled: ['bg-neutral-50 border-neutral-200'],
};

export const InputText: React.FC<IInputTextProps> = ({ addonPosition = 'left', addon, ...otherProps }) => {
    const { containerProps, inputProps } = useInputProps(otherProps);
    const variant = otherProps.variant ?? 'default';
    const processedVariant = otherProps.isDisabled ? 'disabled' : variant;
    const showAddon = addon && addon.trim() !== '';

    const addonClasses = classNames(
        'flex h-full shrink-0 items-center justify-center px-3 text-base font-normal leading-tight',
        variantToAddonClassNames[processedVariant],
        addonPosition === 'left' && 'border-r-[1px]',
        addonPosition === 'right' && 'order-last border-l-[1px]',
    );

    return (
        <InputContainer wrapperClassName="overflow-hidden" {...containerProps}>
            {showAddon && (
                <div className={addonClasses} data-testid="input-addon">
                    {addon}
                </div>
            )}
            <input type="text" {...inputProps} />
        </InputContainer>
    );
};
