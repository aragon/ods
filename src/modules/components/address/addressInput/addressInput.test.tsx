import { act, render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { clipboardUtils } from '../../../../core';
import { OdsModulesProvider } from '../../odsModulesProvider';
import { AddressInput, type IAddressInputProps } from './addressInput';

describe('<AddressInput /> component', () => {
    const pasteMock = jest.spyOn(clipboardUtils, 'paste');

    afterEach(() => {
        pasteMock.mockReset();
    });

    const createTestComponent = (props?: Partial<IAddressInputProps>) => {
        const completeProps = {
            ...props,
        };

        return (
            <OdsModulesProvider>
                <AddressInput {...completeProps} />
            </OdsModulesProvider>
        );
    };

    it('renders an input field', () => {
        render(createTestComponent());
        expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('initialises the input field using the value property', () => {
        const value = 'vitalik.eth';
        render(createTestComponent({ value }));
        expect(screen.getByDisplayValue(value)).toBeInTheDocument();
    });

    it('calls the onChange property on input field change', async () => {
        const input = '0';
        const onChange = jest.fn();
        render(createTestComponent({ onChange }));
        await userEvent.type(screen.getByRole('textbox'), input);
        expect(onChange).toHaveBeenCalledWith(input);
    });

    it('renders a paste button to read and paste the user clipboard into the input field', async () => {
        const userClipboard = 'vitalik.eth';
        pasteMock.mockResolvedValue(userClipboard);
        const onChange = jest.fn();
        render(createTestComponent({ onChange }));

        const pasteButton = screen.getByRole('button', { name: 'Paste' });
        expect(pasteButton).toBeInTheDocument();

        await userEvent.click(pasteButton);
        expect(onChange).toHaveBeenCalledWith(userClipboard);
    });

    it('hides the paste button when input field is not empty', () => {
        const value = 'test';
        render(createTestComponent({ value }));
        expect(screen.queryByRole('button', { name: 'Paste' })).not.toBeInTheDocument();
    });

    it('renders a clear button to clear current input value when input is focused', async () => {
        const value = 'test-value';
        const onChange = jest.fn();
        render(createTestComponent({ value, onChange }));

        act(() => screen.getByRole('textbox').focus());
        const clearButton = screen.getByRole('button', { name: 'Clear' });
        expect(clearButton).toBeInTheDocument();

        await userEvent.click(clearButton);
        expect(onChange).toHaveBeenCalledWith(undefined);
    });
});
