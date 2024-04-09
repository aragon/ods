import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { OdsModulesProvider } from '../../../odsModulesProvider';
import { AssetTransferAddress, type IAssetTransferAddressProps } from './assetTransferAddress';

jest.mock('../../../member/', () => ({ MemberAvatar: () => <div data-testid="member-avatar-mock" /> }));

describe('<AssetTransferAddress /> component', () => {
    const createTestComponent = (props?: Partial<IAssetTransferAddressProps>) => {
        const completeProps = {
            txRole: 'sender' as const,
            participant: { address: '0x1D03D98c0aac1f83860cec5156116FE68725642E' },
            ...props,
        };
        return (
            <OdsModulesProvider>
                <AssetTransferAddress {...completeProps} />
            </OdsModulesProvider>
        );
    };

    it('renders correctly as a sender', () => {
        const txRole = 'sender' as const;
        render(createTestComponent({ txRole }));

        expect(screen.getByText('From')).toBeInTheDocument();
        // eslint-disable-next-line testing-library/no-node-access
        const parentElement = screen.getByText('From').closest('a');
        expect(parentElement).toHaveClass('rounded-t-xl md:rounded-l-xl md:rounded-r-none');
    });

    it('renders correctly as a recipient', () => {
        const txRole = 'recipient' as const;
        render(createTestComponent({ txRole }));

        expect(screen.getByText('To')).toBeInTheDocument();
        // eslint-disable-next-line testing-library/no-node-access
        const parentElement = screen.getByText('To').closest('a');
        expect(parentElement).toHaveClass('rounded-b-xl md:rounded-r-xl md:rounded-l-none');
    });

    it('uses truncated address if ensName is undefined', () => {
        const participant = { address: '0x028F5Ca0b3A3A14e44AB8af660B53D1e428457e7' };
        render(createTestComponent({ participant }));

        expect(screen.getByText('0x02…57e7')).toBeInTheDocument();
    });

    it('does not create a link if blockExplorerUrl is undefined', () => {
        const blockExplorerUrl = undefined;
        render(createTestComponent({ blockExplorerUrl }));

        // eslint-disable-next-line testing-library/no-node-access
        const possibleLinkElement = screen.getByText('From').closest('a');
        expect(possibleLinkElement).not.toHaveAttribute('href');
    });

    it('creates a link if blockExplorerUrl is defined', () => {
        const blockExplorerUrl = 'https://etherscan.io';
        render(createTestComponent({ blockExplorerUrl }));

        // eslint-disable-next-line testing-library/no-node-access
        const possibleLinkElement = screen.getByText('From').closest('a');
        expect(possibleLinkElement).toHaveAttribute(
            'href',
            'https://etherscan.io/address/0x1D03D98c0aac1f83860cec5156116FE68725642E',
        );
    });
});
