import { act, render, screen, within } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import type { Address } from 'viem';
import type { UseEnsAddressReturnType, UseEnsNameReturnType } from 'wagmi';
import * as wagmi from 'wagmi';
import { IconType, clipboardUtils } from '../../../../core';
import { addressUtils } from '../../../utils';
import { OdsModulesProvider } from '../../odsModulesProvider';
import { AddressInput, type IAddressInputProps } from './addressInput';

jest.mock('../../member', () => ({
    MemberAvatar: () => <div data-testid="member-avatar-mock" />,
}));

describe('<AddressInput /> component', () => {
    const pasteMock = jest.spyOn(clipboardUtils, 'paste');
    const copyMock = jest.spyOn(clipboardUtils, 'copy');

    const getChecksumMock = jest.spyOn(addressUtils, 'getChecksum');

    const useEnsAddressMock = jest.spyOn(wagmi, 'useEnsAddress');
    const useEnsNameMock = jest.spyOn(wagmi, 'useEnsName');

    beforeEach(() => {
        getChecksumMock.mockImplementation((value) => value as Address);
        useEnsAddressMock.mockReturnValue({ data: undefined, isFetching: false } as UseEnsAddressReturnType);
        useEnsNameMock.mockReturnValue({ data: undefined, isFetching: false } as UseEnsNameReturnType);
    });

    afterEach(() => {
        pasteMock.mockReset();
        copyMock.mockReset();

        useEnsAddressMock.mockReset();
        useEnsNameMock.mockReset();
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
        const value = 'test.eth';
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

    it('renders a copy button to copy current input value when current value is a valid address', async () => {
        const value = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045';
        render(createTestComponent({ value }));
        const copyButton = screen.getAllByRole('button').find((button) => within(button).findByTestId(IconType.COPY));
        expect(copyButton).toBeInTheDocument();
        await userEvent.click(copyButton!);
        expect(copyMock).toHaveBeenCalledWith(value);
    });

    it('renders the external link button when input value is a valid address', () => {
        const value = '0xeefB13C7D42eFCc655E528dA6d6F7bBcf9A2251d';
        render(createTestComponent({ value }));
        const linkButton = screen.getByRole<HTMLAnchorElement>('link');
        expect(linkButton).toBeInTheDocument();
        expect(linkButton.href).toEqual(`https://etherscan.io/address/${value}`);
    });

    it('renders a loder as avatar when loading the user address', () => {
        useEnsAddressMock.mockReturnValue({ isFetching: true } as UseEnsAddressReturnType);
        render(createTestComponent());
        expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('renders the avatar for the current address', () => {
        render(createTestComponent());
        expect(screen.getByTestId('member-avatar-mock')).toBeInTheDocument();
    });
});
