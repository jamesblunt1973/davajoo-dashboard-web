import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { environment } from '../../environments/environment';
import { IDashboardInfo } from '../shared/models/dashboard-info.model';
import { IPatient } from '../shared/models/patient.model';
import { IPharmacy } from '../shared/models/pharmacy.model';
import { IPrescription } from '../shared/models/prescription.model';
import { IGetPrescriptionsParameter } from '../shared/models/prescriptions-parameter.model';

@Injectable()
export class DataService {

  constructor(private http: HttpClient) { }

  getDashboardInfo() {
    return this.http.get<IDashboardInfo>(environment.apiUrl + 'main');
  }

  getPrescriptions(data: IGetPrescriptionsParameter) {
    return this.http.post<IPrescription[]>(environment.apiUrl + 'prescriptions', data);
  }

  getPharmacies(str: string, page = 0) {
    return this.http.get<IPharmacy[]>(environment.apiUrl + `pharmacies?str=${str}&page=${page}`);
  }

  getPatients(str: string, page = 0) {
    return this.http.get<IPatient[]>(environment.apiUrl + `users?str=${str}&page=${page}`);
  }
}
