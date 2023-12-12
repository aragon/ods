import classNames from 'classnames';
import { useRef } from 'react';
import { Button } from '../../button';
import { IconType } from '../../icon';
import { InputContainer, type IInputComponentProps } from '../inputContainer';
import { useInputProps } from '../useInputProps';

export interface IInputDateProps extends IInputComponentProps {}

export const InputDate: React.FC<IInputDateProps> = (props) => {
    const { containerProps, inputProps } = useInputProps(props);

    const { className: inputClassName, ...otherInputProps } = inputProps;

    const inputRef = useRef<HTMLInputElement>(null);

    const handleCalendarClick = () => {
        inputRef.current?.showPicker();
    };

    return (
        <InputContainer {...containerProps}>
            <input
                type="date"
                className={classNames('calendar-icon:hidden calendar-icon:appearance-none', inputClassName)}
                ref={inputRef}
                {...otherInputProps}
            />
            <Button
                variant="tertiary"
                size="sm"
                iconLeft={IconType.CALENDAR}
                className="mr-2"
                onClick={handleCalendarClick}
            />
        </InputContainer>
    );
};
