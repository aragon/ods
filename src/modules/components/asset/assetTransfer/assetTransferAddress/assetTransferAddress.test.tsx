import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { type Hash } from 'viem';
import { OdsModulesProvider } from '../../../odsModulesProvider';
import { AssetTransferAddress, type IAssetTransferAddressProps, type TxRole } from './assetTransferAddress'; // Adjust the import path as necessary

jest.mock('../../../member/memberAvatar', () => ({ MemberAvatar: () => <div data-testid="member-avatar-mock" /> }));

describe('AssetTransferAddress', () => {
    const createTestComponent = (props?: Partial<IAssetTransferAddressProps>) => {
        const minimumProps = {
            txRole: 'sender' as TxRole,
            address: '0x1D03D98c0aac1f83860cec5156116FE68725642E' as Hash,
            ensName: undefined,
            blockExplorerUrl: undefined,
            ...props,
        };
        return (
            <OdsModulesProvider>
                <AssetTransferAddress {...minimumProps} />
            </OdsModulesProvider>
        );
    };

    it('renders correctly as a sender', () => {
        const txRole = 'sender' as TxRole;
        render(createTestComponent({ txRole }));

        expect(screen.getByText('From')).toBeInTheDocument();
        // eslint-disable-next-line testing-library/no-node-access
        const parentElement = screen.getByText('From').closest('a');
        expect(parentElement).toHaveClass('rounded-t-xl md:rounded-l-xl md:rounded-r-none');
    });

    it('renders correctly as a recipient', () => {
        const txRole = 'recipient' as TxRole;
        render(createTestComponent({ txRole }));

        expect(screen.getByText('To')).toBeInTheDocument();
        // eslint-disable-next-line testing-library/no-node-access
        const parentElement = screen.getByText('To').closest('a');
        expect(parentElement).toHaveClass('rounded-b-xl md:rounded-r-xl md:rounded-l-none');
    });

    it('uses truncated address if ensName is undefined', () => {
        render(createTestComponent());

        expect(screen.getByText('0x1D…642E')).toBeInTheDocument();
    });

    it('does not create a link if blockExplorerUrl is undefined', () => {
        const blockExplorerUrl = undefined;
        render(createTestComponent({ blockExplorerUrl }));

        // eslint-disable-next-line testing-library/no-node-access
        const possibleLinkElement = screen.getByText('From').closest('a');
        expect(possibleLinkElement).not.toHaveAttribute('href');
    });
});
