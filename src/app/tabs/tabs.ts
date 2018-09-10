import { Component } from '@angular/core';

import { ClubPage } from '../club/club.component';
import { TrainingsPage } from '../trainings/trainings.component';
import { EventsPage } from '../events/events';
import { RoutesPage } from '../routes/routes.component';
import { ContactPage } from '../contact/contact.component';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root: any = ClubPage;
  tab2Root: any = EventsPage;
  tab3Root: any = TrainingsPage;
  tab5Root: any = ContactPage;
  tab4Root: any = RoutesPage;

  constructor() {

  }
}
