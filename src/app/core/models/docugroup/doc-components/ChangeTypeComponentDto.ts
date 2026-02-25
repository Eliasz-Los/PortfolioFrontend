import {ComponentType} from './ComponentType';

export interface ChangeTypeComponentDto {
  id: string;
  groupDocumentId: string;
  type: ComponentType;
  clearLastPublishedContent: boolean;
}
