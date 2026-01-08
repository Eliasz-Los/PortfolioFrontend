import {Name} from './types/Name';
import {Location} from './types/Location';

export interface AddPatientDto{
  fullName : Name;
  dateOfBirth : string;
  email : string;
  phoneNumber : string;
  location : Location;
}
