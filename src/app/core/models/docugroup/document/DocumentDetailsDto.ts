import {ComponentDto} from '../doc-components/ComponentDto';

export interface DocumentDetailsDto {
  id: string;
  title: string;
  lastPublishedAtUtc: string;
  lastPublishedByUserId: string;
  components: ComponentDto[];
}
