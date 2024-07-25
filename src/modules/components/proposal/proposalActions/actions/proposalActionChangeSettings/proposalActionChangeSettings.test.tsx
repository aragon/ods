import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { ProposalActionType, type IProposalActionChangeSettings } from '../../proposalActionsTypes';
import { generateProposalActionChangeSettingsMultisig } from '../generators';
import { ProposalActionChangeSettings, type IProposalActionChangeSettingsProps } from './proposalActionChangeSettings';

describe('<ProposalActionChangeSettings /> component', () => {
    const createTestComponent = (props?: Partial<IProposalActionChangeSettingsProps>) => {
        const completeProps: IProposalActionChangeSettingsProps = {
            action: generateProposalActionChangeSettingsMultisig(),
            ...props,
        };

        return <ProposalActionChangeSettings {...completeProps} />;
    };

    it('renders existing settings by default', () => {
        const existingSettings = [{ term: 'Support threshold', definition: '50%' }];
        const proposedSettings = [{ term: 'Support threshold', definition: '60%' }];
        const action: IProposalActionChangeSettings = {
            type: ProposalActionType.CHANGE_SETTINGS_MULTISIG,
            existingSettings,
            proposedSettings,
            from: '0x000',
            to: '0x000',
            data: '',
            value: '0',
            inputData: {
                function: 'settings',
                contract: 'Multisig',
                parameters: [
                    { type: 'address', value: '0x000' },
                    { type: 'uint256', value: '1000000' },
                ],
            },
        };
        render(createTestComponent({ action }));
        expect(screen.getByText(existingSettings[0].term)).toBeInTheDocument();
        expect(screen.getByText(existingSettings[0].definition)).toBeInTheDocument();
    });

    it('toggles to proposed settings', async () => {
        const existingSettings = [{ term: 'Threshold', definition: '2' }];
        const proposedSettings = [{ term: 'Threshold', definition: '3' }];
        const action: IProposalActionChangeSettings = {
            type: ProposalActionType.CHANGE_SETTINGS_MULTISIG,
            existingSettings,
            proposedSettings,
            from: '0x000',
            to: '0x000',
            data: '',
            value: '0',
            inputData: {
                function: 'settings',
                contract: 'Multisig',
                parameters: [
                    { type: 'address', value: '0x000' },
                    { type: 'uint256', value: '1000000' },
                ],
            },
        };
        render(createTestComponent({ action }));

        await userEvent.click(screen.getByText('Proposed'));

        expect(screen.getByText(proposedSettings[0].term)).toBeInTheDocument();
        expect(screen.getByText(proposedSettings[0].definition)).toBeInTheDocument();
    });

    it('renders both existing and proposed settings', async () => {
        const existingSettings = [
            { term: 'Existing Term 1', definition: 'Existing Definition 1' },
            { term: 'Existing Term 2', definition: 'Existing Definition 2' },
        ];
        const proposedSettings = [
            { term: 'Proposed Term 1', definition: 'Proposed Definition 1' },
            { term: 'Proposed Term 2', definition: 'Proposed Definition 2' },
        ];
        const action: IProposalActionChangeSettings = {
            type: ProposalActionType.CHANGE_SETTINGS_MULTISIG,
            existingSettings,
            proposedSettings,
            from: '0x000',
            to: '0x000',
            data: '',
            value: '0',
            inputData: {
                function: 'settings',
                contract: 'Multisig',
                parameters: [
                    { type: 'address', value: '0x000' },
                    { type: 'uint256', value: '1000000' },
                ],
            },
        };
        render(createTestComponent({ action }));
        expect(screen.getByText(existingSettings[0].term)).toBeInTheDocument();
        expect(screen.getByText(existingSettings[0].definition)).toBeInTheDocument();
        expect(screen.getByText(existingSettings[1].term)).toBeInTheDocument();
        expect(screen.getByText(existingSettings[1].definition)).toBeInTheDocument();

        await userEvent.click(screen.getByText('Proposed'));

        expect(screen.getByText(proposedSettings[0].term)).toBeInTheDocument();
        expect(screen.getByText(proposedSettings[0].definition)).toBeInTheDocument();
        expect(screen.getByText(proposedSettings[1].term)).toBeInTheDocument();
        expect(screen.getByText(proposedSettings[1].definition)).toBeInTheDocument();
    });
});
