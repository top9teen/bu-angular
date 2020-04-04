import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    constructor() {
    }
    lat = 51.678418;
    lng = 7.809007;
    ngOnInit() {
    }
}
