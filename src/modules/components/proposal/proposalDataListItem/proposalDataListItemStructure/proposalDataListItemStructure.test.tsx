import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import * as wagmi from 'wagmi';
import { DataList } from '../../../../../core';
import { addressUtils } from '../../../../utils/addressUtils';
import { ProposalDataListItemStructure } from './proposalDataListItemStructure';
import {
    type IProposalDataListItemStructureProps,
    type IProposalListItemBaseProps,
    type ProposalStatus,
} from './proposalDataListItemStructureApi';

jest.mock('wagmi', () => ({ useAccount: jest.fn() }));
jest.mock('viem/utils', () => ({ isAddress: jest.fn().mockReturnValue(true) }));

describe('<ProposalDataListItemStructure/> component', () => {
    const createTestComponent = (props?: Partial<IProposalDataListItemStructureProps>) => {
        const baseProps: IProposalListItemBaseProps = {
            type: 'approvalThreshold',
            date: new Date().toISOString(),
            protocolUpdate: false,
            publisher: { address: '0x123' },
            status: 'active',
            summary: 'Example Summary',
            title: 'Example Title',
            voted: false,
        };

        const approvalThresholdProps = {
            ...baseProps,
            type: 'approvalThreshold',
            approvalAmount: 1,
            approvalThreshold: 2,
            ...props,
        } as IProposalDataListItemStructureProps;

        const majorityVotingProps = {
            ...baseProps,
            type: 'majorityVoting',
            option: 'yes',
            voteAmount: '100 wAnt',
            votePercentage: 10,
            ...props,
        } as IProposalDataListItemStructureProps;

        return (
            <DataList.Root entityLabel="Proposals">
                {props?.type === 'approvalThreshold' ? (
                    <ProposalDataListItemStructure {...approvalThresholdProps} />
                ) : (
                    <ProposalDataListItemStructure {...majorityVotingProps} />
                )}
            </DataList.Root>
        );
    };

    const useAccountMock = jest.spyOn(wagmi, 'useAccount');

    beforeEach(() => {
        useAccountMock.mockImplementation(jest.fn().mockReturnValue({ address: '0x456', isConnected: true }));
    });

    afterEach(() => {
        useAccountMock.mockReset();
    });

    const ongoingStatuses: ProposalStatus[] = ['active', 'challenged', 'vetoed'];

    it('calls onPublisherClick with the given composite address when publisher is clicked', async () => {
        const handlePublisherClick = jest.fn();
        const publisher = { address: '0x123' };

        render(createTestComponent({ onPublisherClick: handlePublisherClick, publisher }));

        await userEvent.click(screen.getByRole('button'));

        expect(handlePublisherClick).toHaveBeenCalledWith(publisher);
    });

    it('calls onPublisherClick with the given composite address when publisher is focused and enter key is pressed', async () => {
        const handlePublisherClick = jest.fn();
        const publisher = { address: '0x123' };

        render(createTestComponent({ onPublisherClick: handlePublisherClick, publisher }));

        screen.getByRole('button').focus();
        await userEvent.keyboard('[Enter]');

        expect(handlePublisherClick).toHaveBeenCalledWith(publisher);
    });

    it("renders 'You' as the publisher if the connected address is the publisher address", () => {
        const publisher = { address: '0x123' };

        useAccountMock.mockImplementation(jest.fn().mockReturnValue({ address: publisher.address, isConnected: true }));

        render(createTestComponent({ publisher }));

        expect(screen.getByRole('button', { name: 'You' })).toBeInTheDocument();
    });

    describe("'approvalThreshold type'", () => {
        it('renders without crashing', () => {
            const testProps: IProposalDataListItemStructureProps = {
                date: new Date().toISOString(),
                publisher: { address: '0x123' },
                status: 'active',
                summary: 'Example Summary',
                title: 'Example Title',

                type: 'approvalThreshold',
                approvalAmount: 1,
                approvalThreshold: 2,
            };

            render(createTestComponent(testProps));

            expect(screen.getByText(testProps.title)).toBeInTheDocument();
            expect(screen.getByText(testProps.summary)).toBeInTheDocument();
            expect(screen.getByText(testProps.status)).toBeInTheDocument();
            expect(screen.getByText(testProps.date)).toBeInTheDocument();
            expect(
                screen.getByText(addressUtils.shortenAddress(testProps.publisher.address ?? '')),
            ).toBeInTheDocument();
        });

        ongoingStatuses.forEach((status) => {
            it(`renders the results when status is '${status}'`, () => {
                const testProps = {
                    approvalAmount: 10,
                    approvalThreshold: 11,
                };

                render(createTestComponent({ ...testProps, type: 'approvalThreshold', status }));

                expect(screen.getByText(testProps.approvalAmount)).toBeInTheDocument();
                expect(screen.getByText(testProps.approvalThreshold)).toBeInTheDocument();
            });
        });

        it('does not render the results when status is not of an ongoing type', () => {
            const testProps = {
                approvalAmount: 10,
                approvalThreshold: 11,
            };

            render(createTestComponent({ ...testProps, type: 'approvalThreshold', status: 'expired' }));

            expect(screen.queryByText(testProps.approvalAmount)).not.toBeInTheDocument();
            expect(screen.queryByText(testProps.approvalThreshold)).not.toBeInTheDocument();
        });
    });

    describe("'majorityVoting' type", () => {
        it('renders without crashing', () => {
            const testProps: IProposalDataListItemStructureProps = {
                date: new Date().toISOString(),
                publisher: { address: '0x123' },
                status: 'active',
                summary: 'Example Summary',
                title: 'Example Title',

                type: 'majorityVoting',
                option: 'Yes',
                voteAmount: '100 wAnt',
                votePercentage: 10,
            };

            render(createTestComponent(testProps));

            expect(screen.getByText(testProps.title)).toBeInTheDocument();
            expect(screen.getByText(testProps.summary)).toBeInTheDocument();
            expect(screen.getByText(testProps.status)).toBeInTheDocument();
            expect(screen.getByText(testProps.date)).toBeInTheDocument();
            expect(
                screen.getByText(addressUtils.shortenAddress(testProps.publisher.address ?? '')),
            ).toBeInTheDocument();
        });

        ongoingStatuses.forEach((status) => {
            it(`renders the results when status is '${status}'`, () => {
                const testProps = {
                    option: 'Yes',
                    voteAmount: '100 wAnt',
                    votePercentage: 10,
                };

                render(createTestComponent({ ...testProps, type: 'majorityVoting', status }));

                expect(screen.getByText(testProps.option)).toBeInTheDocument();
                expect(screen.getByText(testProps.voteAmount)).toBeInTheDocument();
                expect(screen.getByText(`${testProps.votePercentage}%`)).toBeInTheDocument();
            });
        });

        it('does not render the results when status is not of an ongoing type', () => {
            const testProps = {
                option: 'Yes',
                voteAmount: '100 wAnt',
                votePercentage: 10,
            };

            render(createTestComponent({ ...testProps, type: 'majorityVoting', status: 'pending' }));

            expect(screen.queryByText(testProps.option)).not.toBeInTheDocument();
            expect(screen.queryByText(testProps.voteAmount)).not.toBeInTheDocument();
            expect(screen.queryByText(`${testProps.votePercentage}%`)).not.toBeInTheDocument();
        });
    });
});
