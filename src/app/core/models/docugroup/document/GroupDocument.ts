export interface GroupDocument {
  id: string;
  title: string;
  snapShotJson: string;
  lastPublishedAtUtc: string;
  lastPublishedByUserId: string;
  createdAtUtc: string;
  createdByUserId: string;
}
