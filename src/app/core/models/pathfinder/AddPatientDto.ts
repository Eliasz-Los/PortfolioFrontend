import {FullName} from './types/FullName';
import {Location} from './types/Location';

export interface AddPatientDto{
  fullName : FullName;
  dateOfBirth : string;
  email : string;
  phoneNumber : string;
  location : Location;
}
