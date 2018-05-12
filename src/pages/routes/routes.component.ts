import { Component, ViewChild } from '@angular/core'
import { NavController } from 'ionic-angular'
import { DatePipe } from '@angular/common';

import { RouteModel } from '../../models/RouteModel';
import { RoutesService } from '../../providers/trainings/routes.service';


@Component({
    selector: 'page-routes',
    templateUrl: 'routes.component.html'
})

export class RoutesPage {

    //declaration
    routes: RouteModel[] = null;


    //DI for contructor
    constructor(
        public navCtrl: NavController,
        private routesService: RoutesService) {
    }

    //called when DOM has been loaded and before page is shown
    ionViewDidLoad() {
        this.getRoutes();

    }

    getRoutes(): void {
        //call service with string routeId
        this.routesService.getRoutes()
            .subscribe(
                success => {
                    this.routes = success;
                    
                   
                    //after getting route data, create maps
                    //this.loadMapPhotos(this.routes);
                });
    };



}
