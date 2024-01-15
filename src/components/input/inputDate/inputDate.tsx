import classNames from 'classnames';
import { forwardRef, useRef } from 'react';
import { mergeRefs } from 'react-merge-refs';
import { Button } from '../../button';
import { IconType } from '../../icon';
import { InputContainer, type IInputComponentProps } from '../inputContainer';
import { useInputProps } from '../useInputProps';

export interface IInputDateProps extends Omit<IInputComponentProps, 'maxLength'> {}

export const InputDate: React.FC<IInputDateProps> = forwardRef((props, ref) => {
    const { containerProps, inputProps } = useInputProps(props);

    const { className: inputClassName, disabled, ...otherInputProps } = inputProps;

    const inputRef = useRef<HTMLInputElement>(null);

    const handleCalendarClick = () => {
        inputRef.current?.showPicker();
    };

    return (
        <InputContainer {...containerProps}>
            <input
                type="date"
                className={classNames('calendar-icon:hidden calendar-icon:appearance-none', inputClassName)}
                ref={mergeRefs([inputRef, ref])}
                disabled={disabled}
                {...otherInputProps}
            />
            <Button
                variant="tertiary"
                size="sm"
                iconLeft={IconType.CALENDAR}
                className="mr-2"
                onClick={handleCalendarClick}
                state={disabled ? 'disabled' : undefined}
            />
        </InputContainer>
    );
});

InputDate.displayName = 'InputDate';
