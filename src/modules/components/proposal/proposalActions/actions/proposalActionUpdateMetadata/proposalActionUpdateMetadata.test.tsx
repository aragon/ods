import { fireEvent, render, screen } from '@testing-library/react';
import { modulesCopy } from '../../../../../assets';
import { type IProposalActionUpdateMetadata } from '../../proposalActionsTypes';
import { generateProposalActionUpdateMetadata } from '../generators/proposalActionUpdateMetadata';
import { type IProposalActionUpdateMetadataProps, ProposalActionUpdateMetadata } from './proposalActionUpdateMetadata';

describe('<ProposalActionUpdateMetadata /> component', () => {
    const createTestComponent = (props?: Partial<IProposalActionUpdateMetadata>) => {
        const defaultProps: IProposalActionUpdateMetadataProps = {
            action: generateProposalActionUpdateMetadata(props),
        };

        return <ProposalActionUpdateMetadata {...defaultProps} />;
    };

    it('renders the ToggleGroup component', () => {
        render(createTestComponent());
        expect(screen.getByText('Existing')).toBeInTheDocument();
        expect(screen.getByText('Proposed')).toBeInTheDocument();
    });

    it('renders the correct terms', () => {
        render(createTestComponent());
        expect(screen.getByText(modulesCopy.proposalActionsUpdateMetadata.logoTerm)).toBeInTheDocument();
        expect(screen.getByText(modulesCopy.proposalActionsUpdateMetadata.linkTerm)).toBeInTheDocument();
        expect(screen.getByText(modulesCopy.proposalActionsUpdateMetadata.nameTerm)).toBeInTheDocument();
    });

    it('renders the correct existing metadata', () => {
        const proposedMetadata = {
            logo: 'proposed-logo.png',
            name: 'Proposed Name',
            links: [
                { label: 'Proposed Link 1', href: 'https://proposed-link1.com', target: '_blank' },
                { label: 'Proposed Link 2', href: 'https://proposed-link2.com', target: '_blank' },
            ],
        };

        const existingMetadata = {
            logo: 'existing-logo.png',
            name: 'Existing Name',
            links: [
                { label: 'Existing Link 1', href: 'https://existing-link1.com', target: '_blank' },
                { label: 'Existing Link 2', href: 'https://existing-link2.com', target: '_blank' },
            ],
        };

        render(createTestComponent({ proposedMetadata, existingMetadata }));

        expect(screen.getByText('Existing Name')).toBeInTheDocument();
        expect(screen.getByText('Existing Link 1')).toBeInTheDocument();
        expect(screen.getByText('Existing Link 2')).toBeInTheDocument();

        fireEvent.click(screen.getByText('Proposed'));

        expect(screen.getByText('Proposed Name')).toBeInTheDocument();
        expect(screen.getByText('Proposed Link 1')).toBeInTheDocument();
        expect(screen.getByText('Proposed Link 2')).toBeInTheDocument();
    });
});
