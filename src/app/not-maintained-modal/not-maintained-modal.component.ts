import { Component, Input } from '@angular/core';
import { ModalController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-not-manifested-modal',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Not Manifested Data</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="close()">Close</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list>
        <ion-item *ngFor="let item of notManifestedData">
          <ion-label>
            <h2>Waybill: {{ item.waybill }}</h2>
            <p>Consignor: {{ item.consignor }}</p>
            <p>Booked: {{ item.booked }}, Manifested: {{ item.manifested }}, Remaining: {{ item.remaining }}</p>
            <small>Pickup Date: {{ item.pickupDate }}</small>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  `,
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class NotManifestedModalComponent {
  @Input() notManifestedData: any[] = [];

  constructor(private modalCtrl: ModalController) {}

  close() {
    this.modalCtrl.dismiss();
  }
}
