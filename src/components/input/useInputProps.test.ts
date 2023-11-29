import { renderHook } from '@testing-library/react';
import { useInputProps } from './useInputProps';

describe('useInputProps hook', () => {
    it('splits the container and input properties', () => {
        const containerProps = {
            label: 'input-label',
            variant: 'warning' as const,
            helpText: 'help-text',
            isOptional: true,
            infoText: 'info-text',
            alertMessage: 'alert-message',
            className: 'container-classname',
        };

        const inputProps = {
            placeholder: 'input-placeholder',
            value: 'input-value',
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
        const isDisabled = true;
        const props = { isDisabled };
        const { result } = renderHook(() => useInputProps(props));
        expect(result.current.inputProps.disabled).toBeTruthy();
        expect(result.current.inputProps.className).toContain('cursor-not-allowed');
    });

    it('sets a random id to the input property when the id prop is not set', () => {
        const { result } = renderHook(() => useInputProps({}));
        expect(result.current.containerProps.id).toBeDefined();
        expect(result.current.inputProps.id).toBeDefined();
    });
});
