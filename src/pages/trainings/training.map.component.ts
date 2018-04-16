import { Component, ViewChild, OnInit } from '@angular/core'
import { NavController, NavParams } from 'ionic-angular'
import { GoogleMap, GoogleMapOptions, GoogleMaps, GoogleMapsEvent } from '@ionic-native/google-maps';
import { InAppBrowser } from '@ionic-native/in-app-browser'
import { RouteModel } from '../../models/RouteModel';
import { RoutesService } from '../../providers/trainings/routes.service';

@Component({
  selector: 'page-training.map',
  templateUrl: 'training.map.component.html'
})

export class TrainingMapPage {

  route : RouteModel = null;
  routeId: number;
  map: GoogleMap;

  @ViewChild('mapcontent') element;


  constructor(
    private navParams: NavParams,
    private iab: InAppBrowser,
    private routesService: RoutesService) {
    this.routeId = navParams.get('routeId');
  }


  getRoute(): void {
    //call service with string routeId
    this.routesService.getRoute(this.routeId.toString())
      .subscribe(
        success => {
          this.route = success;
          this.loadMap(this.route);
        })
  };


  // //called when DOM has been loaded and before page is shown
  ionViewDidLoad() {
    this.getRoute();
  }

  loadMap(route: RouteModel): void {

    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: route.latitude,
          lng: route.longitude
        },
        zoom: 14,
        tilt: 30,
      }
    };

    this.map = GoogleMaps.create(this.element.nativeElement, mapOptions);

    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {

        // Now you can use all methods safely.
        this.map.addMarker({
          icon: '#FD8008',
          position: {
            lat: route.latitude,
            lng: route.longitude
          }
        }).then((marker) => {
          
          marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {

            //if app exists open, no open browser
            this.iab.create('https://www.google.com/maps/search/?api=1&query=' + this.route.latitude + ',' + this.route.longitude);
            //let mapapp = this.iab.create('maps://?q=' + this.route.latitude + ',' + this.route.longitude, '_system');
          });

        });

        const kmlUrl = "http://ankarunning.eu-west-1.elasticbeanstalk.com/Home/DownloadRoute?routeId="

        this.map.addKmlOverlay({
          'url': kmlUrl + this.routeId,
          'clickable': false,
          'suppressInfoWindows': false
        });

      },
        error => {
          //TODO:
        });

  };


}






