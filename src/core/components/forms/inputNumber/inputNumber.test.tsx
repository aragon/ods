import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { IconType } from '../../icon';
import * as InputHooks from '../hooks';
import { InputNumber, type IInputNumberProps } from './inputNumber';

describe('<InputNumber /> component', () => {
    const createTestComponent = (props?: Partial<IInputNumberProps>) => {
        const completeProps: IInputNumberProps = {
            ...props,
        };

        return <InputNumber {...completeProps} />;
    };

    it('renders an input with increment and decrement buttons', () => {
        render(createTestComponent());

        expect(screen.getByRole('textbox')).toBeInTheDocument();
        expect(screen.getAllByRole('button').length).toEqual(2);
        expect(screen.getByTestId(IconType.PLUS)).toBeInTheDocument();
        expect(screen.getByTestId(IconType.MINUS)).toBeInTheDocument();
    });

    it('renders a disabled input with no spin buttons when disabled is set to true', () => {
        render(createTestComponent({ disabled: true }));

        expect(screen.getByRole('textbox')).toBeDisabled();
        expect(screen.queryAllByRole('button').length).toEqual(0);
    });

    it('should default step to 1 when given value less than zero', () => {
        const step = -15;
        render(createTestComponent({ step }));
        expect(screen.getByRole('textbox')).toHaveAttribute('step', '1');
    });

    it('should default step to 1 when given value is zero', () => {
        const step = 0;
        render(createTestComponent({ step }));
        expect(screen.getByRole('textbox')).toHaveAttribute('step', '1');
    });

    describe('increment button', () => {
        const useNumberMaskMock = jest.spyOn(InputHooks, 'useNumberMask');

        afterEach(() => {
            useNumberMaskMock.mockReset();
        });

        const testIncrementLogic = async ({
            expectedValue,
            ...props
        }: Partial<IInputNumberProps> & { expectedValue: string }) => {
            const user = userEvent.setup();
            const setValue = jest.fn();
            const hookResult = {
                setValue,
                value: props.value,
                unmaskedValue: props.value,
            } as unknown as InputHooks.IUseNumberMaskResult;
            useNumberMaskMock.mockReturnValue(hookResult);

            render(createTestComponent({ ...props }));

            const [, incrementButton] = screen.getAllByRole<HTMLButtonElement>('button');
            await user.click(incrementButton);

            expect(setValue).toHaveBeenCalledWith(expectedValue);
        };

        it('should increment by one (1) with default parameters', async () => {
            await testIncrementLogic({ expectedValue: '1' });
        });

        it('should return the maximum when the newly generated value exceeds the maximum', async () => {
            const max = 5;
            const step = 2;
            const value = '4';
            await testIncrementLogic({ max, step, value, expectedValue: max.toString() });
        });

        it('should increment by floating point value when the step is a float', async () => {
            const value = '1';
            const step = 0.5;
            await testIncrementLogic({ step, value, expectedValue: (Number(value) + step).toString() });
        });

        it('should round down to the nearest multiple of the step before incrementing by the step value', async () => {
            const value = '1';
            const step = 0.3;
            await testIncrementLogic({ step, value, expectedValue: '1.2' });
        });

        it('should increment to the minimum when no value is provided', async () => {
            const step = 6;
            const min = 5;
            const max = 10;
            await testIncrementLogic({ step, min, max, expectedValue: min.toString() });
        });
    });

    describe('decrement button', () => {
        const useNumberMaskMock = jest.spyOn(InputHooks, 'useNumberMask');

        afterEach(() => {
            useNumberMaskMock.mockReset();
        });

        const testDecrementLogic = async ({
            expectedValue,
            ...props
        }: Partial<IInputNumberProps> & { expectedValue: string }) => {
            const user = userEvent.setup();
            const setValue = jest.fn();
            const hookResult = {
                setValue,
                value: props.value,
                unmaskedValue: props.value,
            } as unknown as InputHooks.IUseNumberMaskResult;
            useNumberMaskMock.mockReturnValue(hookResult);

            render(createTestComponent({ ...props }));

            const [decrementButton] = screen.getAllByRole<HTMLButtonElement>('button');
            await user.click(decrementButton);

            expect(setValue).toHaveBeenCalledWith(expectedValue);
        };

        it('should decrement by step', async () => {
            const value = '10';
            const step = 2;
            const expectedValue = (10 - 2).toString();
            await testDecrementLogic({ value, step, expectedValue });
        });

        it('should decrement to the minimum when no value provided', async () => {
            const step = 2;
            const min = 1;
            await testDecrementLogic({ step, min, expectedValue: min.toString() });
        });

        it('should decrement to the closest multiple of the step smaller than the value', async () => {
            const value = '10';
            const step = 3;
            await testDecrementLogic({ value, step, expectedValue: '9' });
        });
    });
});
