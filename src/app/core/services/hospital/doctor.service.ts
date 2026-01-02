import {BaseService} from './base.service';
import {DoctorDto} from '../../models/hospital/DoctorDto';
import {AddDoctorDto} from '../../models/hospital/AddDoctorDto';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../env/environment';

export class DoctorService extends BaseService<DoctorDto, AddDoctorDto>{
  constructor( http: HttpClient) {
    super(http, `${environment.apiUrl}/hospital/doctors`);
  }
}
