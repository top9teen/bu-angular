import { ReportConclusionComponent } from '../feature/report-conclusion/report-conclusion.component';
import { AgmCoreModule, MouseEvent } from '@agm/core';
import { Component, NgModule, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { routerTransition } from 'src/app/router.animations';
import * as Config from '../../../shared/config/constants';
import { ApiServiceModule } from '../../api-service/api-service.module';
// tslint:disable-next-line: max-line-length
import { AssessmentGroupModel, DataCriterionDetail, DataGoogleDetail, DataGoogleMapRespModel, InspectionModel, InspectionModelModule } from '../../model/inspection-model/inspection-model';
import { ReportInfoService } from '../feature/info/report-info.service';
import { ReportallFeatureComponent } from '../feature/reportall-feature/reportall-feature.component';
@Component({
  selector: 'app-report-all',
  templateUrl: './report-all.component.html',
  styleUrls: ['./report-all.component.scss'],
  animations: [routerTransition()]
})

@NgModule({
  declarations: [],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA7X9xHkQYWB9cD2XK088A_VT_CE4vCsQM'
    })

  ]
})


export class ReportAllComponent implements OnInit {

  @ViewChild(ReportallFeatureComponent) reportAllFeatureComponent: ReportallFeatureComponent;
  @ViewChild(ReportConclusionComponent) reportConclusionComponent: ReportConclusionComponent;
  constructor(
    private apiService: ApiServiceModule,
    private fb: FormBuilder,
    private inspectionModelModule: InspectionModelModule,
    public router: Router,
    public reportInfoService: ReportInfoService,
    // tslint:disable-next-line: deprecation
    private http: Http) {
    this.onLoadData();
  }

  // check page report all
  checkpage1: boolean;
  checkpage2: boolean;
  checkpage3: boolean;
  checkpage2_1: boolean;

  dataGoogleMapRespModel: DataGoogleMapRespModel;
  dataGoogleDetails: DataGoogleDetail[] = [];
  dataCriterionDetails: DataCriterionDetail[] = [];
  pdfURL: String;
  lat = 14.634577;
  lng = 102.787655;
  markers: marker[] = [
    {
      lat: 51.673858,
      lng: 7.815982,
      label: 'A',
      draggable: true
    },
    {
      lat: 51.373858,
      lng: 7.215982,
      label: 'B',
      draggable: false
    },
    {
      lat: 51.723858,
      lng: 7.895982,
      label: 'C',
      draggable: true
    }
  ];

  zoom = 13;
  inspectionModels?: Array<InspectionModel> = [];
  assessModels?: Array<AssessmentGroupModel> = [];
  inspectionId?: String;
  dateStart?: String;
  dateEnd?: String;
  community?: String;
  lavel?: String;

  inspectionForm: FormGroup = this.fb.group({
    inspectionId: this.fb.control('', Validators.required),
    dateStart: this.fb.control('', Validators.required),
    dateEnd: this.fb.control('', Validators.required),
    community: this.fb.control('', Validators.required),
    lavel: this.fb.control('', Validators.required)
  });
  public barChartLabels: string[] = [

  ];

  // bar chart
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartType: string;
  public barChartLegend: boolean;

  public barChartData: any[] = [
    { data: [] },
  ];

  // Doughnut
  public doughnutChartLabels: string[] = [
    'Download Sales',
    'In-Store Sales',
    'Mail-Order Sales'
  ];
  public doughnutChartData: number[] = [350, 450, 100];
  public doughnutChartType: string;
  // Radar
  public radarChartLabels: string[] = [
    'Eating',
    'Drinking',
    'Sleeping',
    'Designing',
    'Coding',
    'Cycling',
    'Running'
  ];
  public radarChartData: any = [
    { data: [65, 59, 90, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 96, 27, 100], label: 'Series B' }
  ];
  public radarChartType: string;

  // Pie
  public pieChartLabels: string[] = [
    'Download Sales',
    'In-Store Sales',
    'Mail Sales'
  ];
  public pieChartData: number[] = [300, 500, 100];
  public pieChartType: string;

  // PolarArea
  public polarAreaChartLabels: string[] = [
    'Download Sales',
    'In-Store Sales',
    'Mail Sales',
    'Telesales',
    'Corporate Sales'
  ];
  public polarAreaChartData: number[] = [300, 500, 100, 40, 120];
  public polarAreaLegend: boolean;

  public polarAreaChartType: string;

  // lineChart
  public lineChartData: Array<any> = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
    { data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C' }
  ];
  public lineChartLabels: Array<any> = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July'
  ];
  public lineChartOptions: any = {
    responsive: true
  };
  public lineChartColors: Array<any> = [
    {
      // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    {
      // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    {
      // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend: boolean;
  public lineChartType: string;

  markerDragEnd(m: marker, $event: MouseEvent) {
    this.lat = $event.coords.lat;
    this.lng = $event.coords.lng;
  }

  onLoadData() {
    this.apiService.getListInspection().subscribe(
      () => {
        this.inspectionModels = this.inspectionModelModule._inspectionModels;
      }, (err) => {
        console.log('error -> ', err);
      });
  }

  async loadData() {
    this.barChartLabels = [];
    this.dataGoogleDetails = [];
    this.dataCriterionDetails = [];
    this.checkURL();
    this.reportInfoService.setallDataInfo(null);
    await this.http.post(Config.API_ASSESS_URL + 'get-datamap', this.inspectionForm.value)
      .subscribe(async persons => {
        // console.log('this.dataGoogleDetails.length -> ', this.dataGoogleDetails.length);
        this.dataGoogleMapRespModel = this.extractData(persons);
        this.dataCriterionDetails = this.dataGoogleMapRespModel.dataCriterionDetails;
        this.dataGoogleDetails = this.dataGoogleMapRespModel.dataGoogleDetails;

        this.pdfURL = Config.API_ASSESS_URL + 'print-report/';
        if (this.dataGoogleDetails.length > 0) {
          this.reportInfoService.setallDataInfo(this.dataGoogleDetails);
          if (this.checkpage2) {
            await this.reportAllFeatureComponent.ngOnInit();
          } else if (this.checkpage3) {
            await this.reportConclusionComponent.onLoadData();
          }
        } else {
          if (this.checkpage2) {
            await this.reportAllFeatureComponent.ngOnInit();
          } else if (this.checkpage3) {
            await this.reportConclusionComponent.onLoadData();
          }
        }
      }, (err) => {
        console.log('error -> ', err);
      });
  }
  // tslint:disable-next-line: deprecation
  extractData(res: Response) {
    const body = res.json();
    // console.log('error -> ', res);
    return body.data || {};
  }

  // events
  public chartClicked(e: any): void {
    // console.log(e);
  }

  public chartHovered(e: any): void {
    // console.log(e);
  }

  public randomize(): void {
    // Only Change 3 values
    const data = [
      Math.round(Math.random() * 100),
      59,
      80,
      Math.random() * 100,
      56,
      Math.random() * 100,
      40
    ];
    const clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = data;
    this.barChartData = clone;
    /**
     * (My guess), for Angular to recognize the change in the dataset
     * it has to change the dataset variable directly,
     * so one way around it, is to clone the data, change it and then
     * assign it;
     */
  }



  ngOnInit() {
    this.checkURL();
    console.log(this.router.url);
    this.reportInfoService.setallDataInfo(null);
    this.barChartType = 'bar';
    this.barChartLegend = true;
    this.doughnutChartType = 'doughnut';
    this.radarChartType = 'radar';
    this.pieChartType = 'pie';
    this.polarAreaLegend = true;
    this.polarAreaChartType = 'polarArea';
    this.lineChartLegend = true;
    this.lineChartType = 'line';
  }

  checkURL() {
    this.checkpage1 = false;
    this.checkpage2 = false;
    this.checkpage3 = false;
  switch (this.router.url) {
    case '/form-assess/report-all/page1':
      this.checkpage1 = true;
      this.checkpage2 = false;
      this.checkpage3 = false;
    break;
    case '/form-assess/report-all/page2':
      this.checkpage2 = true;
      this.checkpage1 = false;
      this.checkpage3 = false;
    break;
    case '/form-assess/report-all/page3':
      this.checkpage3 = true;
      this.checkpage1 = false;
      this.checkpage2 = false;
    break;
    default:
      this.checkpage1 = false;
      this.checkpage2 = false;
      this.checkpage3 = false;
      break;
  }
  }
}

interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
