import { fireEvent, render, screen } from '@testing-library/react';
import { createRef } from 'react';
import * as InputHooks from '../hooks';
import { InputNumberMax, type IInputNumberMaxProps } from './inputNumberMax';

describe('<InputNumberMax /> component', () => {
    const useNumberMaskMock = jest.spyOn(InputHooks, 'useNumberMask');

    beforeEach(() => {
        const numberMaskResult = {
            ref: createRef(),
            setValue: jest.fn(),
        } as unknown as InputHooks.IUseNumberMaskResult;
        useNumberMaskMock.mockReturnValue(numberMaskResult);
    });

    afterEach(() => {
        useNumberMaskMock.mockReset();
    });

    const createTestComponent = (props?: Partial<IInputNumberMaxProps>) => {
        const completeProps: IInputNumberMaxProps = {
            max: 100,
            ...props,
        };

        return <InputNumberMax {...completeProps} />;
    };

    it('renders an input with a max button', () => {
        render(createTestComponent());
        expect(screen.getByRole('textbox')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Max' })).toBeInTheDocument();
    });

    it('updates the mask value with the max property on max button click', () => {
        const max = 1_000_000;
        const setValue = jest.fn();
        const hookResult = { setValue } as unknown as InputHooks.IUseNumberMaskResult;
        useNumberMaskMock.mockReturnValue(hookResult);
        render(createTestComponent({ max }));
        fireEvent.click(screen.getByRole('button'));
        expect(setValue).toHaveBeenCalledWith(max.toString());
    });
});
