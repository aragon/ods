import { render, screen } from '@testing-library/react';
import { type IApprovalThresholdResult, type IMajorityVotingResult } from '../proposalDataListItemStructure';
import { ProposalDataListItemResult, type IProposalDataListItemResultProps } from './proposalDataListItemResult';

describe('<ProposalDataListItemResult/> component', () => {
    const createTestComponent = (props?: Partial<IProposalDataListItemResultProps>) => {
        const approvalThresholdProps = {
            type: 'approvalThreshold',
            approvalAmount: 1,
            approvalThreshold: 2,
            ...props,
        } as IProposalDataListItemResultProps;

        const majorityVotingProps = {
            type: 'majorityVoting',
            option: 'yes',
            voteAmount: '100 wAnt',
            votePercentage: 10,
            ...props,
        } as IProposalDataListItemResultProps;

        if (props?.type === 'approvalThreshold') {
            return <ProposalDataListItemResult {...approvalThresholdProps} />;
        }
        return <ProposalDataListItemResult {...majorityVotingProps} />;
    };

    it("renders the given approval threshold, approval amount and corresponding progressbar for the 'approvalThreshold' variant", () => {
        const mockProps: IApprovalThresholdResult = {
            type: 'approvalThreshold',
            approvalAmount: 100,
            approvalThreshold: 200,
        };

        render(createTestComponent(mockProps));

        expect(screen.getByText(mockProps.approvalAmount)).toBeInTheDocument();
        expect(screen.getByText(mockProps.approvalThreshold)).toBeInTheDocument();
        expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it("renders the given winning option, vote amount, vote percentage and a corresponding progressbar for the 'majorityVoting' variant", () => {
        const mockProps: IMajorityVotingResult = {
            type: 'majorityVoting',
            option: 'yes',
            voteAmount: '100k wAnt',
            votePercentage: 15,
        };

        render(createTestComponent(mockProps));

        expect(screen.getByText(mockProps.option)).toBeInTheDocument();
        expect(screen.getByText(mockProps.voteAmount)).toBeInTheDocument();
        expect(screen.getByText(mockProps.votePercentage, { exact: false })).toBeInTheDocument();
        expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });
});
