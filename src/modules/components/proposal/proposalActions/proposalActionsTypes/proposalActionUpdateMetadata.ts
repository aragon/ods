import { type IProposalAction } from "./proposalAction";
import { type ProposalActionType } from "./ProposalActionType";

export interface IMetadataLink {
  /**
  * Human readable label for link
  */
  label: string;
  /**
  * link href
  */
  href: string;
}

export interface IMetaData {
  /**
  * metadata logo url
  */
  logo: string;
  /**
  * Metadata name
  */
  name: string;
  /**
  * Array of metadata links
  */
  links: IMetadataLink[]
}

export interface IProposalActionUpdateMetadata extends IProposalAction {
  /**
  * UpdateMetadata action
  */
  type: ProposalActionType.UPDATE_METADATA
  /**
  * proposed metadata
  */
  proposedMetadata: IMetaData
  /**
  * proposed metadata
  */
  previousMetadata: IMetaData
}
