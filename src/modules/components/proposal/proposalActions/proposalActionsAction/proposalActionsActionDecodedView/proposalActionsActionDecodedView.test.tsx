import { render, screen } from '@testing-library/react';
import { modulesCopy } from '../../../../../assets';
import { generateProposalActionTokenMint } from '../../actions/generators';
import {
    type IProposalActionsActionDecodedViewProps,
    ProposalActionsActionDecodedView,
} from './proposalActionsActionDecodedView';

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
    const createTestComponent = (props?: Partial<IProposalActionsActionDecodedViewProps>) => {
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
                    {
                        name: 'param1',
                        notice: 'First parameter',
                        value: 'value1',
                        type: 'string',
                    },
                    {
                        name: 'param2',
                        notice: 'Second parameter',
                        value: 'value2',
                        type: 'string',
                    },
                ],
            },
        });
        render(createTestComponent({ action }));

        const param1Input = screen.getByDisplayValue('value1');
        const param2Input = screen.getByDisplayValue('value2');

        expect(screen.getByText(action.inputData!.parameters[0].name)).toBeInTheDocument();
        expect(screen.getByText(action.inputData!.parameters[0].notice!)).toBeInTheDocument();
        expect(param1Input).toBeInTheDocument();
        expect(param1Input).toBeDisabled();

        expect(screen.getByText(action.inputData!.parameters[1].name)).toBeInTheDocument();
        expect(screen.getByText(action.inputData!.parameters[1].notice!)).toBeInTheDocument();
        expect(param2Input).toBeInTheDocument();
        expect(param2Input).toBeDisabled();
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
