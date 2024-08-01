import { render, screen } from '@testing-library/react';
import { modulesCopy } from '../../../../../assets';
import { generateProposalActionTokenMint } from '../../actions/generators';
import { ProposalActionsActionDecodedView } from './proposalActionsActionDecodedView';

jest.mock('../../../../../../core', () => {
    const originalModule = jest.requireActual('../../../../../../core');
    return {
        ...originalModule,
        InputNumber: ({
            value,
            disabled,
            label,
            helpText,
        }: {
            value: number;
            disabled: boolean;
            label: string;
            helpText: string;
        }) => (
            <div>
                <p>{label}</p>
                <p>{helpText}</p>
                <input type="number" value={value} disabled={disabled} />
            </div>
        ),
    };
});

describe('<ProposalActionsActionDecodedView /> component', () => {
    const createTestComponent = (props?: Partial<React.ComponentProps<typeof ProposalActionsActionDecodedView>>) => {
        const defaultProps = {
            action: generateProposalActionTokenMint(),
            ...props,
        };
        return <ProposalActionsActionDecodedView {...defaultProps} />;
    };

    it('renders action value correctly', () => {
        const action = generateProposalActionTokenMint({ value: '100' });
        render(createTestComponent({ action }));

        expect(screen.getByText('Value')).toBeInTheDocument();
        expect(screen.getByText(modulesCopy.proposalActionsActionDecodedView.valueHelper)).toBeInTheDocument();
        expect(screen.getByDisplayValue('100')).toBeInTheDocument();
    });

    it('renders action parameters correctly', () => {
        const action = generateProposalActionTokenMint({
            inputData: {
                function: 'myFunction',
                contract: 'myContract',
                parameters: [
                    { name: 'param1', comment: 'First parameter', value: 'value1' },
                    { name: 'param2', comment: 'Second parameter', value: 'value2' },
                ],
            },
        });
        render(createTestComponent({ action }));

        expect(screen.getByText('param1')).toBeInTheDocument();
        expect(screen.getByText('First parameter')).toBeInTheDocument();
        expect(screen.getByDisplayValue('value1')).toBeInTheDocument();

        expect(screen.getByText('param2')).toBeInTheDocument();
        expect(screen.getByText('Second parameter')).toBeInTheDocument();
        expect(screen.getByDisplayValue('value2')).toBeInTheDocument();
    });

    it('renders correctly with no parameters', () => {
        const action = generateProposalActionTokenMint({
            inputData: { function: 'myFunction', contract: 'myContract', parameters: [] },
            value: '200',
        });
        render(createTestComponent({ action }));

        expect(screen.getByText('Value')).toBeInTheDocument();
        expect(screen.getByText(modulesCopy.proposalActionsActionDecodedView.valueHelper)).toBeInTheDocument();
        expect(screen.getByDisplayValue(action.value!)).toBeInTheDocument();
    });
});
