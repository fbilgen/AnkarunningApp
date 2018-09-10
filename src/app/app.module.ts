import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { MyApp } from './app.component';

import { TabsPage } from '../app/tabs/tabs';
import { ClubPage } from '../app/club/club.component';
import { EventsPage } from '../app/events/events';
import { TrainingsPage } from '../app/trainings/trainings.component';
import { RoutesPage } from '../app/routes/routes.component';
import { ContactPage } from './contact/contact.component';
import { TrainingMapPage } from './trainings/training.map.component';
import { TrainingsService } from '../providers/trainings/trainings.service';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GoogleMaps } from '@ionic-native/google-maps';
import { RoutesService } from '../providers/trainings/routes.service';
import { MomentModule } from 'angular2-moment';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AppAvailability } from '@ionic-native/app-availability';
import { CallNumber } from '@ionic-native/call-number';
import { EmailComposer } from '@ionic-native/email-composer';


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
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    GoogleMaps,
    InAppBrowser,
    AppAvailability,
    CallNumber,
    EmailComposer,
    TrainingsService,
    RoutesService
  ]
})
export class AppModule { }
