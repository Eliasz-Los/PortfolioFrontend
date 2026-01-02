import {Point} from './Point';

export interface PathRequest {
  start: Point;
  end: Point;
  floorplanName: string;
  floorNumber: number;
}
