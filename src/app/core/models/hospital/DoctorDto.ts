import {Name} from './types/Name';
import {Specialisation} from './types/Specialisation';
import {Location} from './types/Location';

export interface DoctorDto {
  id: string;
  fullName: Name;
  specialisation: string;
  workAddress: Location;
}
