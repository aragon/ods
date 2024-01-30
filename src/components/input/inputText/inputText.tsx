import classNames from 'classnames';
import { useInputProps } from '../hooks';
import { InputContainer, type IInputComponentProps, type InputVariant } from '../inputContainer';

type BaseProps = Omit<IInputComponentProps, 'addonLeft' | 'addonRight'>;
type NoAddonProps = BaseProps & { addonLeft?: never; addonRight?: never };
type LeftAddonProps = BaseProps & { addonLeft: string; addonRight?: never };
type RightAddonProps = BaseProps & { addonLeft?: never; addonRight: string };

export type IInputTextProps = LeftAddonProps | RightAddonProps | NoAddonProps;

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

export const InputText: React.FC<IInputTextProps> = ({ children, addonLeft, addonRight, ...otherProps }) => {
    const { containerProps, inputProps } = useInputProps(otherProps);
    const variant = otherProps.variant ?? 'default';
    const processedVariant = otherProps.isDisabled ? 'disabled' : variant;

    const addonClasses = classNames(
        'flex h-full shrink-0 items-center justify-center px-3 text-base font-normal leading-tight',
        variantToClassNames[processedVariant],
        addonLeft && 'border-r-[1px]',
        addonRight && 'border-l-[1px]',
    );

    return (
        <InputContainer wrapperClassName="overflow-hidden" {...containerProps}>
            {addonLeft && !addonRight && <div className={addonClasses}>{addonLeft}</div>}
            <input type="text" {...inputProps} />
            {addonRight && !addonLeft && <div className={addonClasses}>{addonRight}</div>}
        </InputContainer>
    );
};

InputText.displayName = 'InputText';
