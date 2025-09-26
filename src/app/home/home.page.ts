import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonContent, IonIcon, IonBadge, IonButton, IonSegmentButton, IonSegment, IonTabButton, IonFooter, IonTabBar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { CommonModule } from '@angular/common';
import { DeliveryPage } from '../delivery/delivery.page';

import { FormsModule } from '@angular/forms';
import { BookingPage } from '../booking/booking.page';
import { checkmarkDone, home, personOutline, notifications,location, carSport, } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonTabBar, IonFooter, IonTabButton,  IonSegment, IonSegmentButton, BookingPage,DeliveryPage,IonButton, IonBadge, IonIcon, IonHeader, IonToolbar, IonContent, CommonModule,FormsModule],
})
export class HomePage  {
   segment: string = 'delivery';

   notificationsCount = 5;
  
}

