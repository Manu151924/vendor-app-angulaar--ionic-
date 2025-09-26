import { Component, Input } from '@angular/core';
import { ModalController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-draft-waybills-modal',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Draft Waybills Data</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="close()">Close</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list>
        <ion-item *ngFor="let item of draftWaybillsData">
          <ion-label>
            <h2>Waybill: {{ item.waybill }}</h2>
            <p>Consignor: {{ item.consignor }}</p>
            <small>Pickup Date: {{ item.pickupDate }}</small>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  `,
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class DraftWaybillsModalComponent {
  @Input() draftWaybillsData: any[] = [];

  constructor(private modalCtrl: ModalController) {}

  close() {
    this.modalCtrl.dismiss();
  }
}
