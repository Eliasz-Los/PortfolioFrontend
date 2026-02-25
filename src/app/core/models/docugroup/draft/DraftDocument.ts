import {DraftComponent} from './DraftComponent';

export interface DraftDocument {
  id: string;
  title: string;
  components: DraftComponent[];
}
