import classNames from 'classnames';
import { useRef, useState, type FocusEvent, type KeyboardEvent } from 'react';
import { Icon, IconType } from '../../icon';
import { Spinner } from '../../spinner';
import { InputContainer, type IInputComponentProps } from '../inputContainer';
import { useInputProps } from '../useInputProps';

export interface IInputSearchProps extends IInputComponentProps {
    /**
     * Displays a loading indicator when set to true.
     */
    isLoading?: boolean;
}

// Needed to trigger a native onChange event on clear input click (see https://stackoverflow.com/a/46012210)
const nativeValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;

export const InputSearch: React.FC<IInputSearchProps> = (props) => {
    const { isLoading, ...otherProps } = props;
    const { containerProps, inputProps } = useInputProps(otherProps);

    const { inputLength = 0, ...otherContainerProps } = containerProps;
    const { className: inputClassName, onFocus: onInputFocus, onBlur: onInputBlur, ...otherInputProps } = inputProps;

    const inputRef = useRef<HTMLInputElement>(null);
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
        setIsFocused(true);
        onInputFocus?.(event);
    };

    const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
        setIsFocused(false);
        onInputBlur?.(event);
    };

    const handleClear = () => {
        if (inputRef.current == null) {
            return;
        }

        nativeValueSetter?.call(inputRef.current, '');
        const event = new Event('input', { bubbles: true });
        inputRef.current.dispatchEvent(event);

        inputRef.current.focus();
    };

    const handleClearKeyDown = (event: KeyboardEvent<SVGSVGElement>) => {
        if (event.key === 'Enter') {
            handleClear();
        }
    };

    const displayClearIcon = inputLength > 0;

    return (
        <InputContainer inputLength={inputLength} {...otherContainerProps}>
            {isLoading && <Spinner size="sm" variant="neutral" className="ml-4" />}
            {!isLoading && (
                <Icon
                    icon={IconType.SEARCH}
                    size="md"
                    className={classNames('ml-4 text-neutral-400 transition-all', { 'text-neutral-600': isFocused })}
                />
            )}
            <input
                type="search"
                className={classNames('search-cancel:appearance-none', inputClassName)}
                onFocus={handleFocus}
                onBlur={handleBlur}
                ref={inputRef}
                {...otherInputProps}
            />
            <Icon
                role="button"
                tabIndex={displayClearIcon ? 0 : -1}
                icon={IconType.CLOSE}
                aria-hidden={!displayClearIcon}
                className={classNames('mr-4 cursor-pointer text-neutral-600', { invisible: !displayClearIcon })}
                onClick={handleClear}
                onKeyDown={handleClearKeyDown}
            />
        </InputContainer>
    );
};
