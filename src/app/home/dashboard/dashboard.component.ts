import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { Subscription } from 'rxjs';
import { environment } from '../../../environments/environment';
import { DataService } from '../../core/data.service';
import { PrescriptionPicturesComponent } from '../../shared/components/prescription-pictures/prescription-pictures.component';
import { IDashboardInfo } from '../../shared/models/dashboard-info.model';
import { IPrescription } from '../../shared/models/prescription.model';
import { IGetPrescriptionsParameter } from '../../shared/models/prescriptions-parameter.model';
import { calculateElapsed, AutoUnsubscribe } from '../../shared/util-functions';

@AutoUnsubscribe
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  subscriptions: Subscription[] = [];

  constructor(private dataService: DataService, private dialog: MatDialog) { }

  dashboardInfo: IDashboardInfo = null;
  prescriptions: IPrescription[] = [];
  imagePath = environment.imgUrl;

  ngOnInit(): void {
    let sub = this.dataService.getDashboardInfo().subscribe(res => {
      this.dashboardInfo = res;

      let barData = [];
      for (let pharmacy of this.dashboardInfo.activePharmacies) {
        this.barChartLabels.push(pharmacy.name);
        barData.push(pharmacy.count);
      }
      this.barChartData = [{ data: barData, label: 'تعداد کل نسخه ها' }];

      let total = [], canceled = [], delivered = [];
      for (let day of this.dashboardInfo.dailyPrescriptions) {
        this.lineChartLabels.push(this.getDay(day.date));
        total.push(day.total);
        delivered.push(day.delivered);
        canceled.push(day.canceled);
      }
      this.lineChartData = [
        { data: total, label: 'تعداد کل نسخه ها' },
        { data: delivered, label: 'نسخه های تحویل شده' },
        { data: canceled, label: 'نسخه های منقضی شده' },
      ];

    });
    this.subscriptions.push(sub);

    let now = new Date();
    let lastWeek = new Date(now.getTime() - (7 * 86400 * 1000));
    let today = Date.UTC(lastWeek.getFullYear(), lastWeek.getMonth(), lastWeek.getDate());
    let from = new Date(today);
    const param: IGetPrescriptionsParameter = {
      dateFrom: from,
      dateTo: null,
      page: 0,
      patientId: null,
      pharmacyId: null,
      status: '1'
    };
    sub = this.dataService.getPrescriptions(param).subscribe(res => {
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
    });
    this.subscriptions.push(sub);
  }

  barChartOptions: ChartOptions = {
    responsive: true,
    scales: { xAxes: [{}], yAxes: [{}] }
  };
  barChartLabels: Label[] = [];
  barChartLegend = true;

  barChartData: ChartDataSets[] = [{ data: [], label: '' }];

  lineChartData: ChartDataSets[] = [{ data: [], label: '' }];
  lineChartLabels: Label[] = [];
  lineChartOptions: ChartOptions = {
    responsive: true,
    scales: { xAxes: [{}], yAxes: [{}] }
  };
  lineChartColors: Color[] = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // green
      backgroundColor: 'rgba(0,83,0,0.2)',
      borderColor: 'rgba(0,83,0,1)',
      pointBackgroundColor: 'rgba(0,83,0,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(255,0,0,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  lineChartLegend = true;

  private getDay(date: string) {
    let num = new Date(date).getDay();
    return this.weekDays[num];
  }

  private weekDays = ['یک شنبه', 'دوشنبه', 'سه شنبه', 'چهارشنبه', 'پنج شنبه', 'جمعه', 'شنبه'];

  showImages(prescription: IPrescription) {
    this.dialog.open(PrescriptionPicturesComponent, {
      data: prescription
    });
  }
}
