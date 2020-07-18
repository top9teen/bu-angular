import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { routerTransition } from 'src/app/router.animations';
import * as Config from '../../../shared/config/constants';
import { ApiServiceModule } from '../../api-service/api-service.module';
import { AssessModel, CriterionModel, CriterionRespModel, InspectionModel, InspectionModelModule } from '../../model/inspection-model/inspection-model';
import { ReportInfoService } from '../feature/info/report-info.service';
import { ReportFeatureComponent } from '../feature/report-feature/report-feature.component';
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  animations: [routerTransition()]
})
export class ReportComponent implements OnInit {

  @ViewChild(ReportFeatureComponent) reportFeatureComponent: ReportFeatureComponent;

  constructor(
    private apiService: ApiServiceModule,
    private fb: FormBuilder,
    private inspectionModelModule: InspectionModelModule,
    public router: Router,
    public reportInfoService :ReportInfoService,
    private http: Http) {
      this.onLoadData();
      this.pdfURL =  Config.API_ASSESS_URL + 'print-report/';
  }
  inspectionModels?: Array<InspectionModel> = [];
  assessModels: AssessModel[] = [];
  inspectionId?: String;
  pdfURL?: String;

  criterions: Array<CriterionModel> = [];
  criterionModel: CriterionRespModel;

  inspectionForm: FormGroup = this.fb.group({
    inspectionId: this.fb.control('', Validators.required),
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

  onLoadData() {
    this.apiService.getListInspection().subscribe(
      () => {
        this.inspectionModels = this.inspectionModelModule._inspectionModels;
      }, (err) => {
        console.log('error -> ', err);
      });

  }

  getCriterion() {
      this.apiService.getCriterionByInspectionId(this.inspectionId).subscribe(
        () => {
           this.criterionModel = this.inspectionModelModule._criterionRespModel;
           this.criterions = this.criterionModel.criterionModels;
        }, (err) => {
          console.log('error -> ', err);
        });

  }

  public loadData(): void {
    this.barChartLabels = [];
    this.assessModels  = [];
    this.inspectionId = this.inspectionForm.value.inspectionId;
    const userId = localStorage.getItem('userId');
    const data = [];
    this.http.get(Config.API_ASSESS_URL + 'get-assessment-by-userId/'  + userId +'/'+ this.inspectionId)
    .subscribe(persons => {
      // this.inspectionModelModule.setAssessModel(persons);
      this.assessModels = this.extractData(persons);

      for (let i = 0; i < this.assessModels.length; i++) {
         const lab: String = this.assessModels[this.assessModels.length - (i + 1)].createDate;
         const d = this.assessModels[this.assessModels.length - (i + 1)].criterionTotal;
         this.barChartLabels.push(String(lab));
         data.push(d);
      }
      this.reportInfoService.setDataInfo(this.assessModels);
      this.reportFeatureComponent.ngOnInit();
      const clone = JSON.parse(JSON.stringify(this.barChartData));
      clone[0].data = data;
      this.barChartData = clone;
    }, (err) => {
    console.log('error -> ', err);
    });
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


getAssess(userId: String, inspectionId: String) {
   return this.http.get(Config.API_ASSESS_URL + '/get-profile-list-by-role/' + '3')
    .subscribe(persons => {
      this.inspectionModelModule.setAssessModel(persons);
  });
}

extractData(res: Response) {
  const body = res.json();
  return body.data || {};
}

ngOnInit() {
    this.reportInfoService.setDataInfo(null);
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


}
