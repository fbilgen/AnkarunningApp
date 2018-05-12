import { Component, ViewChild } from '@angular/core'
import { NavController} from 'ionic-angular'
import { GoogleMap, GoogleMapOptions, GoogleMaps, GoogleMapsEvent } from '@ionic-native/google-maps';
import { DatePipe } from '@angular/common';

import { RouteModel } from '../../../models/RouteModel';
import { RoutesService } from '../../../providers/trainings/routes.service';


// @Component({
//     selector: 'page-routes',
//     templateUrl: 'routes.component.html'
// })

export class RoutesPage {

    //declare maps
    avm: GoogleMap;
    lake: GoogleMap;
    forest: GoogleMap;
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
                    this.loadMapPhotos(this.routes);
                });
    };


    loadMapPhotos(routes: RouteModel[]): void {
        //local variables
        let mapOptions: GoogleMapOptions = null;

        routes.forEach(route => {
            mapOptions = {
                camera: {
                    target: {
                        lat: route.latitude,
                        lng: route.longitude
                    },
                    zoom: 14,
                    tilt: 30,
                }
            };

            //create correct map based on remote data
            if (route.name.toLocaleLowerCase().includes("avm")) {
                this.avm = GoogleMaps.create(document.getElementById("avm"), mapOptions);
                this.loadMap(this.avm, route);
            } else if (route.name.toLocaleLowerCase().includes("orman")) {
                this.forest = GoogleMaps.create(document.getElementById("forest"), mapOptions);
                this.loadMap(this.forest, route);
            } else {
                this.lake = GoogleMaps.create(document.getElementById("lake"), mapOptions);
                this.loadMap(this.lake, route);
            }

        });
    }

    loadMap(map: GoogleMap, route: RouteModel) {

        // Wait the MAP_READY before using any methods.
        map.one(GoogleMapsEvent.MAP_READY)
            .then(
                (success) => {
                    // Now you can use all methods safely.
                    map.addMarker({
                        icon: '#FD8008',
                        position: {
                            lat: route.latitude,
                            lng: route.longitude
                        }
                    });

                    const kmlUrl = "http://ankarunning.eu-west-1.elasticbeanstalk.com/Home/DownloadRoute?routeId="

                    map.addKmlOverlay({
                        'url': kmlUrl + route.id,
                        'clickable': false,
                        'suppressInfoWindows': false
                    });
                },
                (error) => {
                    //TODO:
                });
    }








}
