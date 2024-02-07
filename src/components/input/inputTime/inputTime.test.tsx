import { fireEvent, render, screen, within } from '@testing-library/react';
import React from 'react';
import * as Utils from '../../../utils';
import { IconType } from '../../icon';
import { InputTime, type IInputTimeProps } from './inputTime';

describe('<InputTime /> component', () => {
    const useRefMock = jest.spyOn(React, 'useRef');
    const mergeRefMock = jest.spyOn(Utils, 'mergeRefs');

    afterEach(() => {
        useRefMock.mockReset();
        mergeRefMock.mockReset();
    });

    const createTestComponent = (props?: Partial<IInputTimeProps>) => {
        const completeProps = { ...props };

        return <InputTime {...completeProps} />;
    };

    it('renders a time input', () => {
        const label = 'Test label';
        render(createTestComponent({ label }));

        const timeInput = screen.getByLabelText<HTMLInputElement>(label);

        expect(timeInput).toBeInTheDocument();
        expect(timeInput.type).toEqual('time');
    });

    it('renders a button which opens the time picker on click', () => {
        const showPicker = jest.fn();
        useRefMock.mockReturnValue({ current: { showPicker } });
        mergeRefMock.mockReturnValue(() => null);

        render(createTestComponent());
        const timeButton = screen.getByRole('button');

        expect(timeButton).toBeInTheDocument();
        expect(within(timeButton).getByTestId(IconType.CLOCK)).toBeInTheDocument();

        fireEvent.click(timeButton);
        expect(showPicker).toHaveBeenCalled();
    });

    it('renders the input as disabled when the isDisabled property is set to true', () => {
        const isDisabled = true;
        const label = 'Test label';

        render(createTestComponent({ label, isDisabled }));

        expect(screen.getByLabelText(label)).toBeDisabled();
    });

    it('hides the time picker button when the disabled property is set to true', () => {
        const isDisabled = true;

        render(createTestComponent({ isDisabled }));

        expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });
});
