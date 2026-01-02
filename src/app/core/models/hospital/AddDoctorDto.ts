import {Name} from './types/Name';
import {Specialisation} from './types/Specialisation';
import {Location} from './types/Location';

export interface AddDoctorDto {
   fullName: Name;
   specialisation: Specialisation;
   workAddress: Location;
}
