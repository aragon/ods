import { type IProposalActionUpdateMetadata, ProposalActionType } from "../../proposalActionsTypes";

export const generateProposalActionUpdateMetadata = (action?: Partial<IProposalActionUpdateMetadata>): IProposalActionUpdateMetadata => ({
  contractAddress: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
  from: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
  to: '0x3f5CE5FBFe3E9af3971dD833D26BA9b5C936F0bE',
  data: '',
  value: '1',
  inputData: {
    function: 'Update Metadata',
    contract: 'Ether',
    parameters: [
      { type: 'address', value: '0x3f5CE5FBFe3E9af3971dD833D26BA9b5C936F0bE' },
      { type: 'uint256', value: '1000000000000000000' },
    ],
  },
  type: ProposalActionType.UPDATE_METADATA,
  previousMetadata: {
    logo: 'https://i.pravatar.cc/300',
    name: 'Old name',
    links: [
      { label: 'Link 1', href: '' },
      { label: 'Link 2', href: '' }
    ]
  },
  proposedMetadata: {
    logo: 'https://i.pravatar.cc/300',
    name: 'New name',
    links: [
      { label: 'Link 1', href: '' },
      { label: 'Link 2', href: '' },
      { label: 'Link 3', href: '' }
    ]
  },
  ...action
})
