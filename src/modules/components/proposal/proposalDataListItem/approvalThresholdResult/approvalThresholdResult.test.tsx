import { render, screen } from '@testing-library/react';
import { NumberFormat, formatterUtils } from '../../../../../core';
import { ApprovalThresholdResult, type IApprovalThresholdResultProps } from './approvalThresholdResult';

describe('<ApprovalThresholdResult /> component', () => {
    const createTestComponent = (props?: Partial<IApprovalThresholdResultProps>) => {
        const completeProps: IApprovalThresholdResultProps = {
            approvalAmount: 1,
            approvalThreshold: 2,
            ...props,
        };

        return <ApprovalThresholdResult {...completeProps} />;
    };

    it('renders the formatted approval threshold and approval amount and the corresponding progressbar', () => {
        const mockProps: IApprovalThresholdResultProps = {
            approvalAmount: 15000000,
            approvalThreshold: 20000000,
        };

        render(createTestComponent(mockProps));

        const expectedApproval = formatterUtils.formatNumber(mockProps.approvalAmount, {
            format: NumberFormat.GENERIC_SHORT,
        }) as string;

        const expectedThreshold = formatterUtils.formatNumber(mockProps.approvalThreshold, {
            format: NumberFormat.GENERIC_SHORT,
        }) as string;

        const progressbar = screen.getByRole('progressbar');
        expect(progressbar).toBeInTheDocument();

        const expectedPercentage = (mockProps.approvalAmount / mockProps.approvalThreshold) * 100;
        expect(progressbar.getAttribute('data-value')).toEqual(expectedPercentage.toString());

        expect(screen.getByText(expectedApproval)).toBeInTheDocument();
        expect(screen.getByText(expectedThreshold)).toBeInTheDocument();
    });

    it('renders the stage title and stage id when provided', () => {
        const mockProps: IApprovalThresholdResultProps = {
            approvalAmount: 1,
            approvalThreshold: 2,
            stageTitle: 'Test Stage',
            stageId: '3',
        };

        render(createTestComponent(mockProps));

        expect(screen.getByText(mockProps.stageTitle!)).toBeInTheDocument();
        expect(screen.getByText(mockProps.stageId!)).toBeInTheDocument();
    });

    it('renders the default stage title when not provided', () => {
        const mockProps: IApprovalThresholdResultProps = {
            approvalAmount: 1,
            approvalThreshold: 2,
        };

        render(createTestComponent(mockProps));

        expect(screen.getByText(/approved by/i)).toBeInTheDocument();
    });
});
