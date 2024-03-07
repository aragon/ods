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
     * Current address value.
     */
    value?: IAddressInputValue;
    /**
     * Callback called on address change.
     */
    onChange?: (value?: IAddressInputValue) => void;
}

export type AddressInputDisplayMode = 'address' | 'ens';

const isEnsName = (value?: string) => value != null && value.length > 6 && value.endsWith('.eth');

export const AddressInput = forwardRef<HTMLInputElement, IAddressInputProps>((props, ref) => {
    const { value, onChange, wagmiConfig, chainId, ...otherProps } = props;
    const { containerProps, inputProps } = useInputProps(otherProps);

    const queryClient = useQueryClient();

    const inputRef = useRef<HTMLInputElement>(null);

    const [inputValue, setInputValue] = useState(value?.address ?? value?.name ?? '');
    const [displayMode, setDisplayMode] = useState<AddressInputDisplayMode>('address');

    const {
        data: ensAddress,
        isFetching: isEnsAddressLoading,
        queryKey: ensAddressQueryKey,
    } = useEnsAddress({
        name: inputValue,
        config: wagmiConfig,
        chainId,
        query: { enabled: isEnsName(inputValue) },
    });

    const {
        data: ensName,
        isFetching: isEnsNameLoading,
        queryKey: ensNameQueryKey,
    } = useEnsName({
        address: inputValue as Address,
        config: wagmiConfig,
        chainId,
        query: { enabled: isAddress(inputValue) },
    });

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => setInputValue(event.target.value);

    const updateDisplayMode = (mode: AddressInputDisplayMode) => {
        setDisplayMode(mode);
        const newInputValue = mode === 'address' ? ensAddress : ensName;
        setInputValue(newInputValue ?? '');
        inputRef.current?.focus();
    };

    const handlePasteClick = async () => {
        const text = await clipboardUtils.paste();
        setInputValue(text);
    };

    // Update display mode depending on current input value
    useEffect(() => {
        const displayMode = isEnsName(inputValue) ? 'ens' : 'address';
        setDisplayMode(displayMode);
    }, [inputValue]);

    // Trigger onChange property when value is a valid address or ENS
    useEffect(() => {
        if (ensAddress) {
            onChange?.({ address: ensAddress, name: inputValue });
        } else if (ensName) {
            onChange?.({ address: inputValue, name: ensName });
        } else {
            onChange?.({ address: undefined, name: undefined });
        }
    }, [ensAddress, ensName, inputValue, onChange]);

    // Update react-query cache to avoid fetching the ENS address when the ENS name has been successfully resolved.
    // E.g. user types 0x..123 which is resolved into test.eth, set test.eth as resolved ENS name of 0x..123
    useEffect(() => {
        if (ensName) {
            const queryKey = [...ensAddressQueryKey];
            (queryKey[1] as UseEnsAddressParameters).name = ensName;
            queryClient.setQueryData(queryKey, inputValue);
        }
    }, [queryClient, ensName, inputValue, ensAddressQueryKey]);

    // Update react-query cache to avoid fetching the ENS name when the ENS address has been successfully resolved.
    // E.g. user types test.eth which is resolved into 0x..123, set 0x..123 as resolved ENS address of test.eth
    useEffect(() => {
        if (ensAddress) {
            const queryKey = [...ensNameQueryKey];
            (queryKey[1] as UseEnsNameParameters).address = ensAddress;
            queryClient.setQueryData(queryKey, inputValue);
        }
    }, [queryClient, ensAddress, inputValue, ensNameQueryKey]);

    // TODO Update internal input value on value property change
    // useEffect(() => setInputValue(value), [value]);

    const isLoading = isEnsAddressLoading || isEnsNameLoading;

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
                value={inputValue}
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
