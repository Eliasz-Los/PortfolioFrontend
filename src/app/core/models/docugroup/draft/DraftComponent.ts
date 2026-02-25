import {ComponentType} from '../doc-components/ComponentType';

export interface DraftComponent {
  id: string;
  order: number;
  componentType: ComponentType;
  lastPublishedContentJson?: string;
}
