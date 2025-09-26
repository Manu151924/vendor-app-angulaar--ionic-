import { Component, Input } from '@angular/core';
import { ModalController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-zero-pickup-modal',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Zero Pickup Data</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="close()">Close</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list>
        <ion-item *ngFor="let item of zeroPickupData">
          <ion-label>
            <h2>{{ item.code }}</h2>
            <p>{{ item.consignor }}</p>
            <small>Last Pickup: {{ item.lastPickupDate }}</small>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  `,
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class ZeroPickupModalComponent {
  @Input() zeroPickupData: any[] = [];

  constructor(private modalCtrl: ModalController) {}

  close() {
    this.modalCtrl.dismiss();
  }
}
