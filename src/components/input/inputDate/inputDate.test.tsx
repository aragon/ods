import { render, screen, within } from '@testing-library/react';
import React from 'react';
import { IconType } from '../../icon';
import { InputDate, type IInputDateProps } from './inputDate';

describe('<InputDate /> component', () => {
    const useRefMock = jest.spyOn(React, 'useRef');

    const createTestComponent = (props?: Partial<IInputDateProps>) => {
        const completeProps = { ...props };

        return <InputDate {...completeProps} />;
    };

    it('renders a date input', () => {
        const label = 'Date label';
        render(createTestComponent({ label }));
        const dateInput = screen.getByLabelText<HTMLInputElement>(label);
        expect(dateInput).toBeInTheDocument();
        expect(dateInput.type).toEqual('date');
    });

    it('renders a button to open the date picker on click', () => {
        useRefMock.mockImplementation(() => ({ current: { showPicker: jest.fn() } }));
        render(createTestComponent());
        const calendarButton = screen.getByRole('button');
        expect(calendarButton).toBeInTheDocument();
        expect(within(calendarButton).getByTestId(IconType.CALENDAR)).toBeInTheDocument();
    });
});
