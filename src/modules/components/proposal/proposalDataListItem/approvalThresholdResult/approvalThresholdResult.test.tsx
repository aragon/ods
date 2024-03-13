import { render, screen } from '@testing-library/react';
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

    it('renders the given approval threshold, approval amount and corresponding progressbar', () => {
        const mockProps: IApprovalThresholdResultProps = {
            approvalAmount: 100,
            approvalThreshold: 200,
        };

        render(createTestComponent(mockProps));

        expect(screen.getByText(mockProps.approvalAmount)).toBeInTheDocument();
        expect(screen.getByText(mockProps.approvalThreshold)).toBeInTheDocument();
        expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });
});
