import {Name} from './types/Name';
import {Location} from './types/Location';

export interface PatientDto{
  id: string;
  fullName: Name;
  dateOfBirth: string;
  email: string;
  phoneNumber: string;
  location: Location;
}
