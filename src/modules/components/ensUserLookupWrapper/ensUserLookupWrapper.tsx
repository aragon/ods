import { useEffect, useState, type ReactNode } from 'react';
import { isAddress, type Hash } from 'viem';
import { useEnsAddress, useEnsAvatar, useEnsName } from 'wagmi';
// @ts-expect-error - untyped module
import makeBlockiesUrl from 'blockies-react-svg/dist/es/makeBlockiesUrl.mjs';

export interface IENSUser {
    name: string;
    address: string;
    avatar: string;
}

export interface IENSLookupProps {
    ensNameOrAddress: string;
    children: (data: { user: IENSUser | null; error: Error | null; isLoading: boolean }) => ReactNode;
}

const ENSLookupComponent: React.FC<IENSLookupProps> = ({ ensNameOrAddress, children }) => {
    const [user, setUser] = useState<IENSUser | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const {
        data: addressData,
        error: addressError,
        isLoading: addressLoading,
    } = useEnsAddress({ name: ensNameOrAddress });
    const {
        data: nameData,
        error: nameError,
        isLoading: nameLoading,
    } = useEnsName({ address: ensNameOrAddress as Hash });
    const {
        data: avatarData,
        error: avatarError,
        isLoading: avatarLoading,
    } = useEnsAvatar({
        name: isAddress(ensNameOrAddress) ? nameData?.toString() ?? '' : ensNameOrAddress,
    });

    useEffect(() => {
        setIsLoading(addressLoading || nameLoading || avatarLoading);
        const anyError = addressError ?? nameError ?? avatarError;
        if (anyError) {
            setError(anyError);
            return;
        }

        const resolvedAddress = isAddress(ensNameOrAddress) ? ensNameOrAddress : addressData;
        const resolvedName = !isAddress(ensNameOrAddress)
            ? ensNameOrAddress
            : nameData ?? resolvedAddress ?? ensNameOrAddress;
        const avatarUrl = avatarData ?? (resolvedAddress ? makeBlockiesUrl(resolvedAddress) : null);

        if (resolvedAddress) {
            setUser({
                name: resolvedName,
                address: resolvedAddress,
                avatar: avatarUrl,
            });
        }
    }, [
        addressData,
        nameData,
        avatarData,
        addressError,
        nameError,
        avatarError,
        addressLoading,
        nameLoading,
        avatarLoading,
        ensNameOrAddress,
    ]);

    return <>{children({ user, error, isLoading })}</>;
};

export const ENSUserLookupWrapper: React.FC<IENSLookupProps> = ({ ensNameOrAddress, children }) => {
    const isValidInput =
        isAddress(ensNameOrAddress) || (ensNameOrAddress.endsWith('.eth') && ensNameOrAddress.length > 4);

    return isValidInput ? (
        <ENSLookupComponent ensNameOrAddress={ensNameOrAddress}>{children}</ENSLookupComponent>
    ) : (
        <>{children({ user: null, error: new Error('Invalid input'), isLoading: false })}</>
    );
};
