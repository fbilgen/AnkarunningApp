import { Component } from '@angular/core'
import { Platform } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AppAvailability } from '@ionic-native/app-availability';
import { CallNumber } from '@ionic-native/call-number';
import { EmailComposer } from '@ionic-native/email-composer';

@Component({
    selector: 'page-contact',
    templateUrl: 'contact.component.html'
})

export class ContactPage {
    constructor(
        private iab: InAppBrowser,
        private appAvailability: AppAvailability,
        private platform: Platform,
        private call: CallNumber,
        private emailComposer: EmailComposer
    ) { }

    launchExternalApp(iosSchemaName: string, androidPackageName: string, appUrl: string, httpUrl: string, username: string) {

        let app: string;

        if (this.platform.is('ios')) {
            app = iosSchemaName;
        } else if (this.platform.is('android')) {
            app = androidPackageName;
        } else {
            //we are not in application; open in browser and return this function.
            this.iab.create(httpUrl + username, '_system');
            return;
        }

        //continue if we are in application
        this.appAvailability.check(app)
            .then(
                (yes: boolean) => {
                    console.log(app + ' is available');
                    this.iab.create(appUrl + username, '_system');
                },
                (no: boolean) => {
                    console.log(app + ' is NOT available');
                    //open in browser
                    this.iab.create(httpUrl + username, '_system');
                }
            );
    }

    openInstagram() {
        this.launchExternalApp('instagram://', 'com.instagram.android', 'instagram://user?username=', 'https://www.instagram.com/', 'ankarunning');
    }

    openFacebook() {
        this.launchExternalApp('fb://', 'com.facebook.katana', 'fb://profile?id=', 'https://www.facebook.com/', 'ankarunningofficial');
    }

    callUs() {
         this.call.callNumber("+903121119999", true)
            .then(res => console.log('Launched dialer!', res))
            .catch(err => console.log('Error launching dialer', err)); 
    }

    emailUs() {

        this.emailComposer.isAvailable().then((available: boolean) =>{
            if(available) {
              //Now we know we can send
              //!!!! this is not working even though I have an email composer. so skip this part.       
            }
           });

           let email = {
            to: 'info@ankarunning.com', 
            subject: 'Bir sorum Var',
            isHtml: true
          };
          
          // Send a text message using default options. If not email account exists; a popup is shown as default.
          this.emailComposer.open(email).catch(err => console.log('Error launching email', err));
    }
}