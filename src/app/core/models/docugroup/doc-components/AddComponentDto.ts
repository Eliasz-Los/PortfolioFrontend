import {ComponentType} from './ComponentType';

export interface AddComponentDto {
  lastPublishedContentJson: string;
  componentType: ComponentType;
  groupDocumentId: string;
}
