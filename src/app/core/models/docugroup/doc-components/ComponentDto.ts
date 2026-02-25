import {ComponentType} from './ComponentType';

export interface ComponentDto {
  id: string;
  order: number;
  lastPublishedContentJson: string;
  componentType: ComponentType;
  groupDocumentId: string;
}
