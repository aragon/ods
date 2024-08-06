import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { IconType } from '../../icon';
import * as InputHooks from '../hooks';
import { InputNumber, type IInputNumberProps } from './inputNumber';

describe('<InputNumber /> component', () => {
    const useNumberMaskMock = jest.spyOn(InputHooks, 'useNumberMask');

    beforeEach(() => {
        useNumberMaskMock.mockReturnValue({} as unknown as InputHooks.IUseNumberMaskResult);
    });

    afterEach(() => {
        useNumberMaskMock.mockReset();
    });

    const createTestComponent = (props?: Partial<IInputNumberProps>) => {
        const completeProps: IInputNumberProps = {
            ...props,
        };

        return <InputNumber {...completeProps} />;
    };

    const testChangeValueLogic = async (values?: {
        props?: Partial<IInputNumberProps>;
        expectedValue?: string;
        type: 'increment' | 'decrement';
    }) => {
        const { props, expectedValue, type } = values ?? {};
        const user = userEvent.setup();
        const setUnmaskedValue = jest.fn();

        const hookResult = {
            setUnmaskedValue,
            unmaskedValue: props?.value,
        } as unknown as InputHooks.IUseNumberMaskResult;

        useNumberMaskMock.mockReturnValue(hookResult);
        render(createTestComponent({ ...props }));

        const [decrementButton, incrementButton] = screen.getAllByRole('button');

        if (type === 'increment') {
            await user.click(incrementButton);
        } else {
            await user.click(decrementButton);
        }

        expect(setUnmaskedValue).toHaveBeenCalledWith(expectedValue);
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
        it('should increment by one (1) with default parameters', async () => {
            await testChangeValueLogic({ type: 'increment', expectedValue: '1' });
        });

        it('should return the maximum when the newly generated value exceeds the maximum', async () => {
            const max = 5;
            const step = 2;
            const value = '4';
            const props = { max, step, value };
            await testChangeValueLogic({ type: 'increment', props, expectedValue: max.toString() });
        });

        it('should increment by floating point value when the step is a float', async () => {
            const value = '1';
            const step = 0.5;
            const props = { step, value };
            await testChangeValueLogic({ type: 'increment', props, expectedValue: (Number(value) + step).toString() });
        });

        it('should round down to the nearest multiple of the step before incrementing by the step value', async () => {
            const value = '1';
            const step = 0.3;
            const props = { value, step };
            await testChangeValueLogic({ type: 'increment', props, expectedValue: '1.2' });
        });

        it('should increment to the minimum when no value is provided', async () => {
            const step = 6;
            const min = 5;
            const max = 10;
            const props = { step, min, max };
            await testChangeValueLogic({ type: 'increment', props, expectedValue: min.toString() });
        });
    });

    describe('decrement button', () => {
        it('should decrement by step', async () => {
            const value = '10';
            const step = 2;
            const props = { value, step };
            await testChangeValueLogic({ type: 'decrement', props, expectedValue: (10 - 2).toString() });
        });

        it('should decrement to the minimum when no value provided', async () => {
            const step = 2;
            const min = 1;
            const props = { step, min };
            await testChangeValueLogic({ type: 'decrement', props, expectedValue: min.toString() });
        });

        it('should decrement to the closest multiple of the step smaller than the value', async () => {
            const value = '10';
            const step = 3;
            const props = { value, step };
            await testChangeValueLogic({ type: 'decrement', props, expectedValue: '9' });
        });
    });
});
