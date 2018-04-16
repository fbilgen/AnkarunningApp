import { Component } from '@angular/core'
import { NavController } from 'ionic-angular'
import { NavParams } from 'ionic-angular/navigation/nav-params';

@Component({
    selector: 'page-photo.map',
    templateUrl: 'photo.html'
})

export class PhotoPage{
    constructor(public navCtrl: NavController, params: NavParams) {
        this.myPhoto = params.get('myPhoto');
    }
    myPhoto: string;

    photoCurrent: any = { date: 'December 02, 2017', time: '08:30', name: 'Eymir Lake Run' }

}