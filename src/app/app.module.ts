import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { MyApp } from './app.component';

import { TabsPage } from '../pages/tabs/tabs';
import { ClubPage } from '../pages/club/club.component';
import { EventsPage } from '../pages/events/events';
import { TrainingsPage } from '../pages/trainings/trainings.component';
import { RoutesPage } from '../pages/routes/routes.component';
import { ContactPage } from '../pages/contact/contact.component';
import { TrainingMapPage } from '../pages/trainings/training.map.component';
import { TrainingsService } from '../providers/trainings/trainings.service';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GoogleMaps} from '@ionic-native/google-maps';
import { RoutesService } from '../providers/trainings/routes.service';
import { MomentModule } from 'angular2-moment';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AppAvailability } from '@ionic-native/app-availability';
import { CallNumber } from '@ionic-native/call-number';


@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    ClubPage,
    EventsPage,
    TrainingsPage,
    RoutesPage,
    ContactPage,
    TrainingMapPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    MomentModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    ClubPage,
    EventsPage,
    ContactPage,
    TrainingsPage,
    RoutesPage,
    TrainingMapPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GoogleMaps,
    InAppBrowser,
    AppAvailability,
    CallNumber,
    TrainingsService,
    RoutesService
  ]
})
export class AppModule {}
