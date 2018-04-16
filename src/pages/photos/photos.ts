import {Component} from '@angular/core'
import {NavController} from 'ionic-angular'

import { PhotoPage } from  '../photos/photo'



@Component({
    selector:'page-photos',
    templateUrl:'photos.html'
})


export class PhotosPage{
    constructor(public navCtrl:NavController){       
    }
    myPhoto: string = '';
    photos: Array<any> = [
        { num: 1, src:"./assets/images/Photos1.jpg"},
        { num: 2, src:"./assets/images/Photos1.jpg"},
        { num: 3, src:"./assets/images/Photos1.jpg" },
        { num: 4, src:"./assets/images/Photos1.jpg" },
        { num: 5, src:"./assets/images/Photos1.jpg" },
        { num: 6, src:"./assets/images/Photos1.jpg" },
        { num: 7, src:"./assets/images/Photos1.jpg" },
        { num: 8, src:"./assets/images/Photos1.jpg" },
        { num: 9, src:"./assets/images/Photos1.jpg" },
        { num: 10, src:"./assets/images/Photos1.jpg" },
        { num: 11, src:"./assets/images/Photos1.jpg" },
    ];



    //functions
    goToPhoto(id:string) {
        this.navCtrl.push(PhotoPage, { 'myPhoto': id});
    }
}