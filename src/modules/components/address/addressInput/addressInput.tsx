import { useQueryClient } from '@tanstack/react-query';
import { forwardRef, useEffect, useRef, useState, type ChangeEvent } from 'react';
import { isAddress, type Address } from 'viem';
import { useEnsAddress, useEnsName, type UseEnsAddressParameters, type UseEnsNameParameters } from 'wagmi';
import {
    Avatar,
    Button,
    InputContainer,
    Spinner,
    clipboardUtils,
    mergeRefs,
    type IInputComponentProps,
} from '../../../../core';
import { useInputProps } from '../../../../core/components/input/hooks';
import type { IWeb3ComponentProps } from '../../../types';

export interface IAddressInputValue {
    /**
     * Address value.
     */
    address?: string;
    /**
     * ENS name linked to the given address.
     */
    name?: string;
}

export interface IAddressInputProps
    extends Omit<IInputComponentProps, 'maxLength' | 'value' | 'onChange'>,
        IWeb3ComponentProps {
    /**
     * Current value of the address input.
     */
    value?: string;
    /**
     * Callback called on address input change.
     */
    onChange?: (value?: string) => void;
    /**
     * Callback called with the address value object when the user input is valid. The value will be set to undefined
     * when the user input is not a valid address nor a valid ens name.
     */
    onAccept?: (value?: IAddressInputValue) => void;
}

export type AddressInputDisplayMode = 'address' | 'ens';

const isEnsName = (value?: string) => value != null && value.length > 6 && value.endsWith('.eth');

export const AddressInput = forwardRef<HTMLInputElement, IAddressInputProps>((props, ref) => {
    const { value = '', onChange, onAccept, wagmiConfig, chainId, ...otherProps } = props;

    const { containerProps, inputProps } = useInputProps(otherProps);
    const queryClient = useQueryClient();

    const inputRef = useRef<HTMLInputElement>(null);

    const [displayMode, setDisplayMode] = useState<AddressInputDisplayMode>('address');

    const {
        data: ensAddress,
        isFetching: isEnsAddressLoading,
        queryKey: ensAddressQueryKey,
    } = useEnsAddress({
        name: value,
        config: wagmiConfig,
        chainId,
        query: { enabled: isEnsName(value) },
    });

    const {
        data: ensName,
        isFetching: isEnsNameLoading,
        queryKey: ensNameQueryKey,
    } = useEnsName({
        address: value as Address,
        config: wagmiConfig,
        chainId,
        query: { enabled: isAddress(value) },
    });

    const isLoading = isEnsAddressLoading || isEnsNameLoading;

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => onChange?.(event.target.value);

    const updateDisplayMode = (mode: AddressInputDisplayMode) => {
        setDisplayMode(mode);
        const newInputValue = mode === 'address' ? ensAddress : ensName;
        onChange?.(newInputValue ?? '');
        inputRef.current?.focus();
    };

    const handlePasteClick = async () => {
        const text = await clipboardUtils.paste();
        onChange?.(text);
    };

    // Update display mode depending on current input value
    useEffect(() => {
        const displayMode = isEnsName(value) ? 'ens' : 'address';
        setDisplayMode(displayMode);
    }, [value]);

    // Trigger onChange property when value is a valid address or ENS
    useEffect(() => {
        if (isLoading) {
            return;
        }

        if (ensAddress) {
            // User input is a valid ENS name
            onAccept?.({ address: ensAddress, name: value });
        } else if (isAddress(value)) {
            // User input is a valid address with or without a ENS name linked to it
            onAccept?.({ address: value, name: ensName ?? undefined });
        } else {
            // User input is not a valid address nor ENS name
            onAccept?.(undefined);
        }
    }, [ensAddress, ensName, value, isLoading, onAccept]);

    // Update react-query cache to avoid fetching the ENS address when the ENS name has been successfully resolved.
    // E.g. user types 0x..123 which is resolved into test.eth, therefore set test.eth as resolved ENS name of 0x..123
    useEffect(() => {
        if (ensName) {
            const queryKey = [...ensAddressQueryKey];
            (queryKey[1] as UseEnsAddressParameters).name = ensName;
            queryClient.setQueryData(queryKey, value);
        }
    }, [queryClient, ensName, value, ensAddressQueryKey]);

    // Update react-query cache to avoid fetching the ENS name when the ENS address has been successfully resolved.
    // E.g. user types test.eth which is resolved into 0x..123, therefore set 0x..123 as resolved ENS address of test.eth
    useEffect(() => {
        if (ensAddress) {
            const queryKey = [...ensNameQueryKey];
            (queryKey[1] as UseEnsNameParameters).address = ensAddress;
            queryClient.setQueryData(queryKey, value);
        }
    }, [queryClient, ensAddress, value, ensNameQueryKey]);

    return (
        <InputContainer {...containerProps}>
            <div className="ml-3 shrink-0">
                {isLoading && <Spinner variant="neutral" size="lg" />}
                {!isLoading && <Avatar />}
            </div>
            <input
                type="text"
                ref={mergeRefs([ref, inputRef])}
                {...inputProps}
                value={value}
                onChange={handleInputChange}
            />
            <div className="mr-2 flex flex-row gap-2">
                {ensName != null && displayMode === 'address' && (
                    <Button variant="tertiary" size="sm" onClick={() => updateDisplayMode('ens')}>
                        ENS
                    </Button>
                )}
                {ensAddress != null && displayMode === 'ens' && (
                    <Button variant="tertiary" size="sm" onClick={() => updateDisplayMode('address')}>
                        0x..
                    </Button>
                )}
                <Button variant="tertiary" size="sm" onClick={handlePasteClick}>
                    Paste
                </Button>
            </div>
        </InputContainer>
    );
});

AddressInput.displayName = 'AddressInput';
