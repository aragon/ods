import { render, screen } from '@testing-library/react';
import * as wagmi from 'wagmi';
import { DataList } from '../../../../../core';
import { modulesCopy } from '../../../../assets';
import { addressUtils } from '../../../../utils/addressUtils';
import { ProposalDataListItemStructure, maxPublishersDisplayed } from './proposalDataListItemStructure';
import {
    type IApprovalThresholdResult,
    type IMajorityVotingResult,
    type IProposalDataListItemStructureProps,
    type ProposalStatus,
} from './proposalDataListItemStructure.api';

jest.mock('wagmi', () => ({
    ...jest.requireActual('wagmi'),
    useAccount: jest.fn(),
}));
jest.mock('viem/utils', () => ({ isAddress: jest.fn().mockReturnValue(true) }));

describe('<ProposalDataListItemStructure/> component', () => {
    const createTestComponent = (props?: Partial<IProposalDataListItemStructureProps>) => {
        const { result, ...baseInputProps } = props ?? {};

        const baseProps: Omit<IProposalDataListItemStructureProps, 'result'> = {
            publisher: { address: '0x0000000000000000000000000000000000000000', link: '#' },
            status: 'active',
            summary: 'Example Summary',
            title: 'Example Title',
            type: 'approvalThreshold',
            ...baseInputProps,
        };

        const approvalThresholdProps: IApprovalThresholdResult = {
            approvalAmount: 1,
            approvalThreshold: 2,
            ...result,
        };

        const majorityVotingProps: IMajorityVotingResult = {
            option: 'yes',
            voteAmount: '100 wAnt',
            votePercentage: 10,
            ...result,
        };

        return (
            <DataList.Root entityLabel="Proposals">
                {baseProps.type === 'approvalThreshold' && (
                    <ProposalDataListItemStructure
                        {...baseProps}
                        result={approvalThresholdProps}
                        type="approvalThreshold"
                    />
                )}

                {baseProps.type === 'majorityVoting' && (
                    <ProposalDataListItemStructure {...baseProps} result={majorityVotingProps} type="majorityVoting" />
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

    it("renders 'You' as the publisher if the connected address is the publisher address", () => {
        const publisher = { address: '0x0000000000000000000000000000000000000000', link: '#' };

        useAccountMock.mockImplementation(jest.fn().mockReturnValue({ address: publisher.address, isConnected: true }));

        render(createTestComponent({ publisher }));

        expect(screen.getByRole('link', { name: 'You' })).toBeInTheDocument();
    });

    it('renders multiple publishers', () => {
        const publishers = [
            { name: 'abc', link: '#', address: '0x0000000000000000000000000000000000000000' },
            { name: 'def', link: '#', address: '0x0000000000000000000000000000000000000000' },
        ];

        render(createTestComponent({ publisher: publishers }));

        publishers.forEach((publisher) => {
            expect(screen.getByText(publisher.name)).toBeInTheDocument();
        });
    });

    it(`renders '${maxPublishersDisplayed}+ creators' when the publishers are more than ${maxPublishersDisplayed}`, () => {
        const publishers = [
            { name: 'abc', link: '#', address: '0x0000000000000000000000000000000000000000' },
            { name: 'def', link: '#', address: '0x0000000000000000000000000000000000000000' },
            { name: 'ghi', link: '#', address: '0x0000000000000000000000000000000000000000' },
            { name: 'jkl', link: '#', address: '0x0000000000000000000000000000000000000000' },
        ];

        render(createTestComponent({ publisher: publishers }));

        expect(screen.getByText(`${maxPublishersDisplayed}+ creators`)).toBeInTheDocument();
    });

    it('renders with the given properties', () => {
        const testProps = {
            tag: 'OSx updates',
            date: new Date().toISOString(),
            publisher: { address: '0x0000000000000000000000000000000000000000', link: '#' },
            status: 'active',
            summary: 'Example Summary',
            title: 'Example Title',
            type: 'approvalThreshold',
            id: '0x1',
        };

        render(createTestComponent(testProps as IProposalDataListItemStructureProps));

        expect(screen.getByText(testProps.title)).toBeInTheDocument();
        expect(screen.getByText(testProps.summary)).toBeInTheDocument();
        expect(screen.getByText(testProps.status)).toBeInTheDocument();
        expect(screen.getByText(testProps.date)).toBeInTheDocument();
        expect(screen.getByText(testProps.id)).toBeInTheDocument();
        expect(screen.getByText(testProps.tag)).toBeInTheDocument();
        expect(screen.getByText(addressUtils.truncateAddress(testProps.publisher.address))).toBeInTheDocument();
    });

    describe("'approvalThreshold' type", () => {
        ongoingStatuses.forEach((status) => {
            it.each(ongoingStatuses)(`renders the results when status is '${status}'`, () => {
                const testProps = {
                    approvalAmount: 10,
                    approvalThreshold: 11,
                };

                render(createTestComponent({ result: testProps, type: 'approvalThreshold', status }));

                expect(screen.getByText(testProps.approvalAmount)).toBeInTheDocument();
                expect(
                    screen.getByText(modulesCopy.approvalThresholdResult.outOf(testProps.approvalThreshold.toString())),
                ).toBeInTheDocument();
            });
        });

        it('does not render the results when status is not of an ongoing type', () => {
            const testProps = {
                approvalAmount: 10,
                approvalThreshold: 11,
            };

            render(createTestComponent({ result: testProps, type: 'approvalThreshold', status: 'expired' }));

            expect(screen.queryByText(testProps.approvalAmount)).not.toBeInTheDocument();
            expect(
                screen.queryByText(modulesCopy.approvalThresholdResult.outOf(testProps.approvalThreshold.toString())),
            ).not.toBeInTheDocument();
        });
    });

    describe("'majorityVoting' type", () => {
        ongoingStatuses.forEach((status) => {
            it(`renders the results when status is '${status}'`, () => {
                const testProps = {
                    option: 'Yes',
                    voteAmount: '100 wAnt',
                    votePercentage: 10,
                };

                render(createTestComponent({ result: testProps, type: 'majorityVoting', status }));

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

            render(createTestComponent({ result: testProps, type: 'majorityVoting', status: 'pending' }));

            expect(screen.queryByText(testProps.option)).not.toBeInTheDocument();
            expect(screen.queryByText(testProps.voteAmount)).not.toBeInTheDocument();
            expect(screen.queryByText(`${testProps.votePercentage}%`)).not.toBeInTheDocument();
        });
    });
});
