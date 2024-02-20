import { act, renderHook } from '@testing-library/react';
import type { ChangeEvent } from 'react';
import { useInputProps } from './useInputProps';

describe('useInputProps hook', () => {
    it('splits the container and input properties', () => {
        const containerProps = {
            label: 'input-label',
            variant: 'warning' as const,
            helpText: 'help-text',
            isOptional: true,
            alert: { message: 'alert-message', variant: 'critical' as const },
            className: 'container-classname',
            maxLength: 10,
        };

        const inputProps = {
            placeholder: 'input-placeholder',
            value: 'input-value',
            maxLength: 10,
        };

        const { result } = renderHook(() => useInputProps({ ...containerProps, ...inputProps }));
        expect(result.current.containerProps).toEqual(expect.objectContaining(containerProps));
        expect(result.current.inputProps).toEqual(expect.objectContaining(inputProps));
    });

    it('process the id prop and sets it on the container and input props', () => {
        const inputId = 'input-id';
        const props = { id: inputId };
        const { result } = renderHook(() => useInputProps(props));
        expect(result.current.containerProps.id).toEqual(inputId);
        expect(result.current.inputProps.id).toEqual(inputId);
    });

    it('forward the disabled property to the input component when set', () => {
        const disabled = true;
        const props = { disabled };
        const { result } = renderHook(() => useInputProps(props));
        expect(result.current.inputProps.disabled).toBeTruthy();
    });

    it('sets a random id to the input property when the id prop is not set', () => {
        const { result } = renderHook(() => useInputProps({}));
        expect(result.current.containerProps.id).toBeDefined();
        expect(result.current.inputProps.id).toBeDefined();
    });

    it('tracks the current input length for the container props', () => {
        const newValue = 'newValue';
        const changeEvent = { target: { value: newValue } } as ChangeEvent<HTMLInputElement>;
        const { result } = renderHook(() => useInputProps({}));
        expect(result.current.containerProps.inputLength).toEqual(0);
        act(() => result.current.inputProps.onChange?.(changeEvent));
        expect(result.current.containerProps.inputLength).toEqual(newValue.length);
    });

    it('tracks the current input length for controlled inputs', () => {
        const value = 'initialValue';
        const newValue = 'newValue';
        const { result, rerender } = renderHook((props) => useInputProps(props), { initialProps: { value } });
        expect(result.current.containerProps.inputLength).toEqual(value.length);
        rerender({ value: newValue });
        expect(result.current.containerProps.inputLength).toEqual(newValue.length);
    });

    it('calls the onChange property on input value change', () => {
        const onChange = jest.fn();
        const { result } = renderHook(() => useInputProps({ onChange }));
        const changeEvent = { target: { value: '' } } as ChangeEvent<HTMLInputElement>;
        act(() => result.current.inputProps.onChange?.(changeEvent));
        expect(onChange).toHaveBeenCalledWith(changeEvent);
    });
});
