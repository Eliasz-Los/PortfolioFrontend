import {FullName} from './types/FullName';
import {Location} from './types/Location';

export interface PatientDto{
  id: string;
  fullName: FullName;
  dateOfBirth: string;
  email: string;
  phoneNumber: string;
  location: Location;
}
