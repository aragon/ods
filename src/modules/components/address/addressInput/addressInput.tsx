import { useQueryClient } from '@tanstack/react-query';
import { forwardRef, useEffect, useRef, useState, type ChangeEvent, type FocusEvent } from 'react';
import { isAddress, type Address } from 'viem';
import { useConfig, useEnsAddress, useEnsName, type UseEnsAddressParameters, type UseEnsNameParameters } from 'wagmi';
import {
    Avatar,
    Button,
    IconType,
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
    const { value = '', onChange, onAccept, wagmiConfig: wagmiConfigProps, chainId, ...otherProps } = props;

    const { containerProps, inputProps } = useInputProps(otherProps);
    const { onFocus, onBlur, ...otherInputProps } = inputProps;

    const queryClient = useQueryClient();
    const wagmiConfigProvider = useConfig();

    const wagmiConfig = wagmiConfigProps ?? wagmiConfigProvider;
    const processedChainId = chainId ?? wagmiConfig.chains[0].id;

    const currentChain = wagmiConfig.chains.find(({ id }) => id === processedChainId);

    const inputRef = useRef<HTMLInputElement>(null);
    const blurTimeout = useRef<NodeJS.Timeout>();

    const [displayMode, setDisplayMode] = useState<AddressInputDisplayMode>('address');
    const [isFocused, setIsFocused] = useState(false);

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

    const blockExplorerUrl = `${currentChain?.blockExplorers?.default.url}/address/${value}`;

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => onChange?.(event.target.value);

    const updateDisplayMode = (mode: AddressInputDisplayMode) => {
        setDisplayMode(mode);
        const newInputValue = mode === 'address' ? ensAddress : ensName;
        onChange?.(newInputValue ?? '');
    };

    const handlePasteClick = async () => {
        const text = await clipboardUtils.paste();
        onChange?.(text);
    };

    const handleClearClick = () => onChange?.(undefined);

    const handleInputFocus = (event: FocusEvent<HTMLInputElement>) => {
        clearTimeout(blurTimeout.current);
        setIsFocused(true);
        onFocus?.(event);
    };

    const handleInputBlur = (event: FocusEvent<HTMLInputElement>) => {
        // Add timeout to set the focused state to false otherwise the onClick events from the buttons inside the
        // input component won't be triggered as hidden when the input is not focused.
        blurTimeout.current = setTimeout(() => setIsFocused(false), 150);
        onBlur?.(event);
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
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                {...otherInputProps}
                value={value}
                onChange={handleInputChange}
            />
            <div className="mr-2 flex flex-row gap-2">
                {ensName != null && displayMode === 'address' && !isFocused && (
                    <Button variant="tertiary" size="sm" onClick={() => updateDisplayMode('ens')}>
                        ENS
                    </Button>
                )}
                {ensAddress != null && displayMode === 'ens' && !isFocused && (
                    <Button variant="tertiary" size="sm" onClick={() => updateDisplayMode('address')}>
                        0x..
                    </Button>
                )}
                {(ensAddress != null || isAddress(value)) && !isFocused && (
                    <>
                        <Button
                            variant="tertiary"
                            size="sm"
                            onClick={() => clipboardUtils.copy(ensAddress ?? value)}
                            iconLeft={IconType.COPY}
                        />
                        <Button
                            variant="tertiary"
                            size="sm"
                            href={blockExplorerUrl}
                            target="_blank"
                            iconLeft={IconType.LINK_EXTERNAL}
                        />
                    </>
                )}
                {value.length === 0 && (
                    <Button variant="tertiary" size="sm" onClick={handlePasteClick}>
                        Paste
                    </Button>
                )}
                {value.length > 0 && isFocused && (
                    <Button variant="tertiary" size="sm" onClick={handleClearClick}>
                        Clear
                    </Button>
                )}
            </div>
        </InputContainer>
    );
});

AddressInput.displayName = 'AddressInput';
