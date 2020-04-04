import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import {UserService, UserModel}  from '../../shared/guard/user.service';
import { HomeModel, ViewDataHomeModel, SumInspectionModel} from '../model/home-model/home-model';
import {ApiServiceModule} from'../api-service/api-service.module';
import { AgmCoreModule} from '@agm/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    animations: [routerTransition()]
})
export class HomeComponent implements OnInit {

    public alerts: Array<any> = [];
    public sliders: Array<any> = [];
    public userModeil: UserModel;
    public role: String;
    public sumInspectionModels: Array<SumInspectionModel> = [];
    public countUserTotal: String;
    constructor(
        userservice: UserService,
        homeModel: HomeModel,
        apiService: ApiServiceModule
    ) {
        this.sliders.push(
            {
                imagePath: 'assets/images/11.png',
                // label: 'First slide label',
                // text:
                //     'Nulla vitae elit libero, a pharetra augue mollis interdum.'
            },
            {
                imagePath: 'assets/images/12.png',
                // label: 'Second slide label',
                // text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
            },
            {
                imagePath: 'assets/images/13.png',
                // label: 'Third slide label',
                // text:
                //     'Praesent commodo cursus magna, vel scelerisque nisl consectetur.'
            }
        );

        this.alerts.push(
            {
                id: 1,
                type: 'success',
                message: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptates est animi quibusdam praesentium quam, et perspiciatis,
                consectetur velit culpa molestias dignissimos
                voluptatum veritatis quod aliquam! Rerum placeat necessitatibus, vitae dolorum`
            },
            {
                id: 2,
                type: 'warning',
                message: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptates est animi quibusdam praesentium quam, et perspiciatis,
                consectetur velit culpa molestias dignissimos
                voluptatum veritatis quod aliquam! Rerum placeat necessitatibus, vitae dolorum`
            }
        );

        this.userModeil = userservice._userModel;
        this.role = this.userModeil.role;

            apiService.getHomeViewData().subscribe(
            () => {
                this.sumInspectionModels = homeModel._viewDataHomeModel.inspectionModels;
                this.countUserTotal = homeModel._viewDataHomeModel.countUserTotal;
            }, (err) => {
              console.log('error -> ', err);
            });


    }

    ngOnInit() {}

    public closeAlert(alert: any) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }

}
