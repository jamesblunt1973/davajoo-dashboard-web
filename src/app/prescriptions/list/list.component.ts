import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { DataService } from '../../core/data.service';
import { PrescriptionPicturesComponent } from '../../shared/components/prescription-pictures/prescription-pictures.component';
import { IPatient } from '../../shared/models/patient.model';
import { IPharmacy } from '../../shared/models/pharmacy.model';
import { IPrescription } from '../../shared/models/prescription.model';
import { IGetPrescriptionsParameter } from '../../shared/models/prescriptions-parameter.model';
import { calculateElapsed, AutoUnsubscribe } from '../../shared/util-functions';

@AutoUnsubscribe
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  subscriptions: Subscription[] = [];
  pharmacies$ = new Observable<IPharmacy[]>();
  patients$ = new Observable<IPatient[]>();
  prescriptions: IPrescription[] = [];
  totalCount = 0;
  filterForm: FormGroup;
  loading = false;
  imagePath = environment.imgUrl;

  constructor(private fb: FormBuilder, private dataService: DataService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      dateFrom: null,
      dateTo: null,
      pharmacy: null,
      patient: null,
      status: null
    });

    this.filterForm.get('pharmacy').valueChanges.pipe(
      tap(res => {
        if (res.length <= 2)
          this.pharmacies$ = null;
      })
      , filter(res => res.length > 2)
      , debounceTime(1000)
      , distinctUntilChanged()
    ).subscribe((text: string) => {
      this.pharmacies$ = this.dataService.getPharmacies(text);
    });

    this.filterForm.get('patient').valueChanges.pipe(
      tap(res => {
        if (res.length <= 2)
          this.patients$ = null;
      })
      , filter(res => res.length > 2)
      , debounceTime(1000)
      , distinctUntilChanged()
    ).subscribe((text: string) => {
      this.patients$ = this.dataService.getPatients(text);
    });
  }

  getReport(page: number) {
    let formValue = this.filterForm.value;
    let dateFrom: Date = null, dateTo: Date = null;

    // we should send date as GMT, but date picker format is UTC
    if (formValue.dateFrom) { // UTC to GMT
      const d = new Date(formValue.dateFrom);
      const t = Date.UTC(d.getFullYear(), d.getMonth(), d.getDate());
      dateFrom = new Date(t);
    }

    if (formValue.dateTo) { // UTC to GMT
      const d = new Date(formValue.dateTo);
      const t = Date.UTC(d.getFullYear(), d.getMonth(), d.getDate());
      dateTo = new Date(t);
    }

    let filterModel: IGetPrescriptionsParameter = {
      dateFrom: dateFrom,
      dateTo: dateTo,
      patientId: formValue.patient && formValue.patient.id ? +formValue.patient.id : null,
      pharmacyId: formValue.pharmacy && formValue.pharmacy.id ? +formValue.pharmacy.id : null,
      status: formValue.status,
      page: page
    };
    this.loading = true;
    this.prescriptions = [];

    let sub = this.dataService.getPrescriptions(filterModel).subscribe(res => {
      this.prescriptions = res.map(a => {
        a.elapsed = calculateElapsed(a.createDate);
        if (a.otc) {
          let items = [];
          JSON.parse(a.otc.toString()).map(item => {
            items.push(item.drugName);
          });
          a.otc = items;
        }
        return a;
      });
      if (this.prescriptions.length > 0)
        this.totalCount = this.prescriptions[0].totalCount;
      this.loading = false;
    });
    this.subscriptions.push(sub);
  }

  getPharmacyName(pharmacy?: IPharmacy): string | undefined {
    return pharmacy ? pharmacy.name : undefined;
  }

  getPatientName(patient?: IPatient): string | undefined {
    return patient ? patient.name : undefined;
  }

  showImages(prescription: IPrescription) {
    this.dialog.open(PrescriptionPicturesComponent, {
      data: prescription
    });
  }

}
