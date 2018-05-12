import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, DateTime } from 'ionic-angular';
import { TrainingMapPage } from '../trainings/training.map.component';
import { TrainingsService } from '../../providers/trainings/trainings.service';
import { TrainingModel } from '../../models/TrainingModel';

import * as moment from 'moment';

@Component({
    selector: 'page-trainings',
    templateUrl: 'trainings.component.html'
})

export class TrainingsPage implements OnInit {

    futureTraining: TrainingModel = null;
    daysLeft: number = 0;

    //DI for contructor
    constructor(
        public navCtrl: NavController,
        public loadingCtrl: LoadingController,
        private trainingsService: TrainingsService) {
    }

    //load all trainings with oninit function
    ngOnInit() {
        this.getFutureTraining();
    }

    doRefresh(refresher) {

        this.trainingsService.getFutureTraining()
            .subscribe(
                success => {
                    this.futureTraining = success;
                    this.calculateDaysLeft(this.futureTraining.dateTime);
                    refresher.complete();
                },
                error => {
                    //TODO:
                });
    }

    getFutureTraining(): void {
        let loading = this.loadingCtrl.create({
            content: 'Please wait...',
            showBackdrop: true,
            spinner: 'bubbles'
        });
        loading.present();

        this.trainingsService.getFutureTraining()
            .subscribe(
                success => {
                    this.futureTraining = success;
                    this.calculateDaysLeft(this.futureTraining.dateTime);
                    loading.dismiss();
                },
                error => {
                    //TODO:
                });
    }

    goToMap(routeId: number) {
        this.navCtrl.push(TrainingMapPage, {
            "routeId": routeId
        });
    }

    calculateDaysLeft(futureDate: DateTime) {
        //put defaults
        this.daysLeft = 0;

        let dl = -moment().diff(moment(futureDate.toLocaleString()), 'days', false); //make it - since it substracts a future date from today.
        if (dl > 0) {
            this.daysLeft = dl;
        }
    }


    // will be needed in the events page.
    // loadMoreTraining(): void {
    //     this.trainingsService.getTrainings() //pass this.lastDateTime
    //         .subscribe(
    //             success => {
    //                 this.pastTrainings.push(...success);
    //             });
    // }

    // doInfinite(): Promise<any> {
    //     console.log('Begin async operation');

    //     return new Promise((resolve) => {
    //         setTimeout(() => {
    //             this.loadMoreTraining();
    //             console.log('Async operation has ended');
    //             resolve();
    //         }, 1000);
    //     });
    // }



    // TODO: Pull to Refresh


    // //functions
    // //getTrainings => assign class variables using api service
    // getTrainingsHttp(): void {
    //     this.trainingsService.getTrainingsResponse()
    //         // resp is of type `HttpResponse<ITraining[]>`
    //         .subscribe(  //subscribe triggers HttpRequest
    //             //next handler
    //             resp => {
    //                 //read headers
    //                 const keys = resp.headers.keys();
    //                 this.headers = keys.map(key =>
    //                     `${key}: ${resp.headers.get(key)}`);

    //                 //access the body directly which is typed as ITraining[]
    //                 this.allTrainings = { ...resp.body };  //clone data object.

    //                 // if (this.allTrainings != null) {
    //                 //     this.currentTraining = this.allTrainings[0];
    //                 //     if (this.allTrainings.length > 1) {
    //                 //         this.pastTrainings = this.allTrainings.slice(1);
    //                 //     }
    //                 // }
    //             },
    //             //error handler
    //             error => { console.error('Observer got an error handles in the server and defined in the response') },
    //             //complete handler
    //             () => { console.log('Observer got a complete notification') }
    //         );
    // }

    // getTrainings(): void {
    //     this.trainingsService.getTrainings()
    //         .subscribe(
    //             success => {
    //                 this.allTrainings = success;
    //                 if (this.allTrainings != null) {
    //                     this.futureTraining = this.allTrainings[0];
    //                     if (this.allTrainings.length > 1) {
    //                         this.pastTrainings = this.allTrainings.slice(1);
    //                         //  this.lastDateTime = this.pastTrainings[this.pastTrainings.length - 1].dateTime.pickerFormat;
    //                     }
    //                 }
    //             },
    //             error => {

    //             });
    // }



}